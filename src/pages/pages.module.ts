import { Module } from '@nestjs/common';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pages, PagesSchema } from './pages.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth-users/constants';
@Module({
  imports:[MongooseModule.forFeature([{name:Pages.name, schema:PagesSchema}])],
  providers: [PagesService],
  controllers: [PagesController],
  
  exports:[PagesService]
})
export class PagesModule {}
