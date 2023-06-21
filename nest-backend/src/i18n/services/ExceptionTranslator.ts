import { ArgumentsHost, BadRequestException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { Logger } from '@/logger/services/Logger';

export class ExceptionTranslator {
    constructor(private readonly logger: Logger) {}

    translate(exception: BadRequestException, host: ArgumentsHost): string[] {
        const request = this.getRequest(host);

        if (!request) {
            this.logError('Request is null');

            return [];
        }

        const errors = this.getErrors(exception);

        if (!errors) {
            this.logError('Exception error is null');

            return [];
        }

        for (const error of errors) {
            error.messages = error.messages.map(message => {
                const translated = request.__(message);
                return translated;
            });
        }

        return errors;
    }

    getRequest(host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);
        const request = gqlHost?.getContext()?.req;

        return request;
    }

    getResponse(exception: BadRequestException) {
        const response = exception.getResponse();

        return response;
    }

    getErrors(exception: BadRequestException) {
        const response = this.getResponse(exception);
        const errors = response['errors'] || [];

        return errors;
    }

    logError(short_message: string) {
        const _class = this.constructor.name;
        const level = 1;

        this.logger.error({ short_message, level, _class });
    }
}
