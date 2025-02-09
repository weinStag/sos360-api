import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MediaService } from './media.service';

@Injectable()
export class MediaCleanerService {
  constructor(private readonly mediaService: MediaService) {}

  @Cron('0 0 * * *') // Roda todo dia à meia-noite
  async cleanOldMedia() {
    const deletedCount = await this.mediaService.deleteOldMedia(30); // Apaga após 30 dias
    console.log(`🗑️ ${deletedCount} mídias antigas foram deletadas`);
  }
}
