import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { configModule } from './configure.root'

//Modules import
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    configModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI_LOCAL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
    ),
    TokenModule,
    MailModule,
  ]
})
export class AppModule {}
