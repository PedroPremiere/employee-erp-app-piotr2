import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '@/entities/User';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const userFactory = await factoryManager.get(User);
        await userFactory.save();
        await userFactory.saveMany(5);
    }
}
