import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(HttpException)
export class NotFoundExceptionCustom implements GqlExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const i18n = I18nContext.current(host);

        const gqlHost = GqlArgumentsHost.create(host);
        const ctx = gqlHost.switchToHttp();
        exception.message = i18n.t('errors.notFound');

        return exception;
    }
}
