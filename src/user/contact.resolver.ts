import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ContactService } from 'src/user/contact.service';
import { Contact } from 'src/user/schema/contact.schema';
import { CreateContactInput } from 'src/user/input/create-contact.input';


@Resolver(() => Contact)
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Query(() => [Contact])
  async getContacts() {
    return this.contactService.findAll();
  }

  @Mutation(() => Contact)
  async createContact(@Args('data') data: CreateContactInput) {
    return this.contactService.create(data);
  }
}
 