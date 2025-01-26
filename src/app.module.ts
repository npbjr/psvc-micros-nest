import { HttpException, Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUsersModule } from './auth-users/auth-users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
import { MongooseSchemasModule } from './mongoose/mongoose.module';
import { getModelToken } from '@nestjs/mongoose';
import { AuthUsersService } from './auth-users/auth-users.service';

interface UsersDto { 
  email:string,
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
    (async () => {
      const { AdminModule } = await import('@adminjs/nestjs');

      return AdminModule.createAdminAsync({
        imports:[AppModule,AuthUsersModule],
        inject:[AppService, AuthUsersService],
        useFactory: async (app:AppService,authService:AuthUsersService)=> {
          const test=app.getHello();
          console.log(test)
          return {
            adminJsOptions: {
              rootPath: '/admin',
              resources: []
            },
            auth: {
              authenticate: async (email: string, password: string) =>{
                try{
                  const user = await authService.loginUser(email, password);
                  if(user){
                    return Promise.resolve({email,password});
                  }
                  throw new Error("Invalid Credentials")
                }
                catch(error){
                  console.error("ERROR "+error);
                  throw new Error("Invalid Credentials")
                }
              },
              cookieName:'adminjs',
              cookiePassword:'secret'
            },
            sessionOptions: {
              resave: true,
              saveUninitialized: true,
              secret:'secret'
            }
          }
        }
      })
    })(), 
  ],
  controllers: [AppController],
  providers: [AppService],
  exports:[AppService]
})
export class AppModule {
}
