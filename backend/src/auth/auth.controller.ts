import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private AuthService: AuthService
    ) {}

    @Post('registration')
    registration(
        @Body('email') email: string, 
        @Body('password') password: string
    ) {
        return this.AuthService.registration(email, password);
    }

}
