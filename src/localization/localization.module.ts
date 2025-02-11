import { Module } from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { LocalizationResolver } from './localization.resolver';
import { PrismaService } from 'src/database/service/prisma.service';

@Module({
  providers: [LocalizationResolver, LocalizationService, PrismaService],
})
export class LocalizationModule {}
