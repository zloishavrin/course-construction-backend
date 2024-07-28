import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {

    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Активация аккаунта на Course Construction",
            text: '',
            html: 
            `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
                <div style="text-align: center; padding-bottom: 20px;">
                    <h1 style="color: #333;">Активация аккаунта</h1>
                </div>
                <div style="padding: 20px; text-align: center; background-color: #fff; border-radius: 10px;">
                    <p style="font-size: 18px; color: #555;">
                        Здравствуйте, <b>${to}</b>
                    </p>
                    <p style="font-size: 16px; color: #555;">
                        Для активации вашего аккаунта, пожалуйста, перейдите по следующей ссылке:
                    </p>
                    <a href="${process.env.API_URL}auth/activation/${link}" style="display: inline-block; margin: 20px 0; padding: 10px 20px; font-size: 18px; color: #fff; background-color: #FFC42C; text-decoration: none; border-radius: 5px;">
                        Активировать аккаунт
                    </a>
                    <p style="font-size: 14px; color: #888;">
                        Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.
                    </p>
                </div>
                <div style="text-align: center; padding-top: 20px;">
                    <p style="font-size: 14px; color: #bbb;">
                        © 2024 ${process.env.API_URL}. Все права защищены.
                    </p>
                </div>
            </div>
            `
        })
    }

}
