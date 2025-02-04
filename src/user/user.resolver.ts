import { UserRepository } from './repository/user.repository';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { attendantSchema } from './schema/attendant.schema';
import { attendantInput } from './input/attendant.input';
import { requesterSchema } from './schema/requester.schema';
import { requesterInput } from './input/requester.input';
import { CustomLogger } from 'src/logger/custom.logger';
import { CryptService } from 'src/crypt/crypt.service';

@Resolver()
export class UserResolver {
  constructor(
    private userRepository: UserRepository,
    private logger: CustomLogger,
    private crypt: CryptService,
  ) {}

  // Attendants

  @Query(() => [attendantSchema])
  async attendants(): Promise<attendantSchema[]> {
    this.logger.log(`Received request to find all attendants`);

    try {
      const attendants = await this.userRepository.findAllAttendants();
      this.logger.log(`Fetched ${attendants.length} attendants`);

      return attendants;
    } catch (error) {
      this.logger.error('Error fetching all attendants');
      throw error;
    }
  }

  @Query(() => attendantSchema)
  async findAttendantByEmail(@Args('email') email: string): Promise<attendantSchema> {
    this.logger.log(`Received request to find attendant by email: ${email}`);

    try {
      const attendant = await this.userRepository.findAttendantByEmail(email);
      this.logger.log(`Fetched attendant by email`);

      return attendant;
    } catch (error) {
      this.logger.error(`Error fetching attendant by email`);
      return error;
    }
  }

  @Query(() => attendantSchema)
  async findAttendantById(@Args('id') id: string): Promise<attendantSchema> {
    this.logger.log(`Received request to find attendant by Id: ${id}`);

    try {
      const attendant = await this.userRepository.findAttendantById(id);

      this.logger.log(`Fetched attendant by id`);
      return attendant;
    } catch (error) {
      this.logger.error(`Error fetching attendant by id`);
      return error;
    }
  }

  @Mutation(() => attendantSchema)
  async registerAttendant(@Args('attendant') attendant: attendantInput): Promise<attendantSchema> {
    this.logger.log(`Received request to create a new attendant: ${JSON.stringify(attendant)}`);

    try {
      const newAttendant = await this.userRepository.addAttendant({
        ...attendant,
        password: await this.crypt.encrypt(attendant.password),
      });

      this.logger.log(`Created attendant with Id ${newAttendant.id}`);
      return newAttendant;
    } catch (error) {
      this.logger.error(`Error creating new attendant.`);
      throw error;
    }
  }

  @Mutation(() => attendantSchema)
  async removeAttendantByEmail(@Args('email') email: string): Promise<void> {
    this.logger.log(`Received request to remove attendant by email: ${email}`);

    try {
      await this.userRepository.removeAttendantByEmail(email);

      this.logger.log(`Removed attendant successfully.`);
    } catch (error) {
      this.logger.error(`Error removing attendant with email: ${email}`);
      return error;
    }
  }

  @Mutation(() => attendantSchema)
  async removeAttendantById(@Args('id') id: string): Promise<void> {
    this.logger.log(`Received request to remove attendant by Id: ${id}`);

    try {
      await this.userRepository.removeAttendantById(id);

      this.logger.log(`Removed attendant successfully.`);
    } catch (error) {
      this.logger.error(`Error removing attendant with email: ${id}`);
      return error;
    }

    return this.removeAttendantById(id);
  }

  // Requesters

  @Query(() => [requesterSchema])
  async requesters(): Promise<requesterSchema[]> {
    this.logger.log('Received request to find all requesters');

    try {
      const requesters = await this.userRepository.findAllRequesters();
      this.logger.log(`Fetched ${requesters.length} requesters`);

      return requesters;
    } catch (error) {
      this.logger.error('Error fetching all requesters');
      throw error;
    }
  }

  @Query(() => requesterSchema)
  async findRequesterByEmail(@Args('email') email: string): Promise<requesterSchema> {
    this.logger.log(`Received request to find requester by email: ${email}`);

    try {
      const requester = await this.userRepository.findRequesterByEmail(email);
      this.logger.log(`Fetched requester by email`);

      return requester;
    } catch (error) {
      this.logger.error(`Error fetching requester by email`);
      return error;
    }
  }

  @Query(() => requesterSchema)
  async findRequesterById(@Args('id') id: string): Promise<requesterSchema> {
    this.logger.log(`Received request to find requester by Id: ${id}`);

    try {
      const requester = await this.userRepository.findRequesterById(id);
      this.logger.log(`Fetched requester by id`);

      return requester;
    } catch (error) {
      this.logger.error(`Error fetching requester by id`);
      return error;
    }
  }

  @Mutation(() => requesterSchema)
  async registerRequester(@Args('requester') requester: requesterInput): Promise<requesterSchema> {
    this.logger.log(`Received request to add a new requester: ${JSON.stringify(requester)}`);

    try {
      const newRequester = await this.userRepository.addRequester({
        ...requester,
        password: await this.crypt.encrypt(requester.password),
      });

      this.logger.log(`Created requester with Id ${newRequester.id}`);
      return newRequester;
    } catch (error) {
      this.logger.error(`Error creating new requester.`);
      throw error;
    }
  }

  @Mutation(() => requesterSchema)
  async removeRequesterByEmail(@Args('email') email: string): Promise<void> {
    this.logger.log(`Received request to remove requester by email: ${email}`);

    try {
      await this.userRepository.removeRequesterByEmail(email);

      this.logger.log(`Removed requester successfully.`);
    } catch (error) {
      this.logger.error(`Error removing requester with email: ${email}`);
      return error;
    }
  }

  @Mutation(() => requesterSchema)
  async removeRequesterById(@Args('id') id: string): Promise<void> {
    this.logger.log(`Received request to remove requester by Id: ${id}`);

    try {
      await this.userRepository.removeRequesterById(id);

      this.logger.log(`Removed requester successfully.`);
    } catch (error) {
      this.logger.error(`Error removing requester with id: ${id}`);
      return error;
    }
  }
}
