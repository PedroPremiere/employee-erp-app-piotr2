import { Prisma } from '@prisma/client';

export async function truncate() {
    const tables = Prisma.ModelName;

    await prismaService.$queryRawUnsafe('SET FOREIGN_KEY_CHECKS = 0');

    for (const table in tables) {
        const tableToDelete = table.toLocaleLowerCase();

        await prismaService.$queryRawUnsafe(`TRUNCATE ${tableToDelete} ;`);
    }

    await prismaService.$queryRawUnsafe('SET FOREIGN_KEY_CHECKS = 1');
}
