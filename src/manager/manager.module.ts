import { Module } from "@nestjs/common";
import { ManagerController } from "./manager.controller";
import { ManagerService } from "./manager.service";
import { UserModule } from "src/user/user.module";

@Module({
    imports : [UserModule],
    controllers : [ManagerController],
    providers : [ManagerService] ,
})
export class ManagerModule {}