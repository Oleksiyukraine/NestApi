import { HttpModule, Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  providers: [TodoService],
  controllers: [TodoController],
  imports: [
    HttpModule
  ]
})
export class TodoModule {}
