import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/service/prisma.service';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {} // ✅ Injeção correta do PrismaService

  async saveMedia(userRequesterId: string, emergencyId: string, filePath: string, type: string) {
    return this.prisma.media.create({
      data: {
        emergencyId,
        url: filePath,
        type,
        user_requester: {
          connect: { id: userRequesterId }, // ✅ Apenas a relação, sem duplicar userRequesterId
        },
      },
    });
  }

  async getMediaByEmergency(emergencyId: string) {
    return this.prisma.media.findMany({
      where: { emergencyId },
    });
  }

  async deleteOldMedia(days: number): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const deleted = await this.prisma.media.deleteMany({
      where: { createdAt: { lt: cutoffDate } },
    });

    return deleted.count;
  }
}
