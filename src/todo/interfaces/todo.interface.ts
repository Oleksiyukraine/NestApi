import { Document } from 'mongoose';

export interface ITodoInterface extends Document{
    readonly userId: number,
    readonly id: number,
    readonly title: string,
    readonly completed: boolean,
}
