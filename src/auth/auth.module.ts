import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.startegy';
import { UserModule } from 'src/user/user.module';
import { passportConfig } from 'src/config/passport.config';

@Module({
    imports : [
        ConfigModule ,
        UserModule ,
        PassportModule.register(passportConfig) ,
        JwtModule.registerAsync({
            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory : (config:ConfigService)=>({
                secret : config.get('JWT_SECRET_KEY') ,
                signOptions : {
                    expiresIn : '10d'
                }
            })
        })
    ],
    controllers : [AuthController] ,
    providers : [AuthService , JwtStrategy] , 
    exports : [JwtModule , PassportModule],
})
export class AuthModule {}
