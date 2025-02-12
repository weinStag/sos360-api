import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/service/prisma.service';
import { emergencyInput } from '../input/emergency.input';
import { Prisma, Status } from '@prisma/client';

@Injectable()
export class EmergencyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAllEmergencies() {
    return this.prismaService.emergency.findMany();
  }

  public async findEmergencyById(id: string) {
    return this.prismaService.emergency.findUnique({ where: { id } });
  }

  public async addEmergency(emergency: emergencyInput) {
    const data: Prisma.emergencyCreateInput = {
      type: emergency.type,
      description: emergency.description,
      status: emergency.status,
      requester: { connect: { id: emergency.requesterId } }
    }

    return this.prismaService.emergency.create({ data });
  }

  public async removeEmergencyById(id: string) {
    return this.prismaService.emergency.delete({ where: { id } });
  }

  async updateEmergencyStatus(id: string, status: Status) {
    return this.prismaService.emergency.update({
      where: { id },
      data: { status },
    });
  }
  

}
