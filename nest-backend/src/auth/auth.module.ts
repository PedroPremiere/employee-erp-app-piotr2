import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import config from '@/config';
import { AuthService } from './auth.service';
import { UsersModule } from '@/modules/UsersModule';
import { LocalStrategy } from '@/auth/local.strategy';
import { LoginController } from '@/controllers/Auth/LoginController';
import { JwtStrategy } from '@/auth/jwt.strategy';

const currentConfig = config();

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: currentConfig.app.secret,
            signOptions: currentConfig.app.signOptions
        })
    ],
    controllers: [LoginController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
