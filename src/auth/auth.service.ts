//Nest imports
import {BadRequestException, Injectable, MethodNotAllowedException, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
//Other imports
import { SignOptions } from 'jsonwebtoken';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
//Services
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
//Dto`s
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateUserTokenDto } from '../token/dto/create-user-token.dto';
import { SignInDto } from './dto/signin.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
//Enums
import { roleEnum } from '../user/enums/role.enum';
import { statusEnum } from '../user/enums/status.enum';
import { userSensitiveFieldsEnum } from '../user/enums/protected-fields.enum';
//Interfaces
import { IUser } from '../user/interfaces/user.interface';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { IReadableUser } from '../user/interfaces/readable-user.interface';
import {ForgotPasswordDto} from "./dto/forgot-password.dto";


@Injectable()
export class AuthService {
    private readonly clientAppUrl: string;

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,

        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly mailService: MailService,
    ) {
        this.clientAppUrl = this.configService.get<string>('FE_APP_URL');
    }

    async signUp(createUserDto: CreateUserDto): Promise<boolean> {
        const user = await this.userService.create(createUserDto, [roleEnum.user]);
        await this.sendConfirmation(user);
        return true;
    }

    async signIn({ email, password }: SignInDto): Promise<IReadableUser> {
        const user = await this.userService.findByEmail(email);

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await this.signUser(user);
            const readableUser = user.toObject() as IReadableUser;
            readableUser.accessToken = token;

            return _.omit<any>(readableUser, Object.values(userSensitiveFieldsEnum)) as IReadableUser;
        }
        throw new BadRequestException('Invalid credentials');
    }

    async signUser(user: IUser, withStatusCheck: boolean = true): Promise<string> {
        if (withStatusCheck && (user.status !== statusEnum.active)) {
            throw new MethodNotAllowedException();
        }
        const tokenPayload: ITokenPayload = {
            _id: user._id,
            status: user.status,
            roles: user.roles,
        };
        const token = await this.generateToken(tokenPayload);
        const expireAt = moment()
            .add(1, 'day')
            .toISOString();

        await this.saveToken({
            token,
            expireAt,
            uId: user._id,
        });

        return token;
    }

    async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<boolean> {
        const password = await this.userService.hashPassword(changePasswordDto.password);

        await this.userService.update(userId, { password });
        await this.tokenService.deleteAll(userId);
        return true;
    }

    async confirm(token: string): Promise<IUser> {
        const data = await this.verifyToken(token);
        const user = await this.userService.find(data._id);

        await this.tokenService.delete(data._id, token);

        if (user && user.status === statusEnum.pending) {
            user.status = statusEnum.active;
            return user.save();
        }
        throw new BadRequestException('Confirmation error');
    }

    async sendConfirmation(user: IUser) {
        const token = await this.signUser(user, false);
        const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;

        await this.mailService.send({
            from: this.configService.get<string>('JS_CODE_MAIL'),
            to: user.email,
            subject: 'Verify User',
            html: `
                <h3>Hello ${user.firstName}!</h3>
                <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
            `,
        });
    }

    private async generateToken(data: ITokenPayload, options?: SignOptions): Promise<string> {
        return this.jwtService.sign(data, options);
    }

    private async verifyToken(token): Promise<any> {
        try {
            const data = this.jwtService.verify(token) as ITokenPayload;
            const tokenExists = await this.tokenService.exists(data._id, token);

            if (tokenExists) {
                return data;
            }
            throw new UnauthorizedException();
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    private async saveToken(createUserTokenDto: CreateUserTokenDto) {
        return await this.tokenService.create(createUserTokenDto);
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        const user = await this.userService.findByEmail(forgotPasswordDto.email);
        if (!user) {
            throw new BadRequestException('Invalid email');
        }
        const token = await this.signUser(user);
        const forgotLink = `${this.clientAppUrl}/auth/forgotPassword?token=${token}`;

        await this.mailService.send({
            from: this.configService.get<string>('JS_CODE_MAIL'),
            to: user.email,
            subject: 'Forgot Password',
            html: `
                <h3>Hello ${user.firstName}!</h3>
                <p>Please use this <a href="${forgotLink}">link</a> to reset your password.</p>
            `,
        });
    }
}
