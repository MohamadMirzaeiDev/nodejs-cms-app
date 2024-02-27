import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { HasRole } from "src/auth/decorator/role.decorator";
import { Role } from "./enum/role.enum";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/auth/guards/role.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDto } from "./dto/user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";


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
        const users = await this.userService.findAll()

        const result = users.map((user)=>{
          return new UserDto(user) 
        })

        return result ;  
    }

    @Get(':id')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard)
    async findOne(@Param('id') id:string){
        const user = new UserDto(await this.userService.findOne({id}))
        
        if(!user){
            throw new NotFoundException('invalid request')
        }

        return user
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


    @Delete(':id')
    @HasRole(Role.ADMIN)   
    @UseGuards(JwtAuthGuard , RolesGuard)
    async changePassword(@Body() changePasswordDto:ChangePasswordDto ,@Param('id') id:string){
        return this.userService.changePassword(changePasswordDto , id);
    }

}