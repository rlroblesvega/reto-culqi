import { Test, TestingModule } from '@nestjs/testing';
import { TokensController } from './tokens.controller';
import { CreateTokenDto } from './dto/create-token.dto';
import { TokensService } from './tokens.service';

describe('Tokens Controller', () => {
  let controller: TokensController;
  let service: TokensService;
  const createCatDto: CreateTokenDto = {
    card_number: '5118420413040344',
    cvv: '7682',
    expiration_month: '01',
    expiration_year: '2025',
    email: 'royerleandroroblesvega@gmail.com',
  };

  const mockToken = {
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
    __v: 0
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokensController],
      providers: [
        {
          provide: TokensService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
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
                createdAt: '2024-02-21T06:31:33.146Z',
                __v: 0
              },
            ]),
            create: jest.fn().mockResolvedValue(createCatDto),
          },
        },
      ],
    }).compile();

    controller = module.get<TokensController>(TokensController);
    service = module.get<TokensService>(TokensService);
  });

  describe('create()', () => {
    it('should create a new token', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockToken);

      await controller.create(createCatDto);
      expect(createSpy).toHaveBeenCalledWith(createCatDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of tokens', async () => {
      expect(controller.findAll()).resolves.toEqual([
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
          createdAt: '2024-02-21T06:31:33.146Z',
          __v: 0
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
