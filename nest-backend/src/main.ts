import { NestFactory } from '@nestjs/core';
import {
    ValidationPipe,
    ValidationError,
    BadRequestException
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { conf } from '@/config';
import { useContainer } from 'class-validator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    app.setGlobalPrefix(conf.api.prefix);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            exceptionFactory: (validationErrors: ValidationError[] = []) => {
                return new BadRequestException(
                    validationErrors.map(error => ({
                        field: error.property,
                        error: Object.values(error.constraints).join(', ')
                    }))
                );
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
