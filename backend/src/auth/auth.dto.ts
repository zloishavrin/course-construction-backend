import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class RegistrationRequestDto {
    @ApiProperty({
        example: "user@google.com",
        description: 'Электронная почта пользователя'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "Password",
        description: 'Пароль пользователя (от 6 символов)'
    })
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

export class RegistrationResponseDto {
    @ApiProperty({
        example: "token",
        description: "JWT-Токен"
    })
    token: string;
}