import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SumsubModule } from './sumsub/sumsub.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { PrivyGuard } from './auth/guards/privy.guard';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    SumsubModule,
    BlockchainModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrivyGuard],
})
export class AppModule {}
