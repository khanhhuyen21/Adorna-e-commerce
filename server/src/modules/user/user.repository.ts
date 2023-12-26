import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { Users } from './entity/user.entity';
import { Roles } from '../role/entity/role.entity';
import { Address } from '../address/entity/address.entity';
import { VerifyEmail } from '../verify-email/entity/verifyEmail.entity';
import { ResetEmail } from '../reset-password/entity/resetPassword.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Roles) private roleRepository: Repository<Roles>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    @InjectRepository(VerifyEmail)
    private verifyEmailRepository: Repository<VerifyEmail>,
    @InjectRepository(ResetEmail)
    private resetemailRepository: Repository<ResetEmail>,
  ) {}

  async getRole() {
    return this.roleRepository.findOne({ where: { role: 1 } });
  }

  async getUser(email) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }

  async getUserWithRole(email) {
    const user = await this.userRepository.find({
      relations: ['role'], // Khi truy vấn, lấy thông tin của cả bảng User và bảng Group thông qua quan hệ @ManyToOne
      where: { email: email },
    });
    return user;
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async getUserWithId(id) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async changeStatusUser(user) {
    return await this.userRepository.save(user);
  }

  async getUserInfor(id) {
    return await this.userRepository.findOne({
      relations: ['address'], // Khi truy vấn, lấy thông tin của cả bảng User và bảng Group thông qua quan hệ @ManyToOne
      where: { id },
    });
  }

  async createAddress(address: {
    name: any;
    phone: any;
    address: any;
    user: any;
    province: any;
    district: any;
    ward: any;
  }) {
    return await this.addressRepository.save(address);
  }

  async changeAddress(idUser, idAddress, body) {
    return await this.addressRepository.update(idAddress, {
      name: body.name,
      address: body.address,
      province: body.province,
      district: body.district,
      ward: body.ward,
      phone: body.phone,
      userId: idUser,
    });
  }

  async getTokenDatabase(id) {
    return await this.verifyEmailRepository.findOne({ where: { id: id } });
  }

  async verifyEmail(user) {
    return await this.userRepository.save(user);
  }

  async sendForgotpassword(user, randomString) {
    const result = await this.resetemailRepository.save({
      userId: user.id,
      code: randomString,
    });
    return result;
  }

  // async sendResetpassword(codeRessetDatabase, newPassword) {
  //   const id = codeRessetDatabase.userId;
  //   const result = await this.userRepository.update(id, {
  //     password: newPassword,
  //   });
  //   const deletee = await this.resetemailRepository.delete({ userId: id });
  //   return result;
  // }

  // async getCodeReset(code) {
  //   return await this.resetemailRepository.findOne({ where: { code: code } });
  // }

  async createUserWithLoginGoogle(details) {
    const length = 10;
    const randomBytes = crypto.randomBytes(length);
    const randomString = randomBytes.toString('hex');
    const id = Math.floor(Math.random() * 1000000);
    return await this.userRepository.save({
      id: id,
      roleId: 1,
      email: details.email,
      status: 1,
      fullName: details.fullName,
      password: randomString,
    });
  }

  async getUsersWWithLimit(skip, pageSize) {
    return await this.userRepository.find({ skip: skip, take: pageSize });
  }

  async totalUsers() {
    return this.userRepository.count();
  }

  async getUsersWithLimit(skip, pageSize, totalPage) {
    const result = await this.userRepository.find({
      skip: skip,
      take: pageSize,
    });
    return { result, totalPage };
  }
}
