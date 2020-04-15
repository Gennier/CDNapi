import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports: [
        // MongooseModule.forFeature([])
    ],
    controllers: [UserController],
    providers: [UserService],
})

export class UserModule {}