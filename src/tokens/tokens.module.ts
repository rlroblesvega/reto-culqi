import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { Token, TokenSchema } from './schemas/token.schema';
import { JoiPipeModule } from 'nestjs-joi';

@Module({
  imports: [JoiPipeModule, MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])],
  controllers: [TokensController],
  providers: [TokensService],
})
export class TokensModule {}
