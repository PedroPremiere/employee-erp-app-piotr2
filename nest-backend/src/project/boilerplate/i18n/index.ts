import { setFilterI18 } from '@/project/boilerplate/i18n/setFilterI18';
import { setValidatorI18 } from '@/project/boilerplate/i18n/setValidatorI18';

export function initI18(app) {
    setFilterI18(app);
    setValidatorI18(app);
}
