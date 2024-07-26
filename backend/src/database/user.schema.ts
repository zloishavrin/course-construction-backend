import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: false })
    isActivated: boolean;

    @Prop({ required: true })
    activationLink: string;
}

export const UserSchema = SchemaFactory.createForClass(User);