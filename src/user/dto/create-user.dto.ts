import { Role } from "../enum/role.enum";

export class CreateUserDto {
    first_name : string ; 

    last_name : string ; 

    email : string ;

    username : string ; 

    password : string ; 

    role : Role ; 
}