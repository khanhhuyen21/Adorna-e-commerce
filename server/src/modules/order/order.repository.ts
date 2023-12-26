import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { Address } from '../address/entity/address.entity';
import { Cart } from '../cart/entity/cart.entity';
import { Products } from '../product/entity/product.entity';
import { OrderItem } from '../orderItem/entity/orderItem.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Address) private dddressRepository: Repository<Address>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async getAllOrders() {
    return this.orderRepository.find();
  }

  async getProductBestsellers(id) {
    return await this.productsRepository.find({
      relations: ['image', 'category'],
      where: { id: id },
    });
  }

  async getOrderByUserId(userId) {
    return this.orderRepository.find({
      where: { userId: userId.userId },
      order: { id: 'DESC' },
    });
  }

  async productInCart(userId) {
    const result = await this.cartRepository.find({
      where: { userId },
    });

    return result;
  }

  async createNewOrder(codeOrder, totalAmount, userId, addressUserId) {
    return await this.orderRepository.save({
      codeOrder: codeOrder,
      userId: userId,
      totalAmount: totalAmount,
      addressId: addressUserId,
      shippingFee: 25000,
      orderDate: new Date(),
    });
  }

  async updateProduct(productId, updatedQuantityStock, updateBestseller) {
    await this.productsRepository.update(productId, {
      stock: updatedQuantityStock,
      bestseller: updateBestseller,
    });
  }

  async findAdressUserId(userId) {
    return await this.dddressRepository.findBy({ userId });
  }

  async findCartUserId(userId) {
    return await this.cartRepository.findBy({ userId });
  }

  async createOrderItem(quantityy, name, price, id, image, orderId) {
    const result = await this.orderItemRepository.save({
      quantity: quantityy,
      productName: name,
      price: price,
      orderId: orderId,
      productId: id,
      thumnail: image,
    });
  }

  async deleteCart(userId) {
    return await this.cartRepository.delete({ userId });
  }

  async getorder(param) {
    return await this.orderRepository.findOne({ where: { id: param } });
  }

  async changeStatus(param, body) {
    return await this.orderRepository.update(param, { status: body });
  }

  async cancelOrder(id) {
    return await this.orderRepository.update(id, { status: 'Cancelled' });
  }

  async getOrderDetails(id) {
    const orderDetails = await this.orderItemRepository.find({
      where: { orderId: id.id },
    });
    return orderDetails;
  }

  async getOrderItems(id) {
    const orderDetails = await this.orderItemRepository.find({
      where: { orderId: id },
    });
    return orderDetails;
  }

  async totalOrder() {
    return this.orderRepository.count();
  }

  async getOrderWithLimit(skip, pageSize, totalPage) {
    const result = await this.orderRepository.find({
      skip: skip,
      take: pageSize,
    });
    return { result, totalPage };
  }

  async getOrderById(id) {
    return this.orderRepository.findOne({ where: { id: id } });
  }

  async getOrderWithOrderDate() {
    return this.orderRepository
      .createQueryBuilder('orders')
      .orderBy('orders.orderDate', 'DESC')
      .getMany();
  }

  async getOrder(id) {
    return this.orderRepository.findOne({ where: { id: id } });
  }

  async quantityUpdateProduct(product, id) {
    return this.productsRepository.update(id, product);
  }

  async getProduct(id) {
    return this.productsRepository.findOne({ where: { id: id } });
  }
}
