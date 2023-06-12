import { createModel } from 'schemix';

import RoleModel from './Role.model';
import ContractModel from './Contract.model';
import PasswordModel from './Password.model';

export default createModel(UserModel => {
    UserModel.string('id', { id: true, default: { uuid: true } })
        .string('email', { unique: true })
        .dateTime('createdAt', { default: { now: true } })
        .dateTime('updatedAt', { default: { now: true } })
        .dateTime('deletedAt', { optional: true })
        .relation('roles', RoleModel, { list: true })
        .relation('contracts', ContractModel, { list: true })

        .relation('password', PasswordModel, { optional: true });
});
