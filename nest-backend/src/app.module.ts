import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';

import { AuthModule } from './modules/AuthModule';
import { UsersModule } from './modules/UsersModule';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';

import config from '@/config';
import { APP_GUARD } from '@nestjs/core';
import { MeModule } from '@/modules/MeModule';
import { RolesModule } from '@/modules/RolesModule';
import { RolesGuard } from '@/abilities/Roles.guard';
import { ContractsModule } from '@/modules/ContractsModule';
import { PrismaService } from '@/services/PrismaService.service';
import { CaslAbilityFactory } from '@/abilities/CaslAbilityFactory';

@Module({
    imports: [
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
