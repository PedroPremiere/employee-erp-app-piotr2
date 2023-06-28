import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { conf } from '@/project/config';
import { RabbitMessageSender } from '@/rabbit/services/RabbitMessageSender.service';
import { RabbitIndicator } from '@/rabbit/indicators/rabbit-indicator';

@Module({
    imports: [
        RabbitMQModule.forRoot(RabbitMQModule, {
            exchanges: [
                {
                    name: 'errors',
                    type: 'topic'
                }
            ],
            uri: `amqp://${conf.rabbit.user}:${conf.rabbit.password}@${conf.rabbit.host}:${conf.rabbit.port}`,
            connectionInitOptions: { wait: false }
        })
    ],
    providers: [RabbitMessageSender, RabbitIndicator],
    exports: [RabbitMessageSender, RabbitIndicator]
})
export class RabbitModule {}