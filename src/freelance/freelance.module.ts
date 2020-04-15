import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { FreelanceService } from './freelance.service';
import { FreelanceController } from './freelance.controller';
import { freelanceSchema } from '../models/freelance.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Freelance', schema: freelanceSchema}])
    ],
    controllers: [FreelanceController],
    providers: [FreelanceService],
})

export class FreelanceModule {}