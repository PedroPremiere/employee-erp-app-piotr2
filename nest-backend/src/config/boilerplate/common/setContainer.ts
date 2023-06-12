import { useContainer } from 'class-validator';

import { AppModule } from '@/app.module';

export function setContainer(app) {
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
}
