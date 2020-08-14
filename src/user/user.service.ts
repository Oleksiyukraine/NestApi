import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { Model } from 'mongoose';

import { IUser } from './interfaces/user.interface';
import { ITags } from '../tags/interfaces/tags.interface';

import { CreateUserDto } from './dto/create-user.dto';

//Services
import { MailService } from '../mail/mail.service';
import { TagsService } from '../tags/tags.service';


@Injectable()
export class UserService {

    private readonly saltRounds = 10;

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        private readonly mailService: MailService,
        private readonly tagsService: TagsService
    ) {

    }

    async tagList(): Promise<ITags[]> {
        return this.tagsService.tagsList();
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
    }

    async create(createUserDto: CreateUserDto, roles: string[]): Promise<IUser> {
        console.log('createUserDto', createUserDto)
        const hash = await this.hashPassword(createUserDto.password);
        const createdUser = new this.userModel(_.assignIn(createUserDto, { password: hash, roles }));
        return await createdUser.save();
    }

    async find(id: string): Promise<IUser> {
        return await this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<IUser> {
        return await this.userModel.findOne({ email }).exec();
    }

    async update(id: string, payload: Partial<IUser>) {
        return this.userModel.updateOne({_id: id}, payload);
    }
}
