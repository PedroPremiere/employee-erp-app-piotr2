import { Global, Module } from '@nestjs/common';
import { ExceptionTranslator } from '@/i18n/services/ExceptionTranslator';

@Global()
@Module({
    providers: [ExceptionTranslator],
    exports: [ExceptionTranslator]
})
export class I18nModule {}
