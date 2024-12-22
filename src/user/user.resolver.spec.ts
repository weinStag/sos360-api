import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserRepository } from './repository/user.repository';
import { CryptService } from 'src/crypt/crypt.service';
import { CustomLogger } from 'src/logger/custom.logger';
import { AuthService } from 'src/auth/auth.service';


describe('UserResolver', () => {
  let resolver: UserResolver;
  let userRepository: UserRepository;
  let cryptService: CryptService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
            findById: jest.fn(),
            add: jest.fn(),
            removeByEmail: jest.fn(),
            list: jest.fn(),
          },
        },
        CryptService,
        CustomLogger,
        AuthService, // Mock AuthService
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userRepository = module.get<UserRepository>(UserRepository);
    cryptService = module.get<CryptService>(CryptService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should return a user on login with valid credentials', async () => {
    const mockUser = { email: 'test@example.com', password: 'hashedpassword' };
    const mockToken = 'mockedJWTToken';

    userRepository.findByEmail = jest.fn().mockResolvedValue(mockUser);
    cryptService.compare = jest.fn().mockResolvedValue(true);
    authService.generateToken = jest.fn().mockReturnValue(mockToken);

    const result = await resolver.login('test@example.com', 'password');

    expect(result).toEqual({
      user: mockUser,
      token: mockToken,
    });
  });
});
