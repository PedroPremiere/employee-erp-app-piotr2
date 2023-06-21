import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './apps/Auth/AuthModule';
import { UsersModule } from './apps/User/UsersModule';
import { AppController } from './apps/app.controller';

import config from '@/project/config';
import { APP_GUARD } from '@nestjs/core';
import { MeModule } from '@/apps/Me/MeModule';
import { RolesModule } from '@/apps/Roles/RolesModule';
import { RolesGuard } from '@/project/abilities/Roles.guard';
import { ContractsModule } from '@/apps/Contracts/ContractsModule';
import { CaslAbilityFactory } from '@/project/abilities/CaslAbilityFactory';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { formatError } from '@/project/boilerplate/graphql/formatError';
import { RabbitModule } from './rabbit/rabbit.module';
import { I18nModule } from './i18n/i18n.module';
import { PrismaModule } from './project/prisma/prisma.module';
import { LoggerModule } from '@/logger/logger.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            context: ({ req }) => ({ req }),
            autoTransformHttpErrors: true,
            status400ForVariableCoercionErrors: false,
            includeStacktraceInErrorResponses: false,
            introspection: true,
            formatError,
            buildSchemaOptions: {
                numberScalarMode: 'integer'
            },
            fieldResolverEnhancers: ['interceptors']
        }),
        ConfigModule.forRoot({ load: [config], isGlobal: true }),
        ContractsModule,
        UsersModule,
        AuthModule,
        MeModule,
        RolesModule,
        RabbitModule,
        I18nModule,
        PrismaModule,
        LoggerModule
    ],
    controllers: [AppController],
    providers: [
        CaslAbilityFactory,
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ],
    exports: [CaslAbilityFactory]
})
export class AppModule {}
