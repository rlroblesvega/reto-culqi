import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTokenDto } from './dto/create-token.dto';
import { Token } from './schemas/token.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokensService {
  constructor(@InjectModel(Token.name) private readonly tokenModel: Model<Token>,
  private jwtService: JwtService) {}

  async create(createTokenDto: CreateTokenDto): Promise<Token> {
    const access_token = await this.jwtService.signAsync(createTokenDto, { expiresIn: '1m' });
    const record : any = {
      token: access_token,
      cardData: createTokenDto
    }
    const createdToken = await this.tokenModel.create(record);
    return createdToken;
  }

  async findAll(): Promise<Token[]> {
    return this.tokenModel.find().exec();
  }

  async findOne(id: string): Promise<Token> {
    return this.tokenModel.findOne({ _id: id }).exec();
  }

  async findOneToken(token: string): Promise<any> {
    const foundToken = await this.tokenModel.findOne({ token: token }).select('-cardData.cvv').exec();
    
    if (!foundToken) {
      throw new HttpException('Token expirado, genere un nuevo token', HttpStatus.FORBIDDEN);
    }

    return foundToken;
  }

}
