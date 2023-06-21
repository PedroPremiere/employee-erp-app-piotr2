import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './controllers/health.controller';
import { RabbitModule } from '@/rabbit/rabbit.module';

@Module({
    imports: [TerminusModule, HttpModule, RabbitModule],
    controllers: [HealthController]
})
export class HealthModule {}
