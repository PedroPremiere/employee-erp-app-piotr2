import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { ExceptionTranslator } from '@/project/helpers/ExceptionTranslator';

@Catch(BadRequestException)
export class BadRequestExceptionCustom implements GqlExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const errors = ExceptionTranslator.translate(exception, host);

        exception['errors'] = errors;

        return exception;
    }
}
