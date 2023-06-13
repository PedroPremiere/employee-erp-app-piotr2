import { I18nValidationExceptionFilter } from 'nestjs-i18n';
import { ValidationError } from '@nestjs/common';

export function setFilterI18(app) {
    app.useGlobalFilters(
        new I18nValidationExceptionFilter({
            errorFormatter: (validationErrors: ValidationError[] = []) => {
                return validationErrors.map(error => ({
                    field: error.property,
                    error: Object.values(error.constraints).join(', ')
                }));
            }
        })
    );
}
