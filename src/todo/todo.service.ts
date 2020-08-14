import { ITodoInterface } from './interfaces/todo.interface';

import { HttpService, Injectable, Logger} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class TodoService {
    private readonly logger = new Logger(TodoService.name);

    constructor(
        @InjectModel('Todo') private readonly todoModel: Model<ITodoInterface>,
        private readonly httpService: HttpService
    ) {

    }

    async create(data): Promise<any> {
        const todo = new this.todoModel(data)
        return await todo.save()
    }

    async todoList(): Promise<any> {
        this.logger.debug('Project list')
        return 'Project list'
    }

    async findAll(): Promise<ITodoInterface[]> {
        const response = await this.httpService.get('http://jsonplaceholder.typicode.com/todos').toPromise();
        return response.data
    }
}
