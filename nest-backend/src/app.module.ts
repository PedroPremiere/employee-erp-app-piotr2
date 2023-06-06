import * as path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';

import { AuthModule } from './modules/AuthModule';
import { UsersModule } from './modules/UsersModule';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';

import config from '@/config';
import { MeModule } from '@/modules/MeModule';
import { ContractsModule } from '@/modules/ContractsModule';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@/abilities/Roles.guard';
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

        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            imports: [ConfigModule],

            useFactory: async (configService: ConfigService) => {
                const dbConfig = configService.get('db');

                return {
                    type: dbConfig.dialect,
                    ...dbConfig,
                    entities: [__dirname + '/entities/*.{ts,js}'],
                    migrations: [__dirname + '/db/migrations/*.{ts,js}'],
                    synchronize: false,
                    autoLoadEntities: true
                };
            }
        }),
        ContractsModule,
        UsersModule,
        AuthModule,
        MeModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        CaslAbilityFactory,
        {
            provide: APP_GUARD,
            useClass: RolesGuard
        }
    ],
    exports: [CaslAbilityFactory]
})
export class AppModule {}
