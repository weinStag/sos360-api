import { Module } from '@nestjs/common';
import { PrismaService } from './service/prisma.service';

@Module({
  providers: [PrismaService],
})
export class DatabaseModule {}
