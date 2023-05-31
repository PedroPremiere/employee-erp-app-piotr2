import {
    ValidatorConstraint,
    ValidatorConstraintInterface
} from 'class-validator';
import { Injectable } from '@nestjs/common';

import { FindByEmailService } from '@/services/Users/FindByEmailService';

@ValidatorConstraint({ name: 'UniqueMail', async: true })
@Injectable()
export class UniqueMail implements ValidatorConstraintInterface {
    constructor(protected readonly findByEmailService: FindByEmailService) {}

    async validate(email: string | undefined) {
        if (!email) {
            return true;
        }

        const userInDB = await this.findByEmailService.findByEmail(email);

        return !userInDB;
    }

    public defaultMessage() {
        return 'Email already taken';
    }
}
