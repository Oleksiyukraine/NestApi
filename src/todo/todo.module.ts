import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoService } from './todo.service';

import { TodoController } from './todo.controller';

import { TodoSchema } from './schemas/todo.schema';

@Module({
  providers: [TodoService],
  controllers: [TodoController],
  imports: [
    MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
    HttpModule,
    CacheModule.register()
  ]
})
export class TodoModule {}
