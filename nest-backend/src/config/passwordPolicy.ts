import { conf } from '@/config/index';

const { minLength } = conf.security;
const minNumbers = conf.security.minPasswordNumbers;
const minLowercase = conf.security.minPasswordLowercase;
const minUppercase = conf.security.minPasswordUppercase;
const minSymbols = conf.security.minPasswordSymbols;

export const passwordPolicy = {
    minLength,
    minLowercase: minLowercase,
    minUppercase: minUppercase,
    minNumbers: minNumbers,
    minSymbols: minSymbols
};
