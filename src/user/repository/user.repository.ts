import { userInput } from '../input/user.input';
import { userSchema } from '../schema/user.schema';
import { PrismaService } from './../../database/service/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findByEmail(email: string): Promise<userSchema> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  public async findById(id: string): Promise<userSchema> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  public async add(user: userInput): Promise<userSchema> {
    return this.prismaService.user.create({ data: user });
  }

  public async removeByEmail(email: string): Promise<void> {
    this.prismaService.user.delete({ where: { email } });
  }

  public async removeById(id: string): Promise<void> {
    this.prismaService.user.delete({ where: { id } });
  }

  public async list(): Promise<userSchema[]> {
    return this.prismaService.user.findMany();
  }
}
