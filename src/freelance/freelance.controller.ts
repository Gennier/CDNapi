import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';

import { FreelanceService } from './freelance.service';

@Controller('freelance')
export class FreelanceController {
    constructor(private freelanceService: FreelanceService) {}

    @Post()
    async addFreelance(
        @Body() allBody: {
            fullname: string,
            email: string,
            phone: string,
            skillsets: string[],
            hobby: string,
            price1: number,
            price2: number
        }
    ) {
        await this.freelanceService.addFreelance(allBody);

        const results = await this.freelanceService.getFreelanceAll();

        return results;
    }

    @Get()
    async getFreelanceAll() {
        const results = await this.freelanceService.getFreelanceAll();

        return results;
    }

    @Put()
    async updateFreelance(
        @Body() allBody: {
            id: string,
            fullname: string,
            email: string,
            phone: string,
            skillsets: string[],
            hobby: string,
            price1: number,
            price2: number
        }
    ) {
        await this.freelanceService.updateFreelance(allBody);

        return null;
    }

    @Put('/hire')
    async hireFreelance(
        @Body('id') id: string
    ) {

        await this.freelanceService.hireFreelance(id);

        return null;
    }

    @Delete(':id')
    async deleteFreelance(@Param('id') freelanceID: string) {
        await this.freelanceService.deleteFreelance(freelanceID);

        const results = await this.freelanceService.getFreelanceAll();

        return results;
    }


}
