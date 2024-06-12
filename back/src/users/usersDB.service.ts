import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { DataSource, Repository } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { OrderDetail } from '../orders-detail/entities/orders-detail.entity';

@Injectable()
export class UsersDBService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private ordersDetailRepository: Repository<OrderDetail>,
    private dataSource: DataSource,
  ) {}

  async getUsers(page: number, limit: number) {
    const skippedItems = (page - 1) * limit;
    return this.usersRepository.find({
      skip: skippedItems,
      take: limit,
    });
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: [
        'orders',
        'orders.orderDetails',
        //'orders.orderDetails.products',
      ],
    });

    if (user) {
      return {
        ...user,
        //orders: orders,
      };
    } else {
      // Maneja el caso de que no se encuentre el usuario
      return null;
    }
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
  // async saveUser(createUserDTO: CreateUserDTO) {
  //   return this.usersRepository.save(createUserDTO);
  // }

  async updateUser(id: string, updatedUserData: Partial<User>) {
    const oldUser = await this.usersRepository.findOneBy({ id: id });

    if (!oldUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Merge de datos: copiar las propiedades actualizadas al usuario existente
    Object.assign(oldUser, updatedUserData);

    const updatedUser = await this.usersRepository.save(oldUser);

    // Retornar el usuario actualizado
    return updatedUser;
  }

  async deleteUser(id: string) {
    const oldUser = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!oldUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      try {
        if (oldUser.orders && oldUser.orders.length > 0) {
          for (const order of oldUser.orders) {
            const orderDetail = await this.ordersDetailRepository.findOne({
              where: { order },
              relations: ['products'],
            });

            if (orderDetail) {
              await transactionalEntityManager.remove(OrderDetail, orderDetail);
            }
          }
        }
        await transactionalEntityManager.remove(User, oldUser);
      } catch (error) {
        console.error('Error during transaction, rolling back...', error);
        throw error;
      }
    });

    return { success: `User with id: ${id} deleted successfully` };
  }
}
