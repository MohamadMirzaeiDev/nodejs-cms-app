import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "src/user/enum/role.enum";

@Injectable()
export class HasRoles implements CanActivate {
    constructor(
        private readonly reflector:Reflector
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride<Role[]>(
            'roles' , 
            [
                context.getHandler(),
                context.getClass()
        ])

        if(!roles){
            return false;
        }

        const {user} = context.switchToHttp().getRequest()
        return roles.some((role)=>user.role?.include(role));
    }
}