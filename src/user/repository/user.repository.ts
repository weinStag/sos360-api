import { requesterInput } from '../input/requester.input';
import { attendantInput } from '../input/attendant.input';
import { attendantSchema } from '../schema/attendant.schema';
import { requesterSchema } from '../schema/requester.schema';
import { PrismaService } from './../../database/service/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) { }

  // Attendants

  public async findAllAttendants(): Promise<attendantSchema[]> {
    return this.prismaService.user_attendant.findMany();
  }

  public async findAttendantByEmail(email: string): Promise<attendantSchema> {
    return this.prismaService.user_attendant.findUnique({
      where: { email },
    });
  }

  public async findAttendantById(id: string): Promise<attendantSchema> {
    return this.prismaService.user_attendant.findUnique({
      where: { id },
    });
  }

  public async addAttendant(attendant: attendantInput): Promise<attendantSchema> {
    return this.prismaService.user_attendant.create({ data: attendant });
  }

  public async removeAttendantByEmail(email: string): Promise<void> {
    this.prismaService.user_attendant.delete({ where: { email } });
  }

  public async removeAttendantById(id: string): Promise<void> {
    this.prismaService.user_attendant.delete({ where: { id } });
  }

  // Requesters

  public async findAllRequesters(): Promise<requesterSchema[]> {
    return this.prismaService.user_requester.findMany();
  }

  public async findRequesterByEmail(email: string): Promise<requesterSchema> {
    return this.prismaService.user_requester.findUnique({
      where: { email },
    });
  }

  public async findRequesterById(id: string): Promise<requesterSchema> {
    return this.prismaService.user_requester.findUnique({
      where: { id },
    });
  }

  public async addRequester(requester: requesterInput): Promise<requesterSchema> {
    return this.prismaService.user_requester.create({ data: requester });
  }

  public async removeRequesterByEmail(email: string): Promise<void> {
    this.prismaService.user_requester.delete({ where: { email } });
  }

  public async removeRequesterById(id: string): Promise<void> {
    this.prismaService.user_requester.delete({ where: { id } });
  }
}
