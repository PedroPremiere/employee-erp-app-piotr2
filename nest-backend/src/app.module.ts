import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';

import { AuthModule } from './apps/Auth/AuthModule';
import { UsersModule } from './apps/User/UsersModule';
import { AppService } from './apps/app.service';
import { AppController } from './apps/app.controller';

import config from '@/project/config';
import { APP_GUARD } from '@nestjs/core';
import { MeModule } from '@/apps/Me/MeModule';
import { RolesModule } from '@/apps/Roles/RolesModule';
import { RolesGuard } from '@/project/abilities/Roles.guard';
import { ContractsModule } from '@/apps/Contracts/ContractsModule';
import { PrismaService } from '@/apps/PrismaService.service';
import { CaslAbilityFactory } from '@/project/abilities/CaslAbilityFactory';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            context: ctx => ctx

            //plugins: [ApolloServerPluginLandingPageLocalDefault()]
        }),
        ConfigModule.forRoot({ load: [config], isGlobal: true }),

        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, '/i18n/'),
                watch: true
            },
            resolvers: [
                { use: QueryResolver, options: ['lang'] },
                AcceptLanguageResolver
            ]
        }),
        ContractsModule,
        UsersModule,
        AuthModule,
        MeModule,
        RolesModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        PrismaService,
        CaslAbilityFactory,
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ],
    exports: [CaslAbilityFactory, PrismaService]
})
export class AppModule {}
