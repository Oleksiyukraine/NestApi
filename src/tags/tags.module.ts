import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import { TagsController } from './tags.controller';

import { TagsService } from './tags.service';

import { TagsSchema } from "./schemas/tags.schemas";
import {TokenSchema} from "../token/schemas/user-token.schema";


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tags', schema: TagsSchema }]),
    MongooseModule.forFeature([{ name: 'Token', schema: TokenSchema }])
  ],
  providers:[TagsService],
  controllers: [TagsController],
  exports: [TagsService]
})

export class TagsModule {}
