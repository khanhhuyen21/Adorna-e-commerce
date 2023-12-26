import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../user/entity/user.entity';
import { Roles } from '../role/entity/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'src/configs/googleStrategy.config';
import { UserRepository } from '../user/user.repository';
import { Address } from '../address/entity/address.entity';
import { UserModule } from '../user/user.module';
import { ResetEmail } from '../reset-password/entity/resetPassword.entity';
import { VerifyEmail } from '../verify-email/entity/verifyEmail.entity';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Users, Roles, Address, VerifyEmail, ResetEmail]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN,
    }),
    PassportModule.register({ defaultStrategy: 'google' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    UserRepository,
    GoogleStrategy,
    MailService,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
