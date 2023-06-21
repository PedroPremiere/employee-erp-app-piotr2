import { Controller, Get } from '@nestjs/common';
import {
    HealthCheck,
    HealthCheckService,
    MemoryHealthIndicator
} from '@nestjs/terminus';

import { RabbitIndicator } from '@/rabbit/indicators/rabbit-indicator';
import { PrismaIndicator } from '@/project/prisma/indicators/prisma-indicator.service';

@Controller('check')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private memory: MemoryHealthIndicator,
        private prismaIndicator: PrismaIndicator,
        private rabbitIndicator: RabbitIndicator
    ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.prismaIndicator.check('prisma'),
            () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
            () => this.rabbitIndicator.check('rabbit')
        ]);
    }
}
