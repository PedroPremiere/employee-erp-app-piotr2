import * as request from 'supertest';

import { conf } from '@/config';
import { AppController } from './app.controller';

describe('AppController', () => {
    describe('root', () => {
        it('should return "Api is working"', () => {
            return request(app.getHttpServer())
                .get(`/${conf.api.prefix}`)
                .expect(200)
                .expect('Api is working');
        });
    });
});
