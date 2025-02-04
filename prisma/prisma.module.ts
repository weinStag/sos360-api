import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/service/prisma.service';


@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
