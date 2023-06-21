import { ArgumentsHost, Catch, UnauthorizedException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

import { Logger } from '@/logger/services/Logger';
import {
    ErrorDataLogParser,
    SeverityLevel
} from '@/project/helpers/ErrorDataLogParser';

@Catch(UnauthorizedException)
export class UnauthorizedCustom implements GqlExceptionFilter {
    constructor(private readonly logger: Logger) {}

    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const logMessage = ErrorDataLogParser.parseGQLException(
            exception,
            host,
            { _class: this.constructor.name, level: SeverityLevel.err }
        );

        this.logger.error(logMessage);

        const gqlHost = GqlArgumentsHost.create(host);

        const message = gqlHost?.getContext()?.req?.__(exception.message);

        if (!message) {
            return exception;
        }

        exception.message = message;

        return exception;
    }
}
