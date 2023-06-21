import { unwrapResolverError } from '@apollo/server/errors';

export function formatError(formattedError, error) {
    const unwrapped = unwrapResolverError(error);

    if (![unwrapped['status']?.toString()].includes('400')) {
        return formattedError;
    }

    const errors = unwrapped['response']?.errors;

    return {
        message: 'Bad Request',
        errors
    };
}
