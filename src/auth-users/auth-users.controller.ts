import { Controller, Post, Body, Get, UseGuards, Request, Logger, Delete, Param, Patch } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { AuthUsersService } from './auth-users.service';
import { Users } from './auth-users.schema';
import { AuthGuard } from './auth-users.guard';


@Controller('api/auth')
export class AuthUsersController {
    private readonly logger = new Logger(AuthUsersController.name);

    constructor(private readonly authUserService: AuthUsersService) {}

    @GrpcMethod('AuthUsersService', 'Login')
    async grpcLogin(user: Users, metadata: Metadata, call: ServerUnaryCall<any, any>): Promise<any> {
        this.logger.debug('GRPC Login user data: ' + JSON.stringify(user));
        return await this.authUserService.login(user.email, user.password);
    }

    @Post('login')
    async restLoginUser(@Body() user: { email: string; password: string }): Promise<any> {
        this.logger.debug('REST Login user data: ' + JSON.stringify(user));
        return await this.authUserService.login(user.email, user.password);
    }

    @UseGuards(AuthGuard)
    @Post('register')
    async restCreateUser(@Body() user: { email: string; password: string, role:string }): Promise<any> {
        this.logger.debug('REST Login user data: ' + JSON.stringify(user));
        return await this.authUserService.create(user);
    }

    @UseGuards(AuthGuard)
    @Get('users')
    async restGetUsers(@Request() req): Promise<any> {
        return await this.authUserService.getUsers();
    }
    @UseGuards(AuthGuard)
    @Get('users/:id')
    async restGetUser(@Param('id') id: string): Promise<any> {
        return await this.authUserService.getUser(id);
    }
    @UseGuards(AuthGuard)
    @Delete('users/:id')
    async remove(@Param('id') id: string): Promise<any> {
        console.error("DELETING:"+id)
        return await this.authUserService.delete(id);
    }
    @Patch('users/:id')
    async update(@Param('id') id: string, @Body() updateUserDto: { email: string; password: string, role:string }) {
        return this.authUserService.update(id, updateUserDto);
    }
}
