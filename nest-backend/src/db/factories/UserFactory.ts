import { faker } from '@faker-js/faker';

import { AbstractFactory } from '@/db/factories/AbstractFactory';

export class UserFactory extends AbstractFactory {
    static create(user?) {
        const userData = user || UserFactory.generate();

        return UserFactory.save(userData);
    }

    static generate() {
        const user = {
            email: faker.internet.email(),
            password: `#${faker.internet.password(5)}a1A`
        };

        return user;
    }

    static async save(userData) {
        const savedUser = await this.prisma.user.create({
            data: {
                email: userData.email
            }
        });

        await this.prisma.password.create({
            data: {
                password: userData.password,
                user: { connect: { id: savedUser.id } }
            }
        });

        return savedUser;
    }
}
