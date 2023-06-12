import { faker } from '@faker-js/faker';

import { AbstractFactory } from '@/db/factories/AbstractFactory';

export class RoleFactory extends AbstractFactory {
    static create(users?: string[]) {
        const role = RoleFactory.generate(users);

        return RoleFactory.save(role, users);
    }

    static generate(users?: string[]) {
        const role = {
            name: faker.name.jobTitle(),
            users
        };

        return role;
    }

    static async save(role, users?: string[]) {
        const connectedUsers = [];

        for (const user of users) {
            connectedUsers.push({ id: user });
        }

        return this.prisma.role.create({
            data: {
                name: role.name,
                users: { connect: connectedUsers }
            }
        });
    }
}
