import {
    ArgumentsHost,
    Catch,
    Inject,
    UnauthorizedException
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { I18nService } from 'nestjs-i18n';

@Catch(UnauthorizedException)
export class UnauthorizedCustom implements GqlExceptionFilter {
    @Inject()
    private readonly translator: I18nService;

    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);

        const query = gqlHost?.getContext()?.req?.query;

        if (!query || !query.lang) {
            return exception;
        }

        exception.message = this.translator.translate('errors.unauthorized', {
            lang: query.lang
        });

        return exception;
    }
}
