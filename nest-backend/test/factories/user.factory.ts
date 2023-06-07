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

    static async create(user?) {
        const usersRepository = dataSource.getRepository(User);

        const userData = user || UsersFactory.generate();

        const userToSave = new User();

        userToSave.id = userData.id;
        userToSave.email = userData.email;
        userToSave.password = userData.password;

        const savedUser = await usersRepository.save(userToSave);

        return savedUser;
    }
}
