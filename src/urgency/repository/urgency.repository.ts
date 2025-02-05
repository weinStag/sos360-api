import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/service/prisma.service';
import { Prisma, Status } from '@prisma/client';
import { urgencyInput } from '../input/urgency.input';

@Injectable()
export class Urgencyrepository {
  constructor(private readonly prismaService: PrismaService) { }

  public async findAllurgencies() {
    return this.prismaService.urgency.findMany();
  }

  public async findUrgencyById(id: string) {
    return this.prismaService.urgency.findUnique({ where: { id } });
  }

  public async addUrgency(urgency: urgencyInput) {
    const data: Prisma.urgenceCreateInput = {
      type: urgency.type,
      description: urgency.description,
      status: urgency.status
    }
    return this.prismaService.urgency.create({ data });
  }

  public async removeUrgencyById(id: string) {
    return this.prismaService.emergency.delete({ where: { id } });
  }
  
  public async updateUrgencyStatus(id: string, status: Status) {
    return this.prismaService.urgency.update({
    where: { id },
    data: { status },
  });

}
