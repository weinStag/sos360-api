import { requesterInput } from '../input/requester.input';
import { attendantInput } from '../input/attendant.input';
import { attendantSchema } from '../schema/attendant.schema';
import { requesterSchema } from '../schema/requester.schema';
import { PrismaService } from './../../database/service/prisma.service';
import { Injectable } from '@nestjs/common';
import { updateUser } from '../input/update-user.input';
import { updateRequester } from '../input/update-requester.input';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) { }

  // Attendants

  public async findAllAttendants(): Promise<attendantSchema[]> {
    return this.prismaService.user_attendant.findMany();
  }

  public async findAttendantByEmail(email: string): Promise<attendantSchema | null> {
    return this.prismaService.user_attendant.findUnique({
      where: { email },
    });
  }

  public async findAttendantById(id: string): Promise<attendantSchema | null> {
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

  public async updateAttendantByEmail(email: string, newData: updateUser): Promise<attendantSchema> {
    return this.prismaService.user_attendant.update({ where: { email }, data: newData });
  }

  public async updateAttendantById(id: string, newData: updateUser): Promise<attendantSchema> {
    return this.prismaService.user_attendant.update({ where: { id }, data: newData });
  }

  // Requesters

  public async findAllRequesters(): Promise<requesterSchema[]> {
    return this.prismaService.user_requester.findMany();
  }

  public async findRequesterByEmail(email: string): Promise<requesterSchema | null> {
    return this.prismaService.user_requester.findUnique({
      where: { email },
    });
  }

  public async findRequesterById(id: string): Promise<requesterSchema | null> {
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

  public async updateRequesterByEmail(email: string, newData: updateRequester): Promise<requesterSchema> {
    return this.prismaService.user_requester.update({ where: { email }, data: newData });
  }

  public async updateRequesterById(id: string, newData: updateRequester): Promise<requesterSchema> {
    return this.prismaService.user_requester.update({ where: { id }, data: newData });
  }

  // 🔹 Adicionado suporte à redefinição de senha

  /**
   * 🔎 Busca um usuário (attendant ou requester) pelo email
   */
  public async findOneByEmail(email: string): Promise<attendantSchema | requesterSchema | null> {
    const attendant = await this.findAttendantByEmail(email);
    if (attendant) return attendant;

    return await this.findRequesterByEmail(email);
  }

  public async findUserByResetToken(resetToken: string): Promise<attendantSchema | requesterSchema | null> {
    const attendant = await this.prismaService.user_attendant.findFirst({
      where: { resetToken },
    });

    if (attendant) return attendant;

    return this.prismaService.user_requester.findFirst({
      where: { resetToken },
    });
  }

  public async updateResetToken(email: string, resetToken: string | null): Promise<void> {
    await this.prismaService.user_attendant.updateMany({
      where: { email },
      data: { resetToken },
    });

    await this.prismaService.user_requester.updateMany({
      where: { email },
      data: { resetToken },
    });
  }

  public async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    await this.prismaService.user_attendant.updateMany({
      where: { id: userId },
      data: { password: hashedPassword, resetToken: null },
    });

    await this.prismaService.user_requester.updateMany({
      where: { id: userId },
      data: { password: hashedPassword, resetToken: null },
    });
  }
}
