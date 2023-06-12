import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { initI18 } from '@/config/boilerplate/i18n';
import { initSwagger } from '@/config/boilerplate/swagger';
import { setContainer } from '@/config/boilerplate/common/setContainer';
import { setGlobalPrefix } from '@/config/boilerplate/common/setGlobalPrefix';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    setContainer(app);
    setGlobalPrefix(app);
    initI18(app);
    initSwagger(app);

    await app.listen(3000);
}

bootstrap();
