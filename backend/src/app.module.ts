import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_ROOT_USER}:${process.env.MONGO_ROOT_PASSWORD}@mongo:27017/courseconstruction?authSource=admin`),
    AuthModule,
    MailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
