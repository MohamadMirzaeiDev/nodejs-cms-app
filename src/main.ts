import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


async function run(port:number){
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Node CMS App')
        .setDescription('Powerful content managment system')
        .setVersion('0.1.0')
        .addTag('CMS')
        .build()

    const document = SwaggerModule.createDocument(app , config)

    SwaggerModule.setup('api' , app , document);

    await app.listen(port)
}


run(3001);  