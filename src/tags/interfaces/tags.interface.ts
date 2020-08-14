import { Document } from 'mongoose';

export interface ITags extends Document {
    readonly name: string;
}
