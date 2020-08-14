import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, required: false, default: false }
});

TodoSchema.index({ name: 1 }, { unique: false });
