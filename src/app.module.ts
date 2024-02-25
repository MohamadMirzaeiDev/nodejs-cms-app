import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./config/database.module";
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';

@Module({
    imports : [
        ConfigModule.forRoot({isGlobal : true}) ,
        DatabaseModule,
        UserModule,
        AuthModule,
        EmailModule,
        AdminModule ,
    ],
    controllers : [AuthController],
    providers: [AuthService, EmailService, AdminService]
})
export class AppModule {}