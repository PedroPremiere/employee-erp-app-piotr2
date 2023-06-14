import * as request from 'supertest';
import { I18nService } from 'nestjs-i18n';
import * as graph from 'gql-query-builder';

import { AppModule } from '@/app.module';
import { truncate } from './helpers/truncate';
import { initI18 } from '@/project/boilerplate/i18n';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/apps/PrismaService.service';
import { setContainer } from '@/project/boilerplate/common/setContainer';
import { setGlobalPrefix } from '@/project/boilerplate/common/setGlobalPrefix';

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
    global.graph = graph;

    await truncate();
});
