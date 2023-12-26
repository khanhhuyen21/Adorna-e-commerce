import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../user/entity/user.entity';
import { Roles } from '../role/entity/role.entity';
import * as crypto from 'crypto';
import { VerifyEmail } from '../verify-email/entity/verifyEmail.entity';
@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(Users)
    private readonly user: Repository<Users>,
    @InjectRepository(Roles) private roleRepository: Repository<Roles>,
    @InjectRepository(VerifyEmail)
    private verifyEmailRepository: Repository<VerifyEmail>,
  ) {}

  async register(body) {
    const { fullName, newPassword, email, roleRegister } = body;
    const user = await this.user.save({
      roleId: roleRegister,
      fullName: fullName,
      password: newPassword,
      email: email,
    });
    const length = 10;
    const randomBytes = crypto.randomBytes(length);
    // Chuyển buffer thành chuỗi hex
    const randomString = randomBytes.toString('hex');
    const verifyEmail = await this.verifyEmailRepository.save({
      userId: user.id,
      token: randomString,
    });
    return { user, verifyEmail };
  }
  async login(email: string) {
    return await this.user.findOne({ where: { email } });
  }
  async getRole() {
    return this.roleRepository.findOne({ where: { role: 1 } });
  }
  async getUser(email) {
    const user = await this.user.findOne({ where: { email: email } });
    return user;
  }
}
