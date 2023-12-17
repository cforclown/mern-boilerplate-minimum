import { Schema } from 'mongoose';
import { WithRequired } from '../../utils';

export interface ISchedule {
  _id: string;
  id: string;
  name: string;
  start: Date;
  end?: Date;
  desc?: string;
}

export type ICreateSchedulePayload = Omit<ISchedule, '_id' | 'id'>;

export type IUpdateSchedulePayload = WithRequired<Partial<ISchedule>, '_id' | 'id'>;

export const schedulesSchema = new Schema<ISchedule>({
  name: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: false, default: null },
  desc: { type: String, required: false, default: null }
});

// virtualize _id to id when doing query
schedulesSchema.virtual('id').get(function () {
  return this._id.toString();
});

// Ensure virtual fields are serialised.
schedulesSchema.set('toJSON', {
  virtuals: true
});
