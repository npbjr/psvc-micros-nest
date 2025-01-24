import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUsersModule } from './auth-users/auth-users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUsersService } from './auth-users/auth-users.service';

const DEFAULT_ADMIN = {
  email: 'admin@gmail.com',
  password: 'password'
}

const authenticate = async (email: string, password: string) =>{
  if(email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password){
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
}

@Module({
  imports: [AuthUsersModule,

    MongooseModule.forRoot('mongodb://127.0.0.1:27017/psvc'),

    import('@adminjs/nestjs')
    .then(({AdminModule}) =>
      AdminModule.createAdminAsync({
        useFactory: ()=> ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: []
          },
          auth: {
            authenticate,
            cookieName:'adminjs',
            cookiePassword:'secret'
          },
          sessionOptions: {
            resave: true,
            saveUninitialized: true,
            secret:'secret'
          }
        })
      })
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
