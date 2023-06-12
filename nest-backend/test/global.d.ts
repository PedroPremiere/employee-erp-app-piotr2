/* eslint-disable no-var */

import * as supertest from 'supertest';
import { DataSource } from 'typeorm';
import { PrismaService } from '@/services/PrismaService.service';

declare global {
    var request: supertest;
    var app: INestApplication;
    var dataSource: DataSource;
    var i18nService: I18nService;
    var prismaService: PrismaService;
}
