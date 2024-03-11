import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HasRole } from "src/auth/decorator/role.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/role.guard";
import { UserDto } from "src/user/dto/user.dto";
import { Role } from "src/user/enum/role.enum";
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
    async findAll(){
        const result = await this.userService.findAllAdmin();
        
        return result.map(user=> (new UserDto(user)))
    }
    
}