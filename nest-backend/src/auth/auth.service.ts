import { Injectable } from '@nestjs/common';

import { FindByEmailService } from '@/services/Users/FindByEmailService';

@Injectable()
export class AuthService {
    constructor(private usersService: FindByEmailService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (user && user.password === password) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }
}
