import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import { truncate } from './helpers/truncate';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from '@/services/PrismaService.service';
import { initI18 } from '@/config/boilerplate/i18n';
import { setContainer } from '@/config/boilerplate/common/setContainer';
import { setGlobalPrefix } from '@/config/boilerplate/common/setGlobalPrefix';

beforeAll(async () => {
    global._request = request;

    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule]
    }).compile();

    global.app = moduleFixture.createNestApplication();

    setContainer(app);
    setGlobalPrefix(app);
    initI18(app);

    await global.app.init();

    global.request = request(app.getHttpServer());
    global.i18nService = moduleFixture.get(I18nService);
    global.prismaService = app.get<PrismaService>(PrismaService);

    await truncate();
});
