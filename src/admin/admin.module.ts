import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PassportModule } from '@nestjs/passport';
import { passportConfig } from 'src/config/passport.config';
import { UserModule } from 'src/user/user.module';

@Module({
    imports : [
        PassportModule.register(passportConfig) ,
        UserModule ,
    ],
    controllers : [AdminController],
    providers : [AdminService] ,
})
export class AdminModule {}
