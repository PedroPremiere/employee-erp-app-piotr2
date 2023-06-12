import * as argon2 from 'argon2';
import { Prisma } from '@prisma/client';

function hashPassword(inputPassword: string) {
    return argon2.hash(inputPassword);
}

export const HashPassword = Prisma.defineExtension({
    query: {
        password: {
            async create({ args, query }) {
                args.data.password = await hashPassword(args.data.password);

                return query(args);
            }
        }
    }
});
