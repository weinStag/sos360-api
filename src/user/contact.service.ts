import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/service/prisma.service";
import { Contact } from "src/user/schema/contact.schema";
import { CreateContactInput } from "src/user/input/create-contact.input";

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactInput): Promise<Contact> {
    return await this.prisma.contact.create({ data });
  }

  async findAll(): Promise<Contact[]> {
    return await this.prisma.contact.findMany();
  }

  async findById(id: string): Promise<Contact | null> {
    return await this.prisma.contact.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Contact>): Promise<Contact> {
    return await this.prisma.contact.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Contact> {
    return await this.prisma.contact.delete({ where: { id } });
  }
}
