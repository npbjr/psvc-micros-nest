import { Module } from '@nestjs/common';
import { AuthUsersService } from './auth-users.service';
import { AuthUsersController } from './auth-users.controller';

@Module({
  providers: [AuthUsersService],
  controllers: [AuthUsersController]
})
export class AuthUsersModule {}
