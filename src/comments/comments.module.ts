import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { jwtConstants } from 'src/auth-users/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from './comments.schema';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports:[ MongooseModule.forFeature([{name: Comments.name, schema:CommentsSchema}]), JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),],
    providers:[CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
