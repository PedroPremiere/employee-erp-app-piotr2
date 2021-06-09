const faker = require('faker');
const { Contract } = require('../../src/models');

class ContractFactory {
    static generate(userId, props) {
        const defaultProps = {
            id: faker.datatype.uuid(),
            userId: userId,
            position: faker.name.jobTitle(),
            vacationDaysPerYear: faker.random.objectElement({
                small: 20,
                big: 26
            }),
            endDate: faker.date.future().toISOString().split('T')[0],
            startDate: faker.date.past().toISOString().split('T')[0],
            vacationDays: faker.datatype.number()
        };

        return Object.assign({}, defaultProps, props);
    }

    static create(props) {
        return Contract.create(props);
    }

    static build(props) {
        return Contract.build(ContractFactory.generate(props.userId, props));
    }
}

module.exports = ContractFactory;
