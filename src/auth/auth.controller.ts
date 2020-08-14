//Nest imports
import { Controller, Post, Get, Patch, Body, Query, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
//Services
import { AuthService } from './auth.service';
//Dto`s
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { SignInDto } from './dto/signin.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
//Interfaces
import { IReadableUser } from 'src/user/interfaces/readable-user.interface';
import { IUser } from '../user/interfaces/user.interface';
//Decorators
import { GetUser } from "../components/decorators/get-user.decorator";
import {ChangePasswordDto} from "./dto/change-password.dto";


@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('/signUp')
    async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<boolean> {
        return this.authService.signUp(createUserDto);
    }

    @Get('/confirm')
    async confirm(@Query(new ValidationPipe()) query: ConfirmAccountDto){
        return await this.authService.confirm(query.token)
    }

    @Post('/signIn')
    async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUser> {
        return await this.authService.signIn(signInDto)
    }

    @Post('/forgotPassword')
    async forgotPassword(@Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        return this.authService.forgotPassword(forgotPasswordDto);
    }

    @Patch('/changePassword')
    @UseGuards(AuthGuard() )
    async changePassword(
        @GetUser() user: IUser,
        @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto
    ) {
        return this.authService.changePassword(user._id, changePasswordDto);
    }
}
