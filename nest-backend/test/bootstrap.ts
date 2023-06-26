import 'tsconfig-paths/register';

import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { setContainer } from '@/project/boilerplate/common/setContainer';
import { setGlobalPrefix } from '@/project/boilerplate/common/setGlobalPrefix';
import { initI18 } from '@/project/boilerplate/i18n';
import { i18nService } from '@/project/boilerplate/i18n/setI18n';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';
import * as graph from 'gql-query-builder';
import { truncate } from '@test/helpers/truncate';

export default async () => {
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

    global.i18nService = i18nService;
    global.prismaService = app.get<PrismaService>(PrismaService);
    global.graph = graph;

    await truncate();
};
