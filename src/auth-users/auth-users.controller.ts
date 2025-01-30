import { Controller, Post, Body, Get, UseGuards, Request, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { AuthUsersService } from './auth-users.service';
import { Users } from './auth-users.schema';
import { AuthGuard } from './auth-users.guard';

interface LoginResponse {
    sessionToken: string;
    message: string;
}

@Controller()
export class AuthUsersController {
    private readonly logger = new Logger(AuthUsersController.name);

    constructor(private readonly authUserService: AuthUsersService) {}

    @GrpcMethod('AuthUsersService', 'Login')
    async grpcLogin(user: Users, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<any> {
        this.logger.debug('GRPC Login user data: ' + JSON.stringify(user));
        return await this.authUserService.loginUser(user.email, user.password);
    }

    @Post('login')
    async restLogin(@Body() user: { email: string; password: string }): Promise<any> {
        this.logger.debug('REST Login user data: ' + JSON.stringify(user));
        return await this.authUserService.loginUser(user.email, user.password);
    }

    @UseGuards(AuthGuard)
    @Get('users')
    async restGetUsers(@Request() req): Promise<any> {
        return await this.authUserService.getUsers();
    }
}
