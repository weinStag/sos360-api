import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/service/prisma.service";
import { CustomLogger } from "src/logger/custom.logger";
import { Urgencyrepository } from "./repository/urgency.repository";

@Module({
  providers: [,Urgencyrepository, PrismaService, CustomLogger]
})
export class EmergencyModule {}
