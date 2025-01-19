import { UserRepository } from './repository/user.repository';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { attendantSchema } from './schema/attendant.schema';
import { attendantInput } from './input/attendant.input';
import { requesterSchema } from './schema/requester.schema';
import { requesterInput } from './input/requester.input';

@Resolver()
export class UserResolver {
  authService: any;
  constructor(
    private userRepository: UserRepository,
  ) { }

  // Attendants

  @Query(() => [attendantSchema])
  async attendants(): Promise<attendantSchema[]> {
    return await this.userRepository.findAllAttendants();
  }

  @Query(() => attendantSchema)
  async findAttendantByEmail(@Args('email') email: string): Promise<attendantSchema> {
    return await this.userRepository.findAttendantByEmail(email);
  }

  @Query(() => attendantSchema)
  async findAttendantById(@Args('id') id: string): Promise<attendantSchema> {
    return await this.userRepository.findAttendantById(id);
  }

  @Mutation(() => attendantSchema)
  async registerAttendant(@Args('attendant') attendant: attendantInput): Promise<attendantSchema> {
    return await this.userRepository.addAttendant(attendant);
  }

  @Mutation(() => attendantSchema)
  async removeAttendantByEmail(@Args('email') email: string): Promise<void> {
    return this.removeAttendantByEmail(email);
  }

  @Mutation(() => attendantSchema)
  async removeAttendantById(@Args('id') id: string): Promise<void> {
    return this.removeAttendantById(id);
  }

  // Requesters

  @Query(() => [requesterSchema])
  async requesters(): Promise<requesterSchema[]> {
    return await this.userRepository.findAllRequesters();
  }

  @Query(() => requesterSchema)
  async findRequesterByEmail(@Args('email') email: string): Promise<requesterSchema> {
    return await this.userRepository.findRequesterByEmail(email);
  }

  @Query(() => requesterSchema)
  async findRequesterById(@Args('id') id: string): Promise<requesterSchema> {
    return await this.userRepository.findRequesterById(id);
  }

  @Mutation(() => requesterSchema)
  async registerRequester(@Args('requester') requester: requesterInput): Promise<requesterSchema> {
    return await this.userRepository.addRequester(requester);
  }

  @Mutation(() => requesterSchema)
  async removeRequesterByEmail(@Args('email') email: string): Promise<void> {
    return await this.userRepository.removeRequesterByEmail(email);
  }

  @Mutation(() => requesterSchema)
  async removeRequesterById(@Args('id') id: string): Promise<void> {
    return await this.userRepository.removeRequesterById(id);
  }
}
