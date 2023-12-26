import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './order.repository';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user/user.repository';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepo: OrdersRepository,
    private readonly mailService: MailService,
    private readonly userRepo: UserRepository,
    private readonly productRepo: ProductRepository,
  ) {}
  private generateUniqueCodeOrder(orderDate: Date): string {
    const formattedDate = orderDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '');
    const randomNumber = Math.floor(Math.random() * 10000);
    return `${formattedDate}_${randomNumber}`;
  }
  async getAllOrders(page) {
    if (page.page) {
      let pagee = parseInt(page.page);
      const pageSize = 12;
      const totalOrder = await this.orderRepo.totalOrder();
      const totalPage = Math.ceil(totalOrder / pageSize);
      const skip = (pagee - 1) * pageSize;
      if (pagee < 0) {
        pagee = 1;
      }
      return await this.orderRepo.getOrderWithLimit(skip, pageSize, totalPage);
    }
    return await this.orderRepo.getAllOrders();
  }

  async getOrderByUserId(userId) {
    return await this.orderRepo.getOrderByUserId(userId);
  }

  async createOrder(userId, body) {
    console.log(1111111111, userId);

    const orderDate = new Date();
    const codeOrder = this.generateUniqueCodeOrder(orderDate);
    const addressUserId = await this.orderRepo.findAdressUserId(userId);

    if (addressUserId?.length == 0) {
      throw new Error('add an address before creating order');
    }

    const cartUserId = await this.orderRepo.findCartUserId(userId);

    if (cartUserId?.length == 0) {
      throw new Error('add product before creating order');
    }

    const productInCart = await this.orderRepo.productInCart(userId);
    const totalAmount = productInCart
      .map((item) => item.quantity * item.price) // Tính giá tiền cho mỗi sản phẩm
      .reduce((acc, curr) => acc + curr, 0);

    // Điều kiện check xem đơn hàng đã có chưua
    let hasCreatedNewOrder = false;
    let orderId;
    let order;
    for (const cartProduct of productInCart) {
      const product = await this.productRepo.getProductDetaill(cartProduct);
      console.log('product', product);
      if (product?.length == 0) {
        console.log(cartProduct.name, 'ahihi đồ ngốc');
        throw new Error('Product sold out');
      }
      const updatedQuantityStock =
        Number(product?.[0]?.stock) - Number(cartProduct.quantity);
      let updateBestseller = 0;
      updateBestseller += Number(cartProduct.quantity);
      //Tạo đơn hàng nếu chưa có
      if (hasCreatedNewOrder === false) {
        const newOrder = await this.orderRepo.createNewOrder(
          codeOrder,
          totalAmount,
          userId,
          addressUserId?.[0].id,
        );
        order = newOrder;
        hasCreatedNewOrder = true;
        orderId = newOrder.id; // Gán orderId ở đây, không cần return
      }

      // Cập nhật số lượng tồn kho trong bảng products
      await this.orderRepo.updateProduct(
        cartProduct?.productId,
        updatedQuantityStock,
        updateBestseller,
      );

      //  Tạo orderItem
      await this.orderRepo.createOrderItem(
        cartProduct?.quantity,
        cartProduct?.name,
        cartProduct?.price,
        cartProduct?.productId,
        cartProduct?.thumbnailUrl,
        orderId,
      );
    }
    const user = await this.userRepo.getUserInfor(userId);
    await this.orderRepo.deleteCart(userId);

    console.log(3333, user);

    const link = await this.mailService.sendOrderConfirm(user, order);
    return { msg: 'Created order' };
  }

  //cập nhật status cho order có 5 trạng thái:
  // 1:  Pending,
  // 2: Processing,
  // 3: Shipping,
  // 4: Completed,
  // 5: Cancelled

  async changeStatus(param, body) {
    const order = await this.orderRepo.getorder(param.id);
    if (!order) {
      return { msg: 'order not found' };
    }
    // Kiểm tra nếu đơn hàng đã hoàn thành, không cho phép thay đổi trạng thái
    if (order.status === 'Completed') {
      return { msg: 'Cannot change status of completed order' };
    }
    // Validator cho trường status: nếu không phải trạng thái hợp lệ thì từ chối thay đổi
    const validStatusValues = [
      'Pending',
      'Processing',
      'Shipping',
      'Completed',
      'Cancelled',
    ];
    if (!validStatusValues.includes(body.status)) {
      return { msg: 'Invalid status value' };
    }
    return await this.orderRepo.changeStatus(param.id, body.status);
  }

  async cancelOrder(id) {
    const order = await this.orderRepo.getOrder(id.id);
    const orderItem = await this.orderRepo.getOrderItems(order.id);
    for (const orderItemInOrder of orderItem) {
      const product = await this.orderRepo.getProduct(
        orderItemInOrder?.productId,
      );
      if (product) {
        product.stock += orderItemInOrder.quantity;
        product.bestseller -= orderItemInOrder.quantity;
        await this.orderRepo.quantityUpdateProduct(
          product,
          orderItemInOrder?.productId,
        );
      }
    }
    if (!order) {
      return { msg: 'Order not found' };
    }
    return await this.orderRepo.cancelOrder(id.id);
  }

  async getOrderDetails(id) {
    const order = await this.orderRepo.getorder(id.id);
    if (!order) {
      return { msg: 'order not found' };
    }
    return await this.orderRepo.getOrderDetails(id);
  }

  async getOrderById(id) {
    return await this.orderRepo.getOrderById(id.id);
  }

  async getOrderWithOrderDate() {
    return await this.orderRepo.getOrderWithOrderDate();
  }
}
