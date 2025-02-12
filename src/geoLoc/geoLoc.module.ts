import { Module } from '@nestjs/common';
import { LocalizationService } from './geoLoc.service';
import { LocalizationResolver } from './geoLoc.resolver';
import { PrismaService } from 'src/database/service/prisma.service';

@Module({
  providers: [LocalizationResolver, LocalizationService, PrismaService],
})
export class LocalizationModule {}
