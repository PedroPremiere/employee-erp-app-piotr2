import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { FindByEmailService } from '@/apps/User/services/FindByEmailService';

@ValidatorConstraint({ name: 'UniqueMail', async: true })
@Injectable()
export class UniqueMailDecorator implements ValidatorConstraintInterface {
    constructor(protected readonly findByEmailService: FindByEmailService) {}

    async validate(email: string | undefined) {
        if (!email) {
            return true;
        }

        const userInDB = await this.findByEmailService.findByEmail(email);

        return !userInDB;
    }
}