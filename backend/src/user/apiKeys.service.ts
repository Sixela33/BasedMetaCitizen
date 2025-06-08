import { BadRequestException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ApiKeys } from "./entities/api-keys.entity";
import { User } from "./entities/user.entity";
import { CreateApiKeyDto, UpdateApiKeyDto } from "./dto/apiKey.dto";
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ApiKeysService {
  constructor(
    @InjectRepository(ApiKeys)
    private readonly apiKeysRepository: Repository<ApiKeys>,
  ) { }

  async createApiKey(user: User, createApiKeyDto: CreateApiKeyDto): Promise<ApiKeys> {
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Generate a random string of 32 characters
    let key = this.generateApiKey(user.id);
    let existingKey = await this.apiKeysRepository.findOne({ where: { key } });

    // If the key already exists, generate a new one until it doesn't exist
    while (existingKey) {
      key = this.generateApiKey(user.id);
      existingKey = await this.apiKeysRepository.findOne({ where: { key } });
    }

    // Saving and returning the key
    const apiKey = this.apiKeysRepository.create({
      key,
      user: user,
      name: createApiKeyDto.name,
      allowedOrigins: createApiKeyDto.allowedOrigins,
      redirectUrl: createApiKeyDto.redirectUrl || '',
    });

    return await this.apiKeysRepository.save(apiKey);
  }

  private generateApiKey(userId: string): string {
    const payload = { userId: userId };
    const secretKey = process.env.JWT_SECRET_KEY; // Ensure this is set in your environment variables
    const options = {}; // Set expiration as needed

    return jwt.sign(payload, secretKey, options);
  }

  async getApiKeys(user: User) {
    const keys = await this.apiKeysRepository.find({
      where: {
        user: {
          id: user.id
        }
      }
    });
    return keys
  }

  async updateApiKey(user: User, id: string, updateApiKeyDto: UpdateApiKeyDto) {
    const key = await this.apiKeysRepository.findOne({ where: { id, user: user } });
    if (!key) {
      throw new BadRequestException('Key not found');
    }

    return await this.apiKeysRepository.update(id, updateApiKeyDto);
  }

  async deleteApiKey(user: User, id: string) {
    return await this.apiKeysRepository.delete({ id, user: user });
  }

  async getApiKey(id: string) {
    const key = await this.apiKeysRepository.findOne({ where: { key: id } });
    if (!key) {
      throw new BadRequestException('Key not found');
    }
    return key;
  }
}
