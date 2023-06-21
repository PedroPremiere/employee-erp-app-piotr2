import { Injectable } from '@nestjs/common';

import { LogMessage } from '@/project/helpers/ErrorDataLogParser';
import { RabbitMessageSender } from '@/rabbit/services/RabbitMessageSender.service';

@Injectable()
export class Logger {
    constructor(private readonly sendMessage: RabbitMessageSender) {}

    error(message: LogMessage) {
        this.sendMessage.sendLogMessage(message);
    }
}
