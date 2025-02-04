import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserRepository } from './repository/user.repository';
import { CryptService } from 'src/crypt/crypt.service';
import { CustomLogger } from 'src/logger/custom.logger';
import { AuthService } from 'src/auth/auth.service'; // Certifique-se de mockar este serviço
import { DuplicatedUserError } from 'src/errors/duplicated-user-error';
import { userInput } from './input/user.input';

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
            add: jest.fn(),
          },
        },
        {
          provide: CryptService,
          useValue: {
            encrypt: jest.fn(),
          },
        },
        CustomLogger,
        AuthService, // Mocked if necessary
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userRepository = module.get<UserRepository>(UserRepository);
    cryptService = module.get<CryptService>(CryptService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should register a user with valid data', async () => {
    const mockUserInput: userInput = {
        email: 'test@example.com', password: 'plainpassword',
        name: '',
        rg: '',
        address: '',
        phone: '',
        active: false
    };
    const encryptedPassword = 'encryptedpassword';
    
    // Mocking the user repository and crypt service
    userRepository.findByEmail = jest.fn().mockResolvedValue(null); // Simula que não encontrou um usuário
    cryptService.encrypt = jest.fn().mockResolvedValue(encryptedPassword); // Criptografa a senha
    
    const mockUser = { ...mockUserInput, password: encryptedPassword };
    userRepository.add = jest.fn().mockResolvedValue(mockUser); // Simula a adição do usuário no banco

    const result = await resolver.registerUser(mockUserInput);
    
    expect(result).toEqual(mockUser);
    expect(userRepository.add).toHaveBeenCalledWith(mockUser); // Verifica se o repositório foi chamado com os dados corretos
  });

  it('should throw an error if user already exists', async () => {
    const mockUserInput: userInput = {
        email: 'test@example.com', password: 'plainpassword',
        name: '',
        rg: '',
        address: '',
        phone: '',
        active: false
    };

    // Simula que o usuário já existe
    userRepository.findByEmail = jest.fn().mockResolvedValue({ email: 'test@example.com' });

    try {
      await resolver.registerUser(mockUserInput);
    } catch (error) {
      expect(error).toBeInstanceOf(DuplicatedUserError); // Verifica se o erro é de usuário duplicado
    }
  });
});