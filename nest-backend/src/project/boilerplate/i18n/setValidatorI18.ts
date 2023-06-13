import { I18nValidationPipe } from 'nestjs-i18n';

export function setValidatorI18(app) {
    app.useGlobalPipes(
        new I18nValidationPipe({ transform: true, whitelist: true })
    );
}
