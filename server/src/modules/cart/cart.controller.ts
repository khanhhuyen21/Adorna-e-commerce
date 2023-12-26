import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './cart.service';
// import {  AuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('api/v1/carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get('/cartByUser/:idUser')
  getCartByUser(@Param() idUser) {
    return this.cartsService.getCartByUser(idUser);
  }

  @Post('/:idUser')
  createCarts(@Body() body, @Param() idUser) {
    console.log(11111, body, idUser);

    return this.cartsService.createCarts(body, idUser);
  }

  @Put('/:idCart')
  changeQuantity(@Param('idCart') idCart, @Body() body) {
    return this.cartsService.changeQuantity(idCart, body);
  }

  @Delete('/:idCart')
  deleteCart(@Param('idCart') idCart) {
    return this.cartsService.deleteCart(idCart);
  }
}
