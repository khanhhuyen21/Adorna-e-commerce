import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Users } from '../user/entity/user.entity';
import { TokenInterface } from 'src/types/token.type';
import { CreateUserDTO } from '../user/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async register(@Body() body: CreateUserDTO) {
    const user = await this.authService.register(body);
    return user;
  }
  @Post('/login')
  async login(@Body() body: LoginDTO): Promise<TokenInterface> {
    const result = await this.authService.login(body);
    return result;
  }

  //frontend sẽ gọi khi người dùng click
  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  // Google sẽ gọi lại sau khi người dùng đã xác thực thành công
  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    console.log(111116666, req.user);

    req.headers['Authorization'] = `Bearer ${req.user.tokenUser}`;
    return res.redirect(
      `http://localhost:3000/auth/google/${req.user.tokenUser}/${JSON.stringify(
        req.user.user[0].id,
      )}/${JSON.stringify(req.user.user[0].status)}/${JSON.stringify(
        req.user.user[0].fullName,
      )}`,
    );
  }
}
