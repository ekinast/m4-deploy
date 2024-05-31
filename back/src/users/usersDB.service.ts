import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import VerifyPhoneService from './VerifyPhone.service';

@Injectable()
export class UsersDBService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
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
      // Transforma las órdenes para enviar solo id y fecha
      // const orders = user.orders.map((order) => ({
      //   id: order.id,
      //   date: order.createdAt,
      // }));

      return {
        ...user,
        //orders: orders,
      };
    } else {
      // Maneja el caso de que no se encuentre el usuario
      return null;
    }
  }
  async saveUser(user: User) {
    // Verificar si el número de teléfono es válido
    const phoneValidation = VerifyPhoneService(user);
    if (phoneValidation.error) {
      throw new BadRequestException(phoneValidation.error);
    }
    return this.usersRepository.save(user);
  }

  async updateUser(id: string, updatedUserData: Partial<User>) {
    const oldUser = await this.usersRepository.findOneBy({ id: id });

    if (!oldUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const phoneValidation = VerifyPhoneService(updatedUserData as User);
    if (phoneValidation.error) {
      throw new BadRequestException(phoneValidation.error);
    }

    // Merge de datos: copiar las propiedades actualizadas al usuario existente
    Object.assign(oldUser, updatedUserData);

    const updatedUser = await this.usersRepository.save(oldUser);

    // Retornar el usuario actualizado
    return updatedUser;
  }

  async deleteUser(id: string) {
    const oldUser = await this.usersRepository.findOneBy({ id: id });

    if (!oldUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const id_user = oldUser.id;
    await this.usersRepository.delete(id_user);
    return 'Usuario eliminado correctamente';
  }
}
