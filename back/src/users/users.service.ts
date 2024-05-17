import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserDTO_Id } from '../DTOs/UserDTO_Id';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  getUsers(page, limit) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id: number) {
    return this.usersRepository.findById(id);
  }

  createUser(user: UserDTO_Id) {
    return this.usersRepository.createUser(user);
  }

  updateUser(id: number, user: UserDTO_Id) {
    return this.usersRepository.updateUser(id, user);
  }

  deleteUser(id: number) {
    return this.usersRepository.deleteUser(id);
  }
}
