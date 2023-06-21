import { ArgumentsHost, HttpException } from '@nestjs/common';

export type LogMessage = {
    _class?: string;
    short_message: string;
    _status?: string | number;
    _query?: string;
    _variables?: Record<string, string | number>;
    level?: SeverityLevel;
};

export type ErrorDataLogParserExtraData = {
    _class?: string;
    level?: SeverityLevel;
};

export enum SeverityLevel {
    emerg = 0,
    alert = 1,
    crit = 2,
    err = 3,
    warning = 4,
    notice = 5,
    info = 6,
    debug = 7
}

export class ErrorDataLogParser {
    static parseGQLException(
        exception: HttpException,
        host: ArgumentsHost,
        extraData: ErrorDataLogParserExtraData
    ): LogMessage {
        const level = extraData?.level || SeverityLevel.alert;
        const _class = extraData?._class;
        const hostArgs = host?.getArgs();

        const queryDetails = hostArgs[3];

        const _query = queryDetails?.fieldName;
        const _variables = queryDetails?.variableValues;
        const short_message = exception.message || '';
        const _status = exception.getStatus();

        return {
            short_message,
            level,
            _class,
            _status,
            _query,
            _variables
        };
    }
}
