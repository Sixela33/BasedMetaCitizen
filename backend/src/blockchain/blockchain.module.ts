import { Module } from '@nestjs/common';
import { EthereumService } from './services/ethereum.service';
import { BlockchainService } from './services/blockchain.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Identity } from './entities/identity.entity';
import { Wallet } from './entities/wallets.entity';
import { IdentityService } from './services/Identity.service';
import { BlockchainController } from './blockchain.controller';
import { forwardRef } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

@Module({ 
  imports: [
    TypeOrmModule.forFeature([Identity, Wallet]),
    forwardRef(() => UserModule),
  ],  
  providers: [EthereumService, BlockchainService, IdentityService],
  exports: [EthereumService, BlockchainService, IdentityService],
  controllers: [BlockchainController],
})
export class BlockchainModule {}
