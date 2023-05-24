import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import dataSource from '@/ormconfig.config';
import { Contract } from '@/entities/Contract';

@Injectable()
export class ContractsFactory {
    static generate(user?) {
        const contract = {
            id: faker.datatype.uuid(),
            position: faker.name.jobTitle(),
            startDate: faker.date.past(),
            endDate: faker.date.future(),
            vacationDaysPerYear: faker.datatype.number(),
            vacationDays: faker.datatype.number(),
            user
        };

        return contract;
    }

    static async create(user) {
        const contractRepository = dataSource.getRepository(Contract);
        const contract = ContractsFactory.generate(user);

        await contractRepository.save(contract);

        return contract;
    }
}
