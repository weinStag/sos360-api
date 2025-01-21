import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/service/prisma.service";
import { EmergencyResolver } from "./emergency.resolver";
import { EmergencyRepository } from "./repository/emergency.repository";
import { CustomLogger } from "src/logger/custom.logger";

@Module({
  providers: [EmergencyResolver, EmergencyRepository, PrismaService, CustomLogger]
})
export class EmergencyModule {}
