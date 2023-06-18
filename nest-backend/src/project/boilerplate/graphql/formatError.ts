import { unwrapResolverError } from '@apollo/server/errors';
import { Logger } from '@/project/helpers/Logger';

export function formatError(formattedError, error) {
    const unwrapped = unwrapResolverError(error);

    if (![unwrapped['status']?.toString()].includes('400')) {
        return formattedError;
    }

    const errors = unwrapped['response']?.errors;

    if (!errors) {
        Logger.error('error message');
    }

    return {
        message: 'Bad Request',
        errors
    };
}
