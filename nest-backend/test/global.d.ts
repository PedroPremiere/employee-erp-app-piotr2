/* eslint-disable no-var */

import * as supertest from 'supertest';
import { PrismaService } from '@/project/prisma/services/PrismaService.service';

declare global {
    var request: supertest;
    var app: INestApplication;
    var i18nService;
    var prismaService: PrismaService;
    var graph;
}
