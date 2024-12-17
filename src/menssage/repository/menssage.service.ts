import { Injectable } from '@nestjs/common';
import { MessageInput } from '../input/menssage.input';
import { MessageSchema } from '../schema/menssage.schema';
import { PrismaService } from 'src/database/service/prisma.service';


@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<MessageSchema[]> {
    return this.prismaService.message.findMany();
  }

  async create(data: MessageInput): Promise<MessageSchema> {
    return this.prismaService.message.create({
      data: {
        content: data.content,
        userId: data.userId,
      },
    });
  }
}