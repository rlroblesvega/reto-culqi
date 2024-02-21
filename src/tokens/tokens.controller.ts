import { Body, Controller, Delete, Get, Param, Post, HttpCode } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { CreateTokenDto, SearchTokenDto } from './dto/create-token.dto';
import { Token } from './schemas/token.schema';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  async create(@Body() createTokenDto: CreateTokenDto) {
    return await this.tokensService.create(createTokenDto);
  }

  @Get()
  async findAll(): Promise<Token[]> {
    return this.tokensService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Token> {
    return this.tokensService.findOne(id);
  }

  @Post('search')
  @HttpCode(200)
  async search(@Body() searchTokenDto: SearchTokenDto) {
    return await this.tokensService.findOneToken(searchTokenDto.token);
  }
  
}
