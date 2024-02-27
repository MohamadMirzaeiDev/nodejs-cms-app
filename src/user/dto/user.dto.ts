import { User } from "src/user/entities/user.entity";
import { Role } from "src/user/enum/role.enum";

export class UserDto {
    id: string ; 
    username : string ; 
    email : string  ;
    first_name : string ;
    last_name : string ;
    roles : Role[];
    home_phone_number : string;
    phone_number : string ;  
    address : string ;
    country : string ;    
    city : string ; 
    postal_code: string ;
    note : string ; 

    constructor(user:any){
        this.id = user.id ;
        this.username = user.username ;
        this.email = user.email ;
        this.first_name = user.first_name ;
        this.last_name = user.last_name ;
        this.roles = user.roles ;
        this.address = user.address ;
        this.city = user.city ;
        this.country = user.country ;
        this.phone_number = user.phone_number ;
        this.home_phone_number = user.home_phone_number ;
        this.postal_code = user.postal_code ;
        this.note = user.note ;
    }
}