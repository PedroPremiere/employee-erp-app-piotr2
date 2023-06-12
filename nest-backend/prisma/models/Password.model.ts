import { createModel } from 'schemix';

import UserModel from './User.model';

export default createModel(PasswordModel => {
    PasswordModel.string('id', { id: true, default: { uuid: true } })
        .string('password')
        .dateTime('createdAt', { default: { now: true } })
        .dateTime('updatedAt', { default: { now: true } })
        .dateTime('deletedAt', { optional: true })
        .relation('user', UserModel, {
            fields: ['userId'],
            references: ['id']
        })
        .string('userId', { unique: true });
});
