import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { User } from '@/entities/User';
import { UsersFactory } from '@test/factories/user.factory';

export default class UserSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<any> {
        const usersRepo = dataSource.getRepository(User);

        const userData = UsersFactory.generate();

        await usersRepo.save(userData);
    }
}
