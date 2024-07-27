import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {

    constructor(
        private AuthService: AuthService
    ) {}

    @Post('registration')
    @ApiOperation({ summary: "Регистрация пользователя" })
    @ApiResponse({
        status: 200,
        description: 'Успешная регистрация пользователя',
        type: RegistrationDto
    })
    @UsePipes(new ValidationPipe())
    async registration(
        @Body() RegistrationDto: RegistrationDto
    ): Promise<{ token: string }> {
        const token = await this.AuthService.registration(RegistrationDto.email, RegistrationDto.password);
        return token;
    }

}
