import { CacheModule, Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { configModule } from './configure.root'
import { MyScheduleModule } from './schedule/schedule.module';

//Modules import
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';
import { TodoModule } from './todo/todo.module';
import { UploadModule } from './upload/upload.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    configModule,
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(
      process.env.MONGODB_URI_LOCAL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
    ),
    CacheModule.register(),
    UserModule,
    AuthModule,
    TokenModule,
    MailModule,
    TodoModule,
    MyScheduleModule,
    UploadModule,
    TagsModule
  ]
})
export class AppModule {}
