import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./config/database.module";

@Module({
    imports : [
        ConfigModule.forRoot({isGlobal : true}) ,
        DatabaseModule ,
    ],
    controllers : []
})
export class AppModule {}