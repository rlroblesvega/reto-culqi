import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.merchant.module';
import { TokensModule } from './cats/tokens.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/test'), AuthModule, UsersModule, TokensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
