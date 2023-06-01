import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { Injectable } from '@nestjs/common';
import { FindByEmailService } from '@/services/Users/FindByEmailService';

@Injectable()
export class AuthService {
    constructor(
        private usersService: FindByEmailService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email, {
            selectPassword: true
        });

        if (!user) {
            return null;
        }

        const isPasswordCorrect = await argon2.verify(user.password, password);

        if (isPasswordCorrect) {
            const { password, ...result } = user;

            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        const userInDB = await this.usersService.findByEmail(user.email);

        return {
            user: userInDB,
            access_token: this.jwtService.sign(payload)
        };
    }
}
