import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendOrderConfirm(user, order) {
    console.log(user);

    await this.mailerService.sendMail({
      to: user?.email,
      from: 'Adorna Jewelry',
      subject: 'Order confirmation',
      template: './orderConfirm',
      context: {
        customerName: user?.fullName,
        codeOrder: order?.codeOrder,
        orderDate: order.orderDate,
        totalOrderValue: order.totalAmount,
        recipientName: user?.address?.[0]?.name,
        address: user?.address?.[0]?.address,
        contactPhoneNumber: user?.address?.[0]?.phone,
      },
    });
  }

  async sendEmailConfirm(verify) {
    const token = verify.verifyEmail.token;
    const userId = verify.user.id;
    const url = `http://localhost:4000/api/v1/users/verify?id=${verify.verifyEmail.id}&token=${token}&userId=${userId}`;
    await this.mailerService.sendMail({
      to: verify.user.email,
      from: 'Adorna Jewelry',
      subject: 'Welcome to Adorna Jewelry! Confirm your Email',
      template: './confirm',
      context: {
        name: verify.user.fullName,
        url,
      },
    });
  }

  async sendResetPassword(user, resetpassword) {
    const code = resetpassword.code;
    await this.mailerService.sendMail({
      to: user.email,
      from: 'Adorna Jewelry',
      subject: 'Welcome to Adorna Jewelry! Reset Password your Email',
      template: './resetPassword',
      context: {
        name: user.fullName,
        code,
      },
    });
  }
}
