import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ITags} from "./interfaces/tags.interface";

@Injectable()
export class TagsService {
    constructor(
        @InjectModel('Tags') private readonly tagsModel: Model<ITags>,
    ) {

    }

    async tagsList() {
        return this.tagsModel.find()
    }
}
