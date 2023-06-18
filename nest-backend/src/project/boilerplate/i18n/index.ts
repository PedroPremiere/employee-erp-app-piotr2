import { setI18n } from '@/project/boilerplate/i18n/setI18n';
import { setValidatorI18 } from '@/project/boilerplate/i18n/setValidatorI18';

export function initI18(app) {
    setI18n(app);
    setValidatorI18(app);
}
