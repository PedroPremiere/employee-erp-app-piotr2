import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import {
    ErrorDataLogParser,
    SeverityLevel
} from '@/project/helpers/ErrorDataLogParser';
import { Logger } from '@/logger/services/Logger';

@Catch(HttpException)
export class NotFoundExceptionCustom implements GqlExceptionFilter {
    constructor(private readonly logger: Logger) {}

    catch(exception: HttpException, host: ArgumentsHost) {
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
