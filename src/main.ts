import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";


async function run(port:number){
    const app = await NestFactory.create(AppModule);
    await app.listen(port)
}


run(3001);  