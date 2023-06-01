import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import dataSource from '@/ormconfig.config';

import { truncate } from './helpers/truncate';
import {
    BadRequestException,
    ValidationError,
    ValidationPipe
} from '@nestjs/common';
import { conf } from '@/config';
import { useContainer } from 'class-validator';
import {
    I18nService,
    I18nValidationExceptionFilter,
    I18nValidationPipe
} from 'nestjs-i18n';

beforeAll(async () => {
    global._request = request;
    global.dataSource = dataSource;

    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule]
    }).compile();

    global.app = moduleFixture.createNestApplication();
    useContainer(global.app.select(AppModule), { fallbackOnErrors: true });

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

    await global.app.init();
    await global.dataSource.initialize();

    global.request = request(app.getHttpServer());

    global.i18nService = moduleFixture.get(I18nService);

    await truncate();
});
