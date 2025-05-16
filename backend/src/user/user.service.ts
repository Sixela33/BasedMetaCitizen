import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ApiKeys } from './entities/api-keys.entity';
import * as jwt from 'jsonwebtoken';

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

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return this.UserRepo.findOne({
      where: { id: id },
    });
  }

  async createApiKey(user: User): Promise<ApiKeys> {
    if (!user) {
        throw new BadRequestException('User not found');
    }

    // Generate a random string of 32 characters
    console.log("user.id", user.id);
    let key = this.generateApiKey(user.id);
    console.log("key", key);
    let existingKey = await this.apiKeysRepository.findOne({where: {key}});
    console.log("existingKey", existingKey);
    // If the key already exists, generate a new one until it doesn't exist
    while (existingKey) {
      key = this.generateApiKey(user.id);
      existingKey = await this.apiKeysRepository.findOne({where: {key}});
    }

    console.log("key", key);

    // Saving and returning the key
    const apiKey = this.apiKeysRepository.create({
        key,
        user: user,
    });
    console.log("apiKey", apiKey);

    return await this.apiKeysRepository.save(apiKey);
  }

  private generateApiKey(userId: string): string {
    const payload = { userId: userId };
    const secretKey = process.env.JWT_SECRET_KEY; // Ensure this is set in your environment variables
    const options = { }; // Set expiration as needed

    return jwt.sign(payload, secretKey, options);
  }

  async getApiKeys(user: User) {
    return await this.apiKeysRepository.find({where: {user: user}});
  }

  async deleteApiKey(user: User, id: string) {
    return await this.apiKeysRepository.delete({id, user: user});
  }
}
