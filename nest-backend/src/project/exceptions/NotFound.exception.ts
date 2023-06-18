import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class NotFoundExceptionCustom implements GqlExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);

        const message = gqlHost?.getContext()?.req?.__(exception.message);

        if (!message) {
            return exception;
        }

        exception.message = message;

        return exception;
    }
}
