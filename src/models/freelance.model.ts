import * as mongoose from 'mongoose';

export const freelanceSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  skillsets: [{ type: String, required: true, lowercase: true }],
  hobby: { type: String, required: true },
  price1: { type: Number, required: true },
  price2: { type: Number, required: true },
  createdat: { type: Date, required: true },
  hire: { type: Boolean, required: true },
});

export interface Freelance extends mongoose.Document{
  id: string,
  fullname: string,
  email: string,
  phone: string,
  skillsets: string[],
  hobby: string,
  price1: number,
  price2: number
  createdat: Date;
  hire: boolean;
};