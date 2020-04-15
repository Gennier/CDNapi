import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

import { OverviewService } from './overview.service';
import { OverviewController } from './overview.controller';

import { freelanceSchema } from '../models/freelance.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Freelance', schema: freelanceSchema}])
    ],
    controllers: [OverviewController],
    providers: [OverviewService],
})

export class OverviewModule {}