/*
 * @group app
 */

import * as request from 'supertest';

import { conf } from '@/project/config';

describe('AppController', () => {
    describe('root', () => {
        it('should return "Api is working" dialog', () => {
            const expectedDialog = i18nService.__({
                phrase: 'hello',
                locale: 'en'
            });

            return request(app.getHttpServer())
                .get(`/${conf.api.prefix}`)
                .expect(200)
                .expect(expectedDialog);
        });

        it('should return "Api is working" dialog in selected Language', () => {
            const expectedDialog = i18nService.__({
                phrase: 'hello',
                locale: 'pl'
            });

            return request(app.getHttpServer())
                .get(`/${conf.api.prefix}?lang=pl`)
                .expect(200)
                .expect(expectedDialog);
        });

        it('should return "Api is working" dialog in ENGLISH when SELECTED LANGUAGE doesnt exist', () => {
            const expectedDialog = i18nService.__({
                phrase: 'hello',
                locale: 'en'
            });

            return request(app.getHttpServer())
                .get(`/${conf.api.prefix}?lang=notExistingLanguage`)
                .expect(200)
                .expect(expectedDialog);
        });
    });
});
