import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { initI18 } from '@/project/boilerplate/i18n';
import { initSwagger } from '@/project/boilerplate/swagger';
import { setContainer } from '@/project/boilerplate/common/setContainer';
import { setGlobalPrefix } from '@/project/boilerplate/common/setGlobalPrefix';
import { conf } from '@/project/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    setContainer(app);
    setGlobalPrefix(app);
    initI18(app);
    initSwagger(app);

    await app.listen(conf.app.serverPort);
}

bootstrap();
