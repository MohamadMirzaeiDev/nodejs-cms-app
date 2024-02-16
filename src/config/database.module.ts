import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports :[
        TypeOrmModule.forRootAsync({
            imports : [ConfigModule] , 
            inject : [ConfigService] ,
            useFactory : (configService:ConfigService)=>({
                type : "postgres" ,
                database : configService.get<string>("POSTGRES_DATABASE") , 
                host : configService.get<string>("POSTGRES_HOST") ,
                port : configService.get<number>("POSTGRES_PORT") ,
                username : configService.get<string>("POSTGRES_USERNAME") , 
                password : configService.get<string>("POSTGRES_PASSWORD") , 
                entities : [ 
                    "dist/**/*.entity{.ts,.js}",
                    "src/**/*.entity{.ts,.js}"
                ],
                synchronize : true ,
            })
        })
    ]
})
export class DatabaseModule {}