export async function truncate() {
    const models = dataSource.entityMetadatas;

    for (const model of models) {
        const repository = dataSource.getRepository(model.name);

        await repository.clear();
    }
}
