import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { conf } from '@/config';

import { AuthService } from './auth.service';
import { UsersModule } from '@/modules/UsersModule';
import { LocalStrategy } from '@/auth/local.strategy';
import { LoginController } from '@/controllers/Auth/LoginController';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { RegisterController } from '@/controllers/Auth/RegisterController';
import { CreateUserService } from '@/services/Users/CreateUserService';
import { UsersRepository } from '@/repositories/UsersRepository';

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
        UsersRepository
    ]
})
export class AuthModule {}
