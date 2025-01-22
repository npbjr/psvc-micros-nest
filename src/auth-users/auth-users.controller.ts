import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
interface LoginResponse {
    sessionToken:string;
    message:string;
}
@Controller()
export class AuthUsersController {
    private log:Logger = new Logger(AuthUsersController.name);
    @GrpcMethod('AuthUsersService', 'Login')
    async login(data:any, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<LoginResponse> {
        
        const response:LoginResponse = {
            sessionToken :"1asdkand12932u3",
            message:"test"
        };
        this.log.error("response:",response);
        return response
    }
    
}
