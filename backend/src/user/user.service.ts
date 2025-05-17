import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ApiKeys } from './entities/api-keys.entity';
import * as jwt from 'jsonwebtoken';
import { UpdateApiKeyDto, CreateApiKeyDto } from './dto/apiKey.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private UserRepo: Repository<User>,
    @InjectRepository(ApiKeys) 
    private apiKeysRepository: Repository<ApiKeys>
  ) {}

  async findOrCreateByDid(did: string) {
    const user = await this.UserRepo.findOne({
      where: {
        did,
      },
    });

    if(!user) {
      const newUser = await this.UserRepo.create({did});
      return await this.UserRepo.save(newUser);
    }

    return user;
  }

  async findOne(id: string) {
    return this.UserRepo.findOne({
      where: { id: id },
    });
  }

  async createApiKey(user: User, createApiKeyDto: CreateApiKeyDto): Promise<ApiKeys> {
    if (!user) {
        throw new BadRequestException('User not found');
    }

    // Generate a random string of 32 characters
    let key = this.generateApiKey(user.id);
    let existingKey = await this.apiKeysRepository.findOne({where: {key}});

    // If the key already exists, generate a new one until it doesn't exist
    while (existingKey) {
      key = this.generateApiKey(user.id);
      existingKey = await this.apiKeysRepository.findOne({where: {key}});
    }

    // Saving and returning the key
    const apiKey = this.apiKeysRepository.create({
        key,
        user: user,
        name: createApiKeyDto.name,
        allowedOrigins: createApiKeyDto.allowedOrigins,
        redirectUrls: createApiKeyDto.redirectUrls || [],
    });

    return await this.apiKeysRepository.save(apiKey);
  }

  private generateApiKey(userId: string): string {
    const payload = { userId: userId };
    const secretKey = process.env.JWT_SECRET_KEY; // Ensure this is set in your environment variables
    const options = { }; // Set expiration as needed

    return jwt.sign(payload, secretKey, options);
  }

  async getApiKeys(user: User) {
    const keys =  await this.apiKeysRepository.find({
      where: {
        user: {
          id: user.id
        }
      }
    });
    return keys
  }

  async updateApiKey(user: User, id: string, updateApiKeyDto: UpdateApiKeyDto) {
    const key = await this.apiKeysRepository.findOne({where: {id, user: user}});
    if (!key) {
      throw new BadRequestException('Key not found');
    }
    
    return await this.apiKeysRepository.update(id, updateApiKeyDto);
  }

  async deleteApiKey(user: User, id: string) {
    return await this.apiKeysRepository.delete({id, user: user});
  }
}
