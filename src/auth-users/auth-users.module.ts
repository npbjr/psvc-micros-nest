import { Module } from '@nestjs/common';
import { AuthUsersService } from './auth-users.service';
import { AuthUsersController } from './auth-users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema, UserDocument, Users } from './auth-users.schema';

@Module({
  imports: [

    MongooseModule.forFeature([{name: Users.name, schema:UsersSchema}])
  ],
  providers: [AuthUsersService],
  controllers: [AuthUsersController]
})
export class AuthUsersModule {}
