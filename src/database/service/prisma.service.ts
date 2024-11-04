import { INestApplication, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  logger: Logger = new Logger(PrismaService.name);
  constructor() {
    super();
  }
  async onModuleInit() {
    await this.$connect();
    this.logger.log('[Database] PostgressDB initialized!');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('[Database] ProstgressDB closed!');
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
