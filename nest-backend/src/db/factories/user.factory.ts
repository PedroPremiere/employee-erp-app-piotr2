import { faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';

import { User } from '@/entities/User';

export class UsersFactory {
    static generate() {
        const user = {
            id: faker.datatype.uuid(),
            email: faker.internet.email(),
            password: faker.internet.password(10)
        };

        return user;
    }

    static async create() {
        const usersRepository = dataSource.getRepository(User);
        const user = UsersFactory.generate();

        await usersRepository.save(user);

        return user;
    }
}

export default setSeederFactory(User, faker => {
    const user = new User();
    user.id = faker.datatype.uuid();
    user.email = faker.internet.email();
    user.password = faker.internet.password(10);

    return user;
});
