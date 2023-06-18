import { ArgumentsHost, BadRequestException } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { Logger } from '@/project/helpers/Logger';

export class ExceptionTranslator {
    static translate(
        exception: BadRequestException,
        host: ArgumentsHost
    ): string[] {
        const request = ExceptionTranslator.getRequest(host);

        if (!request) {
            Logger.error('something went wrong');

            return [];
        }

        const errors = ExceptionTranslator.getErrors(exception);

        if (!errors) {
            Logger.error('something went wrong');

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

    static getRequest(host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);
        const request = gqlHost?.getContext()?.req;

        return request;
    }

    static getResponse(exception: BadRequestException) {
        const response = exception.getResponse();

        return response;
    }

    static getErrors(exception: BadRequestException) {
        const response = ExceptionTranslator.getResponse(exception);
        const errors = response['errors'] || [];

        return errors;
    }
}
