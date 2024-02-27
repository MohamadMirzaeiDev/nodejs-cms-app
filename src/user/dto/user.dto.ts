import { User } from "src/user/entities/user.entity";
import { Role } from "src/user/enum/role.enum";

export class UserDto {
    id: string ; 
    username : string ; 
    email : string  ;
    first_name : string ;
    last_name : string ;
    roles : Role[];

    constructor(user:any){
        this.id = user.id ;
        this.username = user.username ;
        this.email = user.email ;
        this.first_name = user.first_name ;
        this.last_name = user.last_name ;
        this.roles = user.roles ;
    }
}