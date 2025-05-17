import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Identity } from 'src/blockchain/entities/identity.entity';
import { BlockchainService } from 'src/blockchain/services/blockchain.service';
import { EthereumService } from 'src/blockchain/services/ethereum.service';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private UserRepo: Repository<User>,
    @InjectRepository(Identity)
    private IdentityRepo: Repository<Identity>,
    private readonly blockchainService: BlockchainService,
    private readonly ethereumService: EthereumService,
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

  async getIdentity(user: User, userWallet: any) {
    const identity = await this.blockchainService.getOrCreateIdentity(userWallet.address, user);
    const identityFactoryAddress = this.ethereumService.getIdentityFactoryAddress();
    
    if (!identity) {
      throw new NotFoundException('Identity not found');
    }

    return {identity, identityFactoryAddress};
  }


}
