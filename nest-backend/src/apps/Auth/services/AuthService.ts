import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { Injectable } from '@nestjs/common';
import { FindByEmailService } from '@/apps/User/services/FindByEmailService';
import { PrismaService } from '@/apps/PrismaService.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: FindByEmailService,
        private jwtService: JwtService,
        private readonly prismaService: PrismaService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            return null;
        }

        const passwordHash = await this.prismaService.password.findFirst({
            where: { user }
        });

        const isPasswordCorrect = await argon2.verify(
            passwordHash.password,
            password
        );

        if (isPasswordCorrect) {
            const { ...result } = user;

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
