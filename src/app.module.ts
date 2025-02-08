import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUsersModule } from './auth-users/auth-users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PagesModule } from './pages/pages.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pages, PagesDocument, PagesSchema } from './pages/pages.schema';
import { jwtConstants } from './auth-users/constants';
import { JwtModule } from '@nestjs/jwt';
import { Users, UsersSchema } from './auth-users/auth-users.schema';
import { Comments, CommentsSchema } from './comments/comments.schema';
import { LottoModule } from './lotto/lotto.module';
import { LottoResult } from './lotto/lotto.results.schema';
import { DrawSchedule } from './lotto/lotto.drawschedule.schema';
import { LottoType } from './lotto/lotto.lottotype.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      password: 'admin',
      username: 'postgres',
      entities: [LottoResult, DrawSchedule, LottoType],
      database: 'psvc',
      synchronize: true,
      logging: true,
    }),
    AuthUsersModule,
    PagesModule,
    CommentsModule,
    LottoModule
 
],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
