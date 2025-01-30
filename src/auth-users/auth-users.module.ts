import { Module } from '@nestjs/common';
import { AuthUsersService } from './auth-users.service';
import { AuthUsersController } from './auth-users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './auth-users.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
@Module({
  imports:[ MongooseModule.forFeature([{name: Users.name, schema:UsersSchema}]), JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],
  providers: [AuthUsersService],
  controllers: [AuthUsersController],
  exports:[AuthUsersService]
})
export class AuthUsersModule {
  
}
