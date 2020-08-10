//Nest imports
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

//Other imports
import { configModule } from '../configure.root';
import { JwtStrategy } from './jwt.strategy';
//Controllers
import { AuthController } from './auth.controller';
//Modules
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { TokenModule } from '../token/token.module';
//Services
import { AuthService } from './auth.service';

@Module({
  imports: [
      UserModule,
      TokenModule,
      configModule,
      PassportModule.register({
        defaultStrategy: 'jwt'
      }),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' }
      }),
      MailModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
