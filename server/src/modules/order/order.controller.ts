import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDTO, UpdateOrderStatusDTO } from './dto/order.dto';

@Controller('api/v1/orders')
export class OrdersController {
  constructor(private readonly appService: OrdersService) {}

  @Get()
  async getAllOrders(@Query() page) {
    const result = await this.appService.getAllOrders(page);
    return result;
  }

  @Get('/orderdate/order/orderwwithdate/1')
  getOrderWithOrderDate() {
    return this.appService.getOrderWithOrderDate();
  }

  @Get('/orderId/orderdetail/:id')
  getOrderById(@Param() id) {
    return this.appService.getOrderById(id);
  }

  @Get('/:userId')
  getOrderByUserId(@Param() userId) {
    return this.appService.getOrderByUserId(userId);
  }

  @Post('/:userId')
  createOrder(@Param() param, @Body() body) {
    return this.appService.createOrder(param.userId, body);
  }

  @Put('/statusOrder/:id')
  changeOrderStatus(@Param() param, @Body() body: UpdateOrderStatusDTO) {
    return this.appService.changeStatus(param, body);
  }

  @Put('/cancelorder/:id')
  cancelOrder(@Param() id) {
    return this.appService.cancelOrder(id);
  }

  @Get('/orderDetails/:id')
  getOrderDetails(@Param() id) {
    return this.appService.getOrderDetails(id);
  }
}
