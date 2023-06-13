import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { conf } from '@/project/config';

import { JwtStrategy } from '@/apps/Auth/jwt/jwt.strategy';
import { UsersModule } from '@/apps/User/UsersModule';
import { LocalStrategy } from '@/apps/Auth/strategies/local.strategy';
import { AuthService } from '@/apps/Auth/services/AuthService';
import { LoginController } from '@/apps/Auth/controllers/LoginController';
import { CreateUserService } from '@/apps/User/services/CreateUserService';
import { RegisterController } from '@/apps/Auth/controllers/RegisterController';
import { UniqueMailDecorator } from '@/apps/User/validators/unique-mail-decorator.service';
import { PrismaService } from '@/apps/PrismaService.service';
import { PrismaServiceFactory } from '@/apps/Auth/PrismaServiceFactory.service';

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
