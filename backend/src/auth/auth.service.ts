import { User } from '@db/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from "bcryptjs";
import * as uuid from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        private JwtService: JwtService
    ) {}

    async registration(email: string, password: string): Promise<{
        token: string,
        activationLink: string
    }> {
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
            token,
            activationLink
        };
    }

    async activateAccount(activationLink: string) {
        const user = await this.UserModel.findOne({ activationLink });
        if(!user) {
            throw new BadRequestException(['Неверная ссылка активации']);
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email: string, password: string): Promise<string> {
        const user = await this.UserModel.findOne({ email });
        if(!user) {
            throw new BadRequestException(['Пользователь с таким Email не найден']);
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if(!isPasswordEqual) {
            throw new BadRequestException(['Неверный пароль']);
        }

        if(!user.isActivated) {
            throw new BadRequestException(['Аккаунт не активирован']);
        }

        const payload = {
            email: user.email,
            sub: user._id
        }
        const token = this.JwtService.sign(payload);
        
        return token;
    }

}
