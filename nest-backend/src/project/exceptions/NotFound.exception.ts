import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class NotFoundExceptionCustom implements GqlExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const gqlHost = GqlArgumentsHost.create(host);

        const i18n = gqlHost?.getContext()?.i18nContext;

        if (!i18n) {
            return exception;
        }

        exception.message = i18n.t('errors.notFound');

        return exception;
    }
}
