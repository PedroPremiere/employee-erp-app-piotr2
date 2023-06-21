import { Injectable } from '@nestjs/common';
import {
    HealthCheckError,
    HealthIndicator,
    HealthIndicatorResult
} from '@nestjs/terminus';

import { PrismaService } from '@/project/prisma/services/PrismaService.service';

@Injectable()
export class PrismaIndicator extends HealthIndicator {
    constructor(private readonly prismaService: PrismaService) {
        super();
    }

    async check(key: string): Promise<HealthIndicatorResult> {
        try {
            await this.prismaService.$queryRaw`SELECT 1`;
            return this.getStatus(key, true);
        } catch (e) {
            throw new HealthCheckError('Prisma check failed', {
                prisma: { status: 'down' }
            });
        }
    }
}
