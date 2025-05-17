import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ApiKeys } from './entities/api-keys.entity';
import { PrivyGuard } from 'src/auth/guards/privy.guard';
import { ApiKeysService } from './apiKeys.service';
import { Identity } from 'src/blockchain/entities/identity.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, ApiKeys, Identity])],
  controllers: [UserController],
  providers: [PrivyGuard, UserService, ApiKeysService],
  exports: [UserService],
})
export class UserModule {}
