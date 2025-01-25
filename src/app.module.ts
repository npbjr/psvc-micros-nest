import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUsersModule } from './auth-users/auth-users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const DEFAULT_ADMIN = {
  email: 'admin@gmail.com',
  password: 'password'
}

interface Users { 
  username:string,
  password:string
}

@Module({
  imports: [
    ConfigModule.forRoot({
        envFilePath:'.env',
        isGlobal:true
      }),
      MongooseModule.forRoot(process.env.DB),
    AuthUsersModule,
    import('@adminjs/nestjs')
    .then(({AdminModule}) =>
      AdminModule.createAdminAsync({
        useFactory: ()=> ({
          adminJsOptions: {
            rootPath: '/admin',
            resources: []
          },
          auth: {
            authenticate: async (email: string, password: string, authModule:AuthUsersModule) =>{
              
              const user:Users = await authModule.authUsersService.loginUser(email, password)
              if(email === user.username && password === user.password){
                return Promise.resolve({email,password});
              }
              return null;
            },
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
export class AppModule {
}
