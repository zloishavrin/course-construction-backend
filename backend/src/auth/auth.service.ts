import { User } from '@db/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from "bcryptjs";
import * as uuid from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { RegistrationResponseDto } from './auth.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        private JwtService: JwtService
    ) {}

    async registration(email: string, password: string): Promise<RegistrationResponseDto> {
        const candidate = await this.UserModel.findOne({ email });
        if(candidate) {
            throw new BadRequestException(['Пользователь с таким Email уже существует']);
        };

        const hashedPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await this.UserModel.create({
            email,
            password: hashedPassword,
            activationLink
        });

        const payload = {
            email: user.email,
            sub: user._id
        };

        const token = this.JwtService.sign(payload);
        return {
            token
        };
    }

}
