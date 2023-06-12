import { createModel } from 'schemix';

import UserModel from './User.model';

export default createModel(RoleModel => {
    RoleModel.string('id', { id: true, default: { uuid: true } })
        .string('name')
        .dateTime('createdAt', { default: { now: true } })
        .dateTime('updatedAt', { default: { now: true } })
        .dateTime('deletedAt', { optional: true })
        .relation('users', UserModel, { list: true });
});
