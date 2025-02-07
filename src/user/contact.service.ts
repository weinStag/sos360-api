import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/service/prisma.service";
import { Contact } from "src/user/schema/contact.schema";
import { CreateContactInput } from "src/user/input/create-contact.input";

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async createContact(data: CreateContactInput): Promise<Contact> {
    return await this.prisma.contact.create({ data });
  }

  async getContacts(): Promise<Contact[]> {
    return await this.prisma.contact.findMany();
  }

  async getContactById(id: string): Promise<Contact | null> {
    return await this.prisma.contact.findUnique({ where: { id } });
  }

  async updateContact(id: string, data: Partial<Contact>): Promise<Contact> {
    return await this.prisma.contact.update({ where: { id }, data });
  }

  async deleteContact(id: string): Promise<Contact> {
    return await this.prisma.contact.delete({ where: { id } });
  }
}
