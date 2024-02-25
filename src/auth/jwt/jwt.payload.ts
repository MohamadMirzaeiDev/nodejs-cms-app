import { Role } from "src/user/enum/role.enum";

export interface JwtPayload {
    sub :       string ;
    role :      Role[] ;
    username? : string ;
}