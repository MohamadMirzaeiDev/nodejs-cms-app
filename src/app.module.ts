import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./config/database.module";
import { UserModule } from './user/user.module';

@Module({
    imports : [
        ConfigModule.forRoot({isGlobal : true}) ,
        DatabaseModule,
        UserModule ,
    ],
    controllers : []
})
export class AppModule {}