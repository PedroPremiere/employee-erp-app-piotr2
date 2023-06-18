import {
    BadRequestException,
    ValidationError,
    ValidationPipe
} from '@nestjs/common';

export function setValidatorI18(app) {
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            exceptionFactory: (errors: ValidationError[]) => {
                const error_messages = errors.map(error => {
                    const messages = [...Object.values(error.constraints)];
                    return {
                        field: error.property,
                        messages
                    };
                });

                return new BadRequestException({ errors: error_messages });
            },
            forbidUnknownValues: false
        })
    );
}
