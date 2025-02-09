import { Controller, Post, Get, Param, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload/:emergencyId')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  async uploadMedia(
    @Param('emergencyId') emergencyId: string,
    @Body('userRequesterId') userRequesterId: string, // ✅ Adicionado userRequesterId
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.mediaService.saveMedia(userRequesterId, emergencyId, `/uploads/${file.filename}`, file.mimetype);
  }

  @Get(':emergencyId')
  async getMedia(@Param('emergencyId') emergencyId: string) {
    return this.mediaService.getMediaByEmergency(emergencyId);
  }
}
