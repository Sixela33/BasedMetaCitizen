import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ApiKeys } from './entities/api-keys.entity';
import { ApiKeysService } from './apiKeys.service';
import { Identity } from 'src/blockchain/entities/identity.entity';
import { BlockchainModule } from 'src/blockchain/blockchain.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ApiKeys, Identity]), 
    BlockchainModule
  ],
  controllers: [UserController],
  providers: [UserService, ApiKeysService],
  exports: [UserService],
})
export class UserModule {}
