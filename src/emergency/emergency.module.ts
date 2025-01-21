import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/service/prisma.service";
import { EmergencyResolver } from "./emergency.resolver";
import { EmergencyRepository } from "./repository/emergency.repository";

@Module({
  providers: [EmergencyResolver, EmergencyRepository, PrismaService]
})
export class EmergencyModule {}
