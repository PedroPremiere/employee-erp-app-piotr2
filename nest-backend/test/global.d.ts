/* eslint-disable no-var */

import * as supertest from 'supertest';
import { DataSource } from 'typeorm';

declare global {
    var request: supertest;
    var app: INestApplication;
    var dataSource: DataSource;
}
