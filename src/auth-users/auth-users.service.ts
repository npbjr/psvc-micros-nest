import { Injectable, OnModuleInit, UnauthorizedException, Logger, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users, UserDocument } from './auth-users.schema';
import { jwtConstants } from './constants';

interface UsersDto {
    email: string;
    password: string;
    role: string;
}

@Injectable()
export class AuthUsersService implements OnModuleInit {
    private readonly logger = new Logger(AuthUsersService.name);
    private readonly jwtService: JwtService;

    constructor(@InjectModel(Users.name) private readonly usersModel: Model<UserDocument>) {
        this.jwtService = new JwtService({ secret: jwtConstants.secret });
    }

    async onModuleInit() {
        const DEFAULT_ADMIN: UsersDto = {
            email: process.env.DEFAULT_APP_ADMIN_USER,
            password: process.env.DEFAULT_APP_ADMIN_PASSWORD,
            role: 'admin',
        };

        const user = await this.validateUser(DEFAULT_ADMIN.email, DEFAULT_ADMIN.password);
        this.logger.debug('IS USER ', user);

        if (!user) {
            await this.create(DEFAULT_ADMIN);
        }
    }

    async validateUser(email: string, password: string): Promise<UserDocument | false> {
        const user = await this.usersModel.findOne({ email }).exec();
        if(user == null){
            return false
        }
        const isValidPassword = await bcrypt.compareSync(password.trim(), user.password)
        console.error("CHECK THIS USER ::", user, password.trim(), isValidPassword)
        if (user && isValidPassword) {
            this.logger.debug('USER FOUND', JSON.stringify(user));
            return user;
        }

        this.logger.debug('USER NOT FOUND', { email, password });
        return false;
    }

    async create(userDto: UsersDto): Promise<any> {
        const user = await this.usersModel.findOne({ email:userDto.email }).exec();
        if(user){
            return {message:"Email Already in use", statusCode:409}
        }
        const hashedPassword = await bcrypt.hash(userDto.password.trim(), 10);
        this.logger.debug('HASHED PASSWORD', hashedPassword);
        
        const newUser = new this.usersModel({
            email: userDto.email,
            password: hashedPassword,
            role: userDto.role
        });

        return await newUser.save();
    }

    async login(email: string, password: string): Promise<{ accessToken: string; statusCode: number }> {
        const user = await this.validateUser(email, password);  
        if (!user) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.email, password: user.password };
        return {
            accessToken: await this.jwtService.signAsync(payload),
            statusCode: 201,
        };
    }

    async getUsers(): Promise<UserDocument[]> {
        return await this.usersModel.find().exec();
    }
    async getUser(id:string): Promise<UserDocument> {
        return await this.usersModel.findById(id).exec();
    }

    async delete(id:string): Promise<any>{
        console.error("DELETING:"+id)
        return await this.usersModel.findByIdAndDelete(id).exec();
    }

    async update(id:string, userData:any): Promise<any>{
        console.error("updating:"+id)
        const user = await this.usersModel.findByIdAndUpdate(id,userData ).exec();
        console.error("done updating user:"+JSON.stringify(user))
        return user
    }
}
