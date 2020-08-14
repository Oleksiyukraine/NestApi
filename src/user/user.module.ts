//Nest imports
import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
//Services
import { UserService } from './user.service';
//Controller
import { UserController } from './user.controller';
//Schemas
import { UserSchema } from "./schemas/user.schemas";

import { MailModule } from '../mail/mail.module';
import { TagsModule } from '../tags/tags.module';

@Module({
  imports: [
    MailModule,
    TagsModule,

    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
