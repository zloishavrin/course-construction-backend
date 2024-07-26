import { Token } from '@db/token.schema';
import { User } from '@db/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from "bcrypt";
import uuid from 'uuid';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel(Token.name) private TokenModel: Model<Token>
    ) {}

    async registration(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await this.UserModel.create({
            email,
            password: hashedPassword,
            activationLink
        })

        return user;
    }

}
