import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { conf } from '@/config';

import { JwtStrategy } from '@/auth/jwt.strategy';
import { UsersModule } from '@/modules/UsersModule';
import { LocalStrategy } from '@/auth/local.strategy';
import { AuthService } from '@/services/Auth/AuthService';
import { LoginController } from '@/controllers/Auth/LoginController';
import { CreateUserService } from '@/services/Users/CreateUserService';
import { RegisterController } from '@/controllers/Auth/RegisterController';
import { UniqueMailDecorator } from '@/decorators/validators/user/unique-mail-decorator.service';
import { PrismaService } from '@/services/PrismaService.service';
import { PrismaServiceFactory } from '@/services/PrismaServiceFactory.service';

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
        UniqueMailDecorator,
        {
            provide: PrismaService,
            useValue: PrismaServiceFactory.create()
        }
    ]
})
export class AuthModule {}
