import { conf } from '@/project/config';

export function setGlobalPrefix(app) {
    app.setGlobalPrefix(conf.api.prefix);
}
