import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FreelanceModule } from './freelance/freelance.module';
import { OverviewModule } from './overview/overview.module';



@Module({
  imports: [
    OverviewModule,
    UserModule,
    FreelanceModule,
    MongooseModule.forRoot('mongodb://localhost:27017/Etiqa')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
