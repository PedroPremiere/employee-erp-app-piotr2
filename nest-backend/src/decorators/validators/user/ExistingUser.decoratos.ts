import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { UsersRepository } from '@/repositories/UsersRepository';
import { User } from '@/entities/User';

@ValidatorConstraint({ name: 'DoesUserExist', async: true })
@Injectable()
export class ExistingUserDecoratos implements ValidatorConstraintInterface {
    constructor(protected readonly usersRepository: UsersRepository) {}

    async validate(user: User | undefined) {
        if (!user) {
            return false;
        }

        const { id } = user;

        const userInDB = await this.usersRepository.findOne({
            where: { id }
        });

        return !!userInDB;
    }
}
