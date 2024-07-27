import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '@db/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    JwtModule.register({
      secret: "example secret",
      signOptions: {
        expiresIn: 60*60*24*30
      }
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
