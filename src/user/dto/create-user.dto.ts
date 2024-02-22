import { Role } from "../enum/role.enum";

export class CreateUserDto {
    id : string ;

    first_name : string ; 

    last_name : string ; 

    email : string ;

    username : string ; 

    password : string ; 

    role : Role ; 
}
