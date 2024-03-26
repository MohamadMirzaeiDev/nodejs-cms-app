import { Controller, Get, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HasRole } from "src/auth/decorator/role.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/role.guard";
import { Role } from "src/user/enum/role.enum";
import { PasswordInterceptor } from "src/user/password.interceptor";
import { UserService } from "src/user/user.service";

@ApiTags('Manager')
@ApiBearerAuth('access-token')
@Controller('manager')
export class ManagerController {
    constructor(
        private readonly userService:UserService ,
    ){}

    @Get('')
    @HasRole(Role.ADMIN)
    @UseGuards(JwtAuthGuard , RolesGuard)
    @UseInterceptors(PasswordInterceptor)
    async findAll(){
        return await this.userService.findAllAdmin();
    }
    
}