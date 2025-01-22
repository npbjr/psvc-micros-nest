import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUsersModule } from './auth-users/auth-users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUsersService } from './auth-users/auth-users.service';

@Module({
  imports: [AuthUsersModule,

    MongooseModule.forRoot('mongodb://127.0.0.1:27017/psvc')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
