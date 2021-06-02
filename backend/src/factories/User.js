const faker = require('faker');
const { User } = require('../models');

class UserFactory {
    static generate(props) {
        const defaultProps = {
            id: faker.datatype.uuid(),
            email: faker.internet.email(),
            firstName: faker.name.firstName(null),
            lastName: faker.name.lastName(null),
            password: faker.internet.password(),
            birthDate: faker.date.past()
        };

        return Object.assign({}, defaultProps, props);
    }

    static create(props) {
        return User.create(UserFactory.generate(props));
    }

    static build(props) {
        return User.build(UserFactory.generate(props));
    }
}

module.exports = UserFactory;
