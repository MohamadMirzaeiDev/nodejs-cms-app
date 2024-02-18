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
                host : configService.get('POSTGRES_HOST') , 
                port : configService.get('POSTGRES_PORT') , 
                database : configService.get('POSTGRES_DATABASE') , 
                username : configService.get('POSTGRES_USERNAME') , 
                password : configService.get('POSTGRES_PASSWORD') , 
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