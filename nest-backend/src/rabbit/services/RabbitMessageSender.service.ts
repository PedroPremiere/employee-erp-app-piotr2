import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
    LogMessage,
    SeverityLevel
} from '@/project/helpers/ErrorDataLogParser';

import { conf } from '@/project/config';

@Injectable()
export class RabbitMessageSender {
    constructor(private readonly amqpConnection: AmqpConnection) {}

    sendLogMessage(message: LogMessage) {
        const variablesPbj = this.#parseVariables(message._variables);

        this.amqpConnection.publish('errors', '#', {
            short_message: message.short_message,
            host: conf.info.host,
            level: message.level || SeverityLevel.alert,
            version: '1',
            _env: conf.app.env,
            _class: message._class || 'none',
            _status: message._status,
            _query: message._query,
            _appVersion: conf.info.version,
            _appName: conf.info.name,
            ...variablesPbj
            //_userId: message._userId todo add userId
        });
    }

    #parseVariables(variables: Record<string, string | number>) {
        const variablesPbj = {};

        for (const key of Object.keys(variables)) {
            const parsedKey = `_${key}_Var`;
            variablesPbj[parsedKey] = variables[key];
        }

        return variablesPbj;
    }
}
