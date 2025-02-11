import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/service/prisma.service';
import { CreateLocalizationInput } from './dto/create-localization.input';
import { UpdateLocalizationInput } from './dto/update-localization.input';

@Injectable()
export class LocalizationResolver {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLocalizationInput) {
    return this.prisma.localization.create({ data });
  }

  async findAll() {
    return this.prisma.localization.findMany();
  }

  async findOne(id: string) {
    return this.prisma.localization.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateLocalizationInput) {
    return this.prisma.localization.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.localization.delete({ where: { id } });
  }
}
