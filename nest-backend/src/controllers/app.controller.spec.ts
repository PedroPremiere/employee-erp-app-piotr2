import * as request from 'supertest';

import { AppController } from './app.controller';

describe('AppController', () => {
    describe('root', () => {
        it('should return "Api is working"', () => {
            return request(app.getHttpServer())
                .get('/api')
                .expect(200)
                .expect('Api is working');
        });
    });
});
