//Nest imports
import {Body, CacheInterceptor, Controller, Get, Post, Query, UseInterceptors, ValidationPipe} from '@nestjs/common';
//Services
import { TodoService } from './todo.service';
//Interfaces
import { ITodoInterface } from './interfaces/todo.interface';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('todos')
@Controller('todo')
@UseInterceptors(CacheInterceptor)
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Post('/create')
    async create(@Body() data): Promise<any> {
        return await this.todoService.create(data)
    }

    @Get('/list')
    async findAll(): Promise<ITodoInterface[]> {
        return await this.todoService.findAll();
    }
}
