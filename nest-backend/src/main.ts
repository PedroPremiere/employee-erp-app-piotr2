import { NestFactory } from '@nestjs/core';
import { I18nMiddleware } from 'nestjs-i18n';

import { AppModule } from './app.module';
import { initI18 } from '@/project/boilerplate/i18n';
import { initSwagger } from '@/project/boilerplate/swagger';
import { setContainer } from '@/project/boilerplate/common/setContainer';
import { setGlobalPrefix } from '@/project/boilerplate/common/setGlobalPrefix';
import { UnauthorizedCustom } from '@/project/exceptions/Unauthorized.exception';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    setContainer(app);
    setGlobalPrefix(app);
    initI18(app);
    initSwagger(app);
    app.use(I18nMiddleware);
    app.useGlobalFilters(new UnauthorizedCustom());
    await app.listen(3000);
}

bootstrap();
