export async function truncate() {
    const models = dataSource.entityMetadatas;

    for (const model of models) {
        await dataSource.query('SET FOREIGN_KEY_CHECKS = 0');

        const repository = dataSource.getRepository(model.name);

        await repository.clear();

        await dataSource.query('SET FOREIGN_KEY_CHECKS = 1');
    }
}
