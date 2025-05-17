import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ApiKeysService } from './apiKeys.service';
import { Identity } from 'src/blockchain/entities/identity.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private UserRepo: Repository<User>,
    @InjectRepository(Identity)
    private IdentityRepo: Repository<Identity>,
    private readonly apiKeysService: ApiKeysService
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

  async getIdentity(user: User) {
    const identity = await this.IdentityRepo.findOne({
      where: { user: { id: user.id } },
    });
    
    console.log("identity",identity);
    if (!identity) {
      throw new NotFoundException('Identity not found');
    }

    return identity;
  }


}
