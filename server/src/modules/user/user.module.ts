import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { UserRepository } from './user.repository';
import { EmailService } from 'src/utils/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/user.entity';
import { Roles } from '../role/entity/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { Address } from '../address/entity/address.entity';
import { RolesGuard } from 'src/guards/role.guard';
import { VerifyEmail } from '../verify-email/entity/verifyEmail.entity';
import { ResetEmail } from './../reset-password/entity/resetPassword.entity';
import { MailService } from '../mail/mail.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Roles, Address, VerifyEmail, ResetEmail]),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    EmailService,
    RolesGuard,
    MailService,
  ],
})
export class UserModule {}
