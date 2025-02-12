import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/service/prisma.service';
import { CreateLocalizationInput } from './dto/create-geoLoc.input';
import { UpdateLocalizationInput } from './dto/update-geoLoc.input';

@Injectable()
export class LocalizationService {
  constructor(private readonly prisma: PrismaService) {}

  // Cria uma nova localização
  async create(data: CreateLocalizationInput) {
    return this.prisma.localization.create({ data });
  }

  // Encontra todas as localizações
  async findAll() {
    return this.prisma.localization.findMany();
  }

  // Encontra uma localização específica pelo ID
  async findOne(id: string) {
    return this.prisma.localization.findUnique({ where: { id } });
  }

  // Atualiza uma localização
  async update(id: string, data: UpdateLocalizationInput) {
    return this.prisma.localization.update({
      where: { id },
      data,
    });
  }

  // Remove uma localização pelo ID
  async remove(id: string) {
    return this.prisma.localization.delete({ where: { id } });
  }
}
