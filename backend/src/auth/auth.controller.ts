import { Body, Controller, Get, Param, Post, Redirect, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginResponseDto } from './auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailerService } from 'src/mailer/mailer.service';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {

    constructor(
        private AuthService: AuthService,
        private readonly MailerService: MailerService
    ) {}

    @Post('registration')
    @ApiOperation({ summary: "Регистрация пользователя" })
    @ApiResponse({
        status: 201,
        description: 'Успешная регистрация пользователя',
        type: LoginResponseDto
    })
    @UsePipes(new ValidationPipe())
    async registration(
        @Body() body: LoginRequestDto
    ): Promise<LoginResponseDto> {
        const { token, activationLink } = await this.AuthService.registration(body.email, body.password);
        await this.MailerService.sendActivationMail(body.email, activationLink);
        return {
            token
        };
    }

    @Get('activation/:link')
    @ApiOperation({ summary: "Активация аккаунта" })
    @ApiResponse({
        status: 301,
        description: 'Успешная активация аккаунта и редирект на главную страницу',
    })
    @Redirect(process.env.API_URL)
    activation(@Param('link') link: string) {
        this.AuthService.activateAccount(link);
    }

    @Post('login')
    @ApiOperation({ summary: "Логин пользователя" })
    @ApiResponse({
        status: 200,
        description: 'Успешный логин пользователя',
        type: LoginResponseDto
    })
    @UsePipes(new ValidationPipe())
    async login(
        @Body() body: LoginRequestDto
    ): Promise<LoginResponseDto> {
        const token = await this.AuthService.login(body.email, body.password);
        return {
            token
        }
    }

}
