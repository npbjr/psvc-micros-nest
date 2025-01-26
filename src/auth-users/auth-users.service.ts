import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Users, UserDocument } from './auth-users.schema';
import { Model } from 'mongoose';
import * as bcrypt from "bcrypt";
import { Logger } from '@nestjs/common';

interface UsersDto {
    email:string,
    password:string,
    role:string
}

@Injectable()
export class AuthUsersService implements OnModuleInit {

    constructor(@InjectModel(Users.name) private readonly usersModel: Model<UserDocument>){}
    private logger:Logger = new Logger(AuthUsersService.name);
    
    async onModuleInit() {
        //create default admin users
        const DEFAULT_ADMIN:UsersDto = {
            email:process.env.DEFAULT_APP_ADMIN_USER,
            password:process.env.DEFAULT_APP_ADMIN_PASSWORD,
            role:"ROLE_ADMIN"
        }
        const user = await this.validateUser(DEFAULT_ADMIN.email, DEFAULT_ADMIN.password)
        this.logger.debug("IS USER ",user)
        if(user){
            this.registerUser(DEFAULT_ADMIN)
        }
            
        
        
    }

    async validateUser(email:string, password:string): Promise<Boolean> {
        const user = await this.usersModel.findOne({email}).exec();
        
        if (user && await bcrypt.compare(password.trim(), user.password)){
            this.logger.debug("USER FOUND", JSON.stringify(user))
            return true;
        }
        this.logger.debug("USER NOT FOUND")
        this.logger.debug("input email: "+email)
        this.logger.debug("input password: "+password)
        return false;
    }
    async registerUser(userDto:UsersDto): Promise<any> {
        this.logger.debug(" PASWORD ", userDto.password);
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        this.logger.debug("HASHED PASWORD ", hashedPassword);

        const newUser = new this.usersModel({email:userDto.email, password:hashedPassword, role:[userDto.role]})
        return await newUser.save();
    }
    async loginUser(email:string, password:string): Promise<any> {
        return await this.validateUser(email, password)
        
    }


}
