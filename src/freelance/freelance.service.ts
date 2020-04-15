import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';

import { Freelance } from '../models/freelance.model'

@Injectable()
export class FreelanceService {

    constructor(@InjectModel('Freelance') private freelanceModel: Model<Freelance>) {}

    async addFreelance(details) {

        try{

            const { fullname, email, phone, skillsets, hobby, price1, price2 } = details;

            const check = await this.freelanceModel.find({ $or: [{email: email}, {phone: phone}]});

            if (check) {
                throw new BadRequestException('Already Exist');
            }
            
            const newFreelance = new this.freelanceModel({
                fullname,
                email,
                phone,
                skillsets,
                hobby,
                price1,
                price2,
                createdat: moment().format(),
                hire: false
            });

            const result = await newFreelance.save();

            return result.id as string;

        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }
    }

    async getFreelanceAll() {

        try {

            const results = await this.freelanceModel.find().exec();

            return results.map((result) => ({
                id: result.id,
                fullname: result.fullname,
                email: result.email,
                phone: result.phone,
                skillsets: result.skillsets,
                hobby: result.hobby,
                price1: result.price1,
                price2: result.price2,
                hire: result.hire
            }));

        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }
    }

    async hireFreelance(id: string) {

        try{

            const freelance = await this.getSingleFreelance(id);

            if (freelance.hire) {
                freelance.hire = false;
            } else {
                freelance.hire = true;
            }
        
            freelance.save();
            
            return freelance;

        } catch (error) {
            console.log(error);
            throw new NotFoundException();
        }
    }

    async updateFreelance(details) {

        try{

            const { id, fullname, email, phone, skillsets, hobby, price1, price2 } = details;

            const freelance = await this.getSingleFreelance(id);
            
            freelance.fullname = !fullname ? freelance.fullname : fullname;
            freelance.email = !email ? freelance.email : email;
            freelance.phone = !phone ? freelance.phone : phone;
            freelance.skillsets = !skillsets ? freelance.skillsets : skillsets;
            freelance.hobby = !hobby ? freelance.hobby : hobby;
            freelance.price1 = !price1 ? freelance.price1 : price1;
            freelance.price2 = !price2 ? freelance.price2 : price2;

            freelance.save();
            
            return freelance;

        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }

    }

    async deleteFreelance(id: string) {

        try {
            
            await this.freelanceModel.deleteOne({_id: id}).exec();

        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }
    }

    private async getSingleFreelance(id: string): Promise<Freelance> {

        const result = await this.freelanceModel.findById(id);

        if (!result) {
            throw new NotFoundException('Freelance does not exist');
        }

        return result;
    }
}