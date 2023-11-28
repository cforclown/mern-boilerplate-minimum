import { Schema } from 'mongoose';
import { ISchedule } from './schedules.types';

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
