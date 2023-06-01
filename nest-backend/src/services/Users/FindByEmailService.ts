import { Injectable } from '@nestjs/common';

import { User } from '@/entities/User';
import { UsersRepository } from '@/repositories/UsersRepository';
import { FindOptionsSelect } from 'typeorm';

export type FindByEmailServiceOptions = {
    selectPassword: boolean;
};

@Injectable()
export class FindByEmailService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async findByEmail(
        email: string,
        options: FindByEmailServiceOptions = {
            selectPassword: false
        }
    ): Promise<User> {
        const { selectPassword } = options;

        const toSelect = ['id', 'email'];

        if (selectPassword) {
            toSelect.push('password');
        }

        const select = toSelect as FindOptionsSelect<User>;

        const user = await this.usersRepository.findOne({
            where: { email },
            select
        });

        return user;
    }
}

//<html>TS2322: Type 'string[]' is not assignable to type 'FindOptionsSelect&lt;User&gt; | FindOptionsSelectByString&lt;User&gt;'.<br/>Type 'string[]' is not assignable to type 'FindOptionsSelectByString&lt;User&gt;'.<br/>Type 'string' is not assignable to type 'keyof User'.
