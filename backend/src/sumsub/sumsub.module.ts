import { Module } from '@nestjs/common';
import { SumsubService } from './services/sumsub.service';
import { SumsubController } from './sumsub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ User]), UserModule ],
  controllers: [SumsubController],
  providers: [SumsubService],
  exports: [SumsubService],
})
export class SumsubModule {}
