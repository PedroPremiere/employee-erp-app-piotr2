import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '@/app.module';
import dataSource from '@/ormconfig.config';

import { truncate } from '@/db/helpers/truncate';

beforeAll(async () => {
    global.request = request;
    global.dataSource = dataSource;

    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule]
    }).compile();

    global.app = moduleFixture.createNestApplication();
    await global.app.init();
    await global.dataSource.initialize();

    await truncate();
});
