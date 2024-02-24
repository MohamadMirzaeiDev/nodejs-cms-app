import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";


async function run(port:number , host:string){
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe())
    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    });
    
    const config = new DocumentBuilder()
        .setTitle('Node CMS App')
        .setDescription('Powerful content managment system')
        .setVersion('0.1.0')
        .addTag('CMS')
        .build()

    const document = SwaggerModule.createDocument(app , config)

    SwaggerModule.setup('api' , app , document);

    await app.listen(port , host)
}


run(3000 , '0.0.0.0');  