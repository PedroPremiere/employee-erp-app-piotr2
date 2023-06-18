import { I18n } from 'i18n';

export const i18nService = new I18n({
    locales: ['en', 'pl'],
    defaultLocale: 'en',
    queryParameter: 'lang',
    directory: 'src/i18n'
});

export function setI18n(app) {
    app.use(i18nService.init);
}
