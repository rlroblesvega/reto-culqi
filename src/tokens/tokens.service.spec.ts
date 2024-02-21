import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { TokensService } from './tokens.service';
import { Token } from './schemas/token.schema';
import { JwtService } from '@nestjs/jwt';

const mockToken = {
  card_number: '5118420413040344',
  cvv: '7682',
  expiration_month: '01',
  expiration_year: '2025',
  email: 'royerleandroroblesvega@gmail.com',
};

describe('TokensService', () => {
  let service: TokensService;
  let model: Model<Token>;

  const TokensArray = [
    {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      cardData: {
        card_number: '5118420413040344',
        cvv: '7682',
        expiration_month: '01',
        expiration_year: '2025',
        email: 'royerleandroroblesvega@gmail.com',
      },
      _id: '65d598c57d65aed3b194fb4f',
      createdAt: new Date(),
      __v: 0,
    },
    {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      cardData: {
        card_number: '5118420413040344',
        cvv: '7682',
        expiration_month: '01',
        expiration_year: '2025',
        email: 'royerleandroroblesvega@gmail.com',
      },
      _id: '65d598c57d65aed3b194fb4f',
      createdAt: new Date(),
      __v: 0,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokensService,
        JwtService,
        {
          provide: getModelToken('Token'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockToken),
            constructor: jest.fn().mockResolvedValue(mockToken),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TokensService>(TokensService);
    model = module.get<Model<Token>>(getModelToken('Token'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all tokens', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(TokensArray),
    } as any);
    const tokens = await service.findAll();
    expect(tokens).toEqual(TokensArray);
  });

});
