import * as mongoose from 'mongoose';

export const TagsSchema = new mongoose.Schema({
    name: { type:String, required: true }
})

TagsSchema.index({ name: 1 }, { unique: false });
