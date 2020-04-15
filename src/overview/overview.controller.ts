import { Controller, Get } from '@nestjs/common';

import { OverviewService } from './overview.service';

@Controller('overview')
export class OverviewController {
    constructor(private overviewService: OverviewService) {}

    @Get('latest')
    async getFreelanceAll() {
        const results = await this.overviewService.getFreelanceLatest();

        return results;
    }

    @Get('skills')
    async getFreelanceSkills() {
        const results = await this.overviewService.getFreelanceSkills();

        return results;
    }

    @Get('hire')
    async getFreelanceHire() {
        const results = await this.overviewService.getFreelanceHire();

        return results;
    }

}
