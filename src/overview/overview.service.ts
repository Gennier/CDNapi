import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';

import { Freelance } from '../models/freelance.model'

@Injectable()
export class OverviewService {
    constructor(@InjectModel('Freelance') private freelanceModel: Model<Freelance>) {}

    async getFreelanceLatest() {

        try {

            const results = await this.freelanceModel.find({}).sort({createdat: -1}).limit(10).exec();

            return results.map((result) => ({
                id: result.id,
                fullname: result.fullname,
                email: result.email,
                phone: result.phone,
                skillsets: result.skillsets,
                hobby: result.hobby,
                price1: result.price1,
                price2: result.price2,
                createdat: moment(result.createdat).format('YYYY-MM-DD HH:mm')
            }));

        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }
        
    }

    async getFreelanceHire() {

        try {

            const resultHire = await this.freelanceModel.find({hire: true}).countDocuments().exec();
            const resultAll = await this.freelanceModel.find({}).countDocuments().exec();

            const result = {
                hire: resultHire,
                all: resultAll,
            }

            return result;

        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }
    }

    async getFreelanceSkills() {

        try{

            const results = await this.freelanceModel.find().select('skillsets').exec();
            const skillsArray = [];

            for (const skill of results) {
                for ( const str of skill.skillsets) {
                    skillsArray.push(str);
                }
            }

            const filteredArray = await this.countSkillsArray(skillsArray);

            return filteredArray;

        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }
    }

    private countSkillsArray(skillArray: string[]) {
        try{

            skillArray.sort();

            let currentSkill = null;
            let count = 0;

            const skillNameArray = [];
            const skillCountArray = [];
            const skillObjectArray = []

            for (const skill of skillArray) {

                if (!currentSkill) {
                    currentSkill = skill;
                    count++;
                    continue;
                }

                if (skill != currentSkill) {

                    skillNameArray.push(currentSkill);
                    skillCountArray.push(count);

                    const object = {
                        skill: currentSkill,
                        count: count
                    };

                    skillObjectArray.push(object);

                    count = 1;

                } else {
                    count++;
                }

                currentSkill = skill;
            }

            skillNameArray.push(currentSkill);
            skillCountArray.push(count);

            const object = {
                skill: currentSkill,
                count: count
            };

            skillObjectArray.push(object);

            const skillTotalArray = {
                skill: skillNameArray,
                count: skillCountArray,
                object: skillObjectArray
            }

            return skillTotalArray;
            
        } catch (error) {
            console.log(error);
            throw new BadRequestException();
        }
        
    }
}