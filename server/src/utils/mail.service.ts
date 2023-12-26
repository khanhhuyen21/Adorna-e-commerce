import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { configNodemailer } from './../configs/nodemailer.config';

@Injectable()
export class EmailService {
  private transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER_NAME,
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: 'huyensan21@gmail.com',
      to,
      subject,
      html,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
