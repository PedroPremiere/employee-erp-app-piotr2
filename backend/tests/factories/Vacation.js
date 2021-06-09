const faker = require('faker');
const { Vacation } = require('../../src/models');

class VacationFactory {
    static generate(userId, props) {
        const defaultProps = {
            id: faker.datatype.uuid(),
            userId: userId,
            endDate: faker.date.future().toISOString().split('T')[0],
            startDate: faker.date.past().toISOString().split('T')[0],
            isConfirmed: false
        };
        return Object.assign({}, defaultProps, props);
    }

    static create(props) {
        return Vacation.create(props);
    }

    static build(props) {
        return Vacation.build(VacationFactory.generate(props.userId, props));
    }
}

module.exports = VacationFactory;
