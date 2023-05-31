import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { conf } from '@/config';

import { JwtStrategy } from '@/auth/jwt.strategy';
import { UsersModule } from '@/modules/UsersModule';
import { LocalStrategy } from '@/auth/local.strategy';
import { AuthService } from '@/services/Auth/AuthService';
import { UsersRepository } from '@/repositories/UsersRepository';
import { LoginController } from '@/controllers/Auth/LoginController';
import { UniqueMail } from '@/decorators/validators/user/UniqueMail';
import { CreateUserService } from '@/services/Users/CreateUserService';
import { RegisterController } from '@/controllers/Auth/RegisterController';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: conf.security.secret,
            signOptions: conf.security.signOptions
        })
    ],
    controllers: [LoginController, RegisterController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        CreateUserService,
        UsersRepository,
        UniqueMail
    ]
})
export class AuthModule {}
