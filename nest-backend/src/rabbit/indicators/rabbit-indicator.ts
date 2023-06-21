import {
    HealthCheckError,
    HealthIndicator,
    HealthIndicatorResult
} from '@nestjs/terminus';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitIndicator extends HealthIndicator {
    constructor(private readonly amqpConnection: AmqpConnection) {
        super();
    }

    async check(key: string): Promise<HealthIndicatorResult> {
        try {
            const isConnected = this.amqpConnection.connected;
            return this.getStatus(key, isConnected);
        } catch (e) {
            throw new HealthCheckError('Rabbit check failed', {
                rabbit: { status: 'down' }
            });
        }
    }
}
