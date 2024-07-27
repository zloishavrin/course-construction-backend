import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class RegistrationDto {
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