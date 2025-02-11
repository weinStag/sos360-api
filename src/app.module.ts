import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserModule } from './user/user.module';
import { UserResolver } from './user/user.resolver';
import { DatabaseModule } from './database/database.module';
import { PrismaService } from './database/service/prisma.service';
import { UserRepository } from './user/repository/user.repository';
import { CryptService } from './crypt/crypt.service';
import { CryptModule } from './crypt/crypt.module';
import { LoggerModule } from 'nestjs-pino';
import { CustomLogger } from './logger/custom.logger';
import { EmergencyModule } from './emergency/emergency.module';
import { LocalizationModule } from './localization/localization.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      include: [UserModule, DatabaseModule, LocalizationModule],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // typePaths: ['./**/*.graphql'],
    }),
    UserModule,
    DatabaseModule,
    CryptModule,
    LoggerModule.forRoot({pinoHttp : {level: 'trace'}}),
    LocalizationModule,
  ],
  controllers: [],
  providers: [UserResolver, PrismaService, UserRepository, CryptService, CustomLogger, EmergencyModule],
})
export class AppModule {}
