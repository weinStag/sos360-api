import { UserRepository } from './repository/user.repository';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { userInput } from './input/user.input';
import { userSchema } from './schema/user.schema';
import { UserNotFoundError } from 'src/errors/user-not-found-error';
import { DuplicatedUserError } from 'src/errors/duplicated-user-error';
import { WrongPasswordError } from 'src/errors/wrong-password-error';
import { CryptService } from 'src/crypt/crypt.service';
import { CustomLogger } from 'src/logger/custom.logger';
import { LoginResponse } from './schema/login-response.schema';

@Resolver()
export class UserResolver {
  authService: any;
  constructor(
    private userRepository: UserRepository,
    private crypt: CryptService,
    private logger: CustomLogger,
  ) { }

  @Query(() => userSchema)
  async findUserByEmail(@Args('email', { type: () => String }) email: string): Promise<userSchema> {
    this.logger.log(`Received request to find user by email: ${email}`, UserResolver.name);

    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        this.logger.warn(`User not found with email: ${email}`, UserResolver.name);
        throw new UserNotFoundError();
      }
      this.logger.log(`User found: ${JSON.stringify(user)}`, UserResolver.name);
      return user;
    } catch (error) {
      this.logger.error(`Error finding user by email: ${email}`, error.stack, UserResolver.name);
      throw error;
    }
  }

  @Query(() => userSchema)
  async findUserByID(@Args('id', { type: () => String }) id: string): Promise<userSchema> {
    this.logger.log(`Received request to find user by ID: ${id}`, UserResolver.name);

    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        this.logger.warn(`User not found with ID: ${id}`, UserResolver.name);
        throw new UserNotFoundError();
      }
      this.logger.log(`User found: ${JSON.stringify(user)}`, UserResolver.name);
      return user;
    } catch (error) {
      this.logger.error(`Error finding user by ID: ${id}`, error.stack, UserResolver.name);
      throw error;
    }
  }

  @Mutation(() => userSchema)
  async registerUser(@Args('user', { type: () => userInput }) user: userInput): Promise<void> {
    this.logger.log(`Received request to register user: ${JSON.stringify(user)}`, UserResolver.name);

    try {
      if (await this.userRepository.findByEmail(user.email)) {
        this.logger.warn(`Attempt to register duplicated user with email: ${user.email}`, UserResolver.name);
        throw new DuplicatedUserError();
      }
      const encryptedPassword = await this.crypt.encrypt(user.password);
      user.password = encryptedPassword;
      await this.userRepository.add(user);

      this.logger.log(`User registered successfully: ${user.email}`, UserResolver.name);
    } catch (error) {
      this.logger.error(`Error registering user: ${JSON.stringify(user)}`, error.stack, UserResolver.name);
      throw error;
    }
  }

  // @Query(() => userSchema)
  // async AuthenticateUser(
  //   @Args('email', { type: () => String }) email: string,
  //   @Args('password', { type: () => String }) password: string,
  // ): Promise<userSchema> {
  //   this.logger.log(`Authentication request for user: ${email}`, UserResolver.name);

  //   try {
  //     const user = await this.userRepository.findByEmail(email);
  //     if (!user) {
  //       this.logger.warn(`Authentication failed: User not found for email: ${email}`, UserResolver.name);
  //       throw new UserNotFoundError();
  //     }

  //     const isPasswordCorrect = await this.crypt.compare(password, user.password);
  //     if (!isPasswordCorrect) {
  //       this.logger.warn(`Authentication failed: Incorrect password for email: ${email}`, UserResolver.name);
  //       throw new WrongPasswordError();
  //     }

  //     this.logger.log(`User authenticated successfully: ${email}`, UserResolver.name);
  //     return user;
  //   } catch (error) {
  //     this.logger.error(`Error authenticating user: ${email}`, error.stack, UserResolver.name);
  //     throw error;
  //   }
  // }

  
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const isPasswordCorrect = await this.crypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new WrongPasswordError();
    }

    const token = this.authService.generateToken(user); // Gere um token JWT, por exemplo

    return { user, token };
  }



    

  @Mutation(() => userSchema)
  async removeUserByEmail(@Args('email', { type: () => String }) email: string): Promise<void> {
    this.logger.log(`Received request to remove user by email: ${email}`, UserResolver.name);

    try {
      await this.findUserByEmail(email);
      await this.userRepository.removeByEmail(email);

      this.logger.log(`User removed successfully: ${email}`, UserResolver.name);
    } catch (error) {
      this.logger.error(`Error removing user by email: ${email}`, error.stack, UserResolver.name);
      throw error;
    }
  }

  @Query(() => [userSchema])
  async listUsers(): Promise<userSchema[]> {
    this.logger.log(`Received request to list all users`, UserResolver.name);

    try {
      const users = await this.userRepository.list();
      this.logger.log(`Fetched ${users.length} users`, UserResolver.name);
      return users;
    } catch (error) {
      this.logger.error(`Error listing users`, error.stack, UserResolver.name);
      throw error;
    }
  }
}
