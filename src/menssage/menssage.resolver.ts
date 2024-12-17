import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CustomLogger } from 'src/logger/custom.logger'; 
import { MessageInput } from './input/menssage.input';
import { MessageService } from './repository/menssage.service';
import { MessageSchema } from './schema/menssage.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(of => MessageSchema)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly logger: CustomLogger 
  ) {}

  @Query(() => [MessageSchema])
  async getMessages(): Promise<MessageSchema[]> {
    this.logger.log('Fetching all messages', MessageResolver.name);
    return this.messageService.findAll();
  }

  @Mutation(() => MessageSchema)
  @UseGuards(AuthGuard)
  async createMessage(@Args('message') message: MessageInput): Promise<MessageSchema> {
    this.logger.log('Creating a new message', MessageResolver.name);
    return this.messageService.create(message);
  }
}
