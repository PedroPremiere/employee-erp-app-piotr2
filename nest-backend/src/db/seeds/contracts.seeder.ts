import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { User } from '@/entities/User';
import { Contract } from '@/entities/Contract';
import { ContractsFactory } from '@test/factories/contracts.factory';

export default class ContractsSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<any> {
        const usersRepo = dataSource.getRepository(User);
        const contractsRepo = dataSource.getRepository(Contract);

        const users = await usersRepo.find();

        for (const user of users) {
            const contract = ContractsFactory.generate(user);
            await contractsRepo.save(contract);
        }
    }
}
