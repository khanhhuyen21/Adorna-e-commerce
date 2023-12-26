import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { RolesGuard } from '../../guards/role.guard';
import { ChangeAddressDTO, CreateAddressDTO } from '../address/dto/address.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private appService: UsersService) {}

  // @UseGuards(AuthGuard, RolesGuard)
  @Get()
  getUsers(@Query() page) {
    return this.appService.getUsers(page);
  }

  @Put('/:id')
  @UseGuards(RolesGuard)
  changeStatusUser(@Param() id) {
    return this.appService.changeStatusUser(id);
  }

  @Get('/:id/address')
  getUserInfor(@Param() param) {
    return this.appService.getUserInfor(param.id);
  }

  @Post('/:id/address')
  createAddress(@Param() userId, @Body() body: CreateAddressDTO) {
    return this.appService.createAddress(userId, body);
  }

  @Put('/:idUser/address/:idAddress')
  changeAddress(
    @Param('idUser') idUser,
    @Param('idAddress') idAddress,
    @Body() body: ChangeAddressDTO,
  ) {
    return this.appService.changeAddress(idUser, idAddress, body);
  }

  @Get('/verify')
  verifyEmail(
    @Query('token') token: string,
    @Query('userId') userId,
    @Query('id') id,
  ) {
    const result = this.appService.verifyEmail(token, userId, id);
    return result;
  }

  @Post('/forgot-password')
  sendForgotpassword(@Body() body) {
    return this.appService.sendForgotpassword(body);
  }

  // @Get('resetpassword')
  // resetpassword() {
  //   return;
  // }

  // @Post('/resetpassword')
  // sendResetpassword(@Body() body) {
  //   return this.appService.sendResetpassword(body);
  // }
}
