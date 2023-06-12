import { Prisma } from '@prisma/client';

function addDeleteDate(
    params: Prisma.MiddlewareParams
): Prisma.MiddlewareParams {
    params.action = 'update';
    params.args['data'] = { deletedAt: new Date() };

    return params;
}

function preventReading(
    params: Prisma.MiddlewareParams
): Prisma.MiddlewareParams {
    params.action = 'findFirst';
    params.args.where['deletedAt'] = null;

    return params;
}

function preventReadingMany(
    params: Prisma.MiddlewareParams
): Prisma.MiddlewareParams {
    if (params.args.where) {
        if (params.args.where.deleted == undefined) {
            params.args.where['deletedAt'] = null;
        }

        return params;
    }

    params.args['where'] = { deletedAt: null };

    return params;
}

export function SoftDelete<
    T extends Prisma.BatchPayload = Prisma.BatchPayload
>(): Prisma.Middleware {
    return async (
        params: Prisma.MiddlewareParams,
        next: (params: Prisma.MiddlewareParams) => Promise<T>
    ): Promise<T> => {
        if (params.action === 'delete') {
            addDeleteDate(params);
        }

        if (['findUnique', 'findFirst'].includes(params.action)) {
            preventReading(params);
        }

        if (params.action === 'findMany') {
            preventReadingMany(params);
        }

        return next(params);
    };
}
