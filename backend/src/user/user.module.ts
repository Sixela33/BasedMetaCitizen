import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ApiKeys } from './entities/api-keys.entity';
import { PrivyGuard } from 'src/auth/guards/privy.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User, ApiKeys])],
  controllers: [UserController],
  providers: [PrivyGuard, UserService],
  exports: [UserService],
})
export class UserModule {}
