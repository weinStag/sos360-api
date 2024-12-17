import { Module } from '@nestjs/common';
import { PrismaService } from './../database/service/prisma.service';
import { CustomLogger } from 'src/logger/custom.logger';
import { MessageResolver } from './menssage.resolver';
import { MessageService } from './repository/menssage.service';

@Module({
  providers: [
    MessageService,
    MessageResolver,
    PrismaService,
    CustomLogger,
  ],
})
export class MessageModule {}
