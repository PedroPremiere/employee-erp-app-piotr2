import { conf } from '@/config';

const minPasswordLen = conf.security.minPasswordLen;

export const createUserErrorDialogs = {
    notEmailError: 'email must be an email',
    emptyPasswordError: 'password should not be empty',
    tooWeakPasswordError: 'password is not strong enough',
    tooShortPasswordError: `password must be longer than or equal to ${minPasswordLen} characters`
};
