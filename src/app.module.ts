import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./config/database.module";
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
    imports : [
        ConfigModule.forRoot({isGlobal : true}) ,
        DatabaseModule,
        UserModule,
        AuthModule ,
    ],
    controllers : [AuthController],
    providers: [AuthService]
})
export class AppModule {}