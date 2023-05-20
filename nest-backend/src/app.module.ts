import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/UsersModule';
import { AppController } from './controllers/app.controller';

import config from '@/config';
import { MeModule } from '@/modules/MeModule';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [config], isGlobal: true }),

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

        UsersModule,
        AuthModule,
        MeModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
