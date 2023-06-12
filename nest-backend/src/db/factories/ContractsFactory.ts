import { faker } from '@faker-js/faker';

import { AbstractFactory } from '@/db/factories/AbstractFactory';

export class ContractsFactory extends AbstractFactory {
    static create(ownerId: string) {
        const contractDate = ContractsFactory.generate(ownerId);

        return ContractsFactory.save(contractDate);
    }

    static generate(ownerId: string) {
        const contract = {
            id: faker.datatype.uuid(),
            position: faker.name.jobTitle(),
            startDate: faker.date.past(),
            endDate: faker.date.future(),
            vacationDaysPerYear: faker.datatype.number(),
            vacationDays: faker.datatype.number(),
            ownerId
        };

        return contract;
    }

    static save(contractDate) {
        return this.prisma.contract.create({
            data: contractDate
        });
    }
}
