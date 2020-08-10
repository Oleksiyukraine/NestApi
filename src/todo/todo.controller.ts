//Nest imports
import {Controller, Get, Query, ValidationPipe} from '@nestjs/common';
//Services
import { TodoService } from './todo.service';
//Interfaces
import { ITodoInterface } from './interfaces/todo.interface';
import {ApiTags} from "@nestjs/swagger";
import {ConfirmAccountDto} from "../auth/dto/confirm-account.dto";

@ApiTags('todos')
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get('/list')
    async findAll(): Promise<ITodoInterface[]> {
        return await this.todoService.findAll();
    }
}
