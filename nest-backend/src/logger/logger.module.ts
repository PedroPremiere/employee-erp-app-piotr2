import { Global, Module } from '@nestjs/common';
import { Logger } from '@/logger/services/Logger';
import { RabbitModule } from '@/rabbit/rabbit.module';

@Global()
@Module({
    imports: [RabbitModule],
    providers: [Logger],
    exports: [Logger]
})
export class LoggerModule {}
