import { createModel } from 'schemix';
import UserModel from './User.model';

export default createModel(ContractModel => {
    ContractModel.string('id', { id: true, default: { uuid: true } })
        .string('position')
        .dateTime('startDate')
        .dateTime('endDate')
        .int('vacationDaysPerYear')
        .int('vacationDays')
        .dateTime('createdAt', { default: { now: true } })
        .dateTime('updatedAt', { default: { now: true } })
        .dateTime('deletedAt', { optional: true })
        .relation('user', UserModel, {
            fields: ['ownerId'],
            references: ['id']
        })
        .string('ownerId');
});
