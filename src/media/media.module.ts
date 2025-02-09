import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaCleanerService } from './media-cleaner.service';

@Module({
  controllers: [MediaController],
  providers: [MediaService, MediaCleanerService],
  exports: [MediaService],
})
export class MediaModule {}
