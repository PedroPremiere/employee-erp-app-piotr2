import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './modules/UsersModule';
import { AppController } from './controllers/app.controller';

import config from '@/config';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [config], isGlobal: true }),

        TypeOrmModule.forRootAsync({
            inject: [ConfigService],

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

        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
