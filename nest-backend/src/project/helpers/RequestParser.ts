import { ExecutionContext } from '@nestjs/common';

export class RequestParser {
    static getRequest(context: ExecutionContext) {
        return context?.switchToHttp()?.getRequest();
    }

    static getBody(context: ExecutionContext) {
        const request = RequestParser.getRequest(context);

        if (request) {
            return request.body;
        }

        return context.getArgs()[1];
    }
}
