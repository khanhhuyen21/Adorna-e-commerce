import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/auth.dto';
import { AuthRepository } from './auth.repository';
import { TokenInterface } from 'src/types/token.type';
import { config } from 'dotenv';
import { UserRepository } from '../user/user.repository';
import { MailService } from '../mail/mail.service';

config();
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private mailService: MailService
  ) {}

  async register(body) {
    const { fullName, password, repeatpassword, email, role } = body;
    const roleUser = await this.authRepository.getRole();
    const roleIdd = roleUser.id;
    const roleRegister = role ? role : roleIdd;
    const user = await this.authRepository.getUser(email);
    if (user) {
      return { msg: ' User already exist', type: 'email' };
    }
    if (password == repeatpassword) {
      const salt = 10;
      const genSalt = await bcrypt.genSalt(salt);
      const newPassword = await bcrypt.hash(password, genSalt);
      const newUser = await this.authRepository.register({
        fullName,
        newPassword,
        email,
        roleRegister,
      });
      const link = await this.mailService.sendEmailConfirm(newUser)
      return { newUser,link, status: 200 };
    } else {
      return {
        msg: 'Repeatpassword is not matching password',
        type: 'password',
      };
    }
  }
  async login(body: LoginDTO): Promise<TokenInterface> {
    // Lấy email và password từ đối tượng body truyền vào
    const { email, password } = body;
    // Kiểm tra xem người dùng có tồn tại trong authRepository hay không
    const checkUser = await this.authRepository.login(email);
    // Nếu người dùng không tồn tại, throw một HttpException với mã lỗi UNAUTHORIZED (401)
    if (!checkUser) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }
    // So sánh mật khẩu đã cung cấp với mật khẩu trong cơ sở dữ liệu
    const passwordMatch = await bcrypt.compare(password, checkUser.password);
    // Nếu mật khẩu không khớp, throw một HttpException với mã lỗi UNAUTHORIZED (401)
    if (!passwordMatch) {
      throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
    }
    // Nếu mọi thứ đều hợp lệ, lấy thông tin của người dùng để tạo JWT token
    const { password: userPassword, ...dataUser } = checkUser;
    // Mã hóa thông tin
    const jwtData = this.jwtService.sign(dataUser);
    return {
      message: 'Login successfully',
      accessToken: jwtData,
      data: dataUser,
      status: 200,
    };
  }
  async validateUser(details) {
    let user = await this.userRepository.getUserWithRole(details.email);
    let tokenUser = await this.jwtService.sign({
      email: user?.[0]?.email,
      roleId: user?.[0]?.role?.id,
    });
    if (user?.length > 0) {
      return { user, tokenUser };
    } else {
      console.log('User not found. Creating...');
      const newUser = await this.userRepository.createUserWithLoginGoogle({
        email: details.email,
        password: Math.floor(Math.random() * 1000000),
        fullName: details.fullName,
        status: 1,
        role: 1,
        roleId: 1,
        avatar: details.picture,
      });
      console.log(newUser, 88);
      user = await this.userRepository.getUserWithRole(newUser.email);
      tokenUser = await this.jwtService.sign({
        email: user?.[0]?.email,
        roleId: user?.[0]?.role?.id,
      });
      return { user, tokenUser };
    }
  }
  async findUser(id: number) {
    const user = await this.userRepository.getUserWithId(id);
    return user;
  }
}
