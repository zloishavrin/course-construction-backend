import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationRequestDto, RegistrationResponseDto } from './auth.dto';
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
        status: 201,
        description: 'Успешная регистрация пользователя',
        type: RegistrationResponseDto
    })
    @UsePipes(new ValidationPipe())
    async registration(
        @Body() body: RegistrationRequestDto
    ): Promise<RegistrationResponseDto> {
        const token = await this.AuthService.registration(body.email, body.password);
        return token;
    }

}
