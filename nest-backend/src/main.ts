import { NestFactory } from '@nestjs/core';
import {
    ValidationPipe,
    ValidationError,
    BadRequestException
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { conf } from '@/config';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.setGlobalPrefix(conf.api.prefix);

    app.useGlobalPipes(new I18nValidationPipe({ transform: true }));
    app.useGlobalFilters(
        new I18nValidationExceptionFilter({
            errorFormatter: (validationErrors: ValidationError[] = []) => {
                return validationErrors.map(error => ({
                    field: error.property,
                    error: Object.values(error.constraints).join(', ')
                }));
            }
        })
    );

    const config = new DocumentBuilder()
        .setTitle(conf.info.name)
        .setDescription(conf.info.description)
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3000);
}

bootstrap();
