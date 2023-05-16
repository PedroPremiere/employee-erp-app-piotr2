import { setSeederFactory } from 'typeorm-extension';
import { User } from '@/entities/User';

export default setSeederFactory(User, faker => {
    const user = new User();
    user.id = faker.datatype.uuid();
    user.email = faker.internet.email();
    user.password = faker.internet.password(10);

    return user;
});
