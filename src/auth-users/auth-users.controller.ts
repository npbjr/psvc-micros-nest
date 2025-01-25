import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthUsersService } from './auth-users.service';
interface LoginResponse {
    sessionToken:string;
    message:string;
}
@Controller()
export class AuthUsersController {
    // private log:Logger = new Logger(AuthUsersController.name);
    // constructor(private readonly authUserService:AuthUsersService) {}
    // @GrpcMethod('AuthUsersService', 'Login')
    // async login(u:any, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<LoginResponse> {
        
    //     return await this.authUserService.loginUser(data);
    // }
    
}
