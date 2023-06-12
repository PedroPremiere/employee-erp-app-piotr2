import { conf } from '@/config';

export function setGlobalPrefix(app) {
    app.setGlobalPrefix(conf.api.prefix);
}
