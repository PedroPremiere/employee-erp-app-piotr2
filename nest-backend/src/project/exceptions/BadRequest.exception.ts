import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { ExceptionTranslator } from '@/i18n/services/ExceptionTranslator';
import {
    ErrorDataLogParser,
    SeverityLevel
} from '@/project/helpers/ErrorDataLogParser';
import { Logger } from '@/logger/services/Logger';

@Catch(BadRequestException)
export class BadRequestExceptionCustom implements GqlExceptionFilter {
    constructor(
        private readonly logger: Logger,
        private readonly exceptionTranslator: ExceptionTranslator
    ) {}

    catch(exception: BadRequestException, host: ArgumentsHost) {
        const logMessage = ErrorDataLogParser.parseGQLException(
            exception,
            host,
            { _class: this.constructor.name, level: SeverityLevel.err }
        );

        this.logger.error(logMessage);

        const errors = this.exceptionTranslator.translate(exception, host);

        exception['errors'] = errors;

        return exception;
    }
}
