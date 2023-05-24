import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { User } from '@/entities/User';
import dataSource from '@/ormconfig.config';

@Injectable()
export class UsersFactory {
    static generate() {
        const user = {
            id: faker.datatype.uuid(),
            email: faker.internet.email(),
            password: `#${faker.internet.password(5)}a1A`
        };

        return user;
    }

    static async create() {
        const usersRepository = dataSource.getRepository(User);
        const user = UsersFactory.generate();

        const userToSave = new User();

        userToSave.id = user.id;
        userToSave.email = user.email;
        userToSave.password = user.password;

        await usersRepository.save(userToSave);

        return user;
    }
}
