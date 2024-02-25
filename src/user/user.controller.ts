import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { HasRole } from "src/auth/decorator/role.decorator";
import { Role } from "./enum/role.enum";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/auth/guards/role.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";


@ApiTags('User')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}

    @Get('')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard) 
    async findAll(){
        return this.userService.findAll()
    }

    @Get(':id')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard)
    async findOne(@Param('id') id:string){
        return this.userService.findOne({id})
    }

    
    @Post('')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard)
    async create(@Body() createUserDto:CreateUserDto){
        return this.userService.create(createUserDto)
    }


    @Put(':id')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard)
    async update(@Param('id') id:string , @Body() updateUserDto:UpdateUserDto){
        return this.userService.update(id , updateUserDto);
    }



    @Delete(':id')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard)
    async remove(@Param('id') id:string){
        return this.userService.remove(id);
    }
}