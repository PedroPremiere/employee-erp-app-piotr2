import { ArgumentsHost, Catch, UnauthorizedException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(UnauthorizedException)
export class UnauthorizedCustom implements GqlExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);

        const message = gqlHost?.getContext()?.req?.__(exception.message);

        if (!message) {
            return exception;
        }

        exception.message = message;

        return exception;
    }
}
