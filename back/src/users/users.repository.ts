import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/DTOs/UserDTO';

@Injectable()
export class UsersRepository {
  private users: UserDTO[] = [
    {
      id: 1,
      email: 'johndoe@mail.com',
      name: 'John Doe',
      password: '12345678',
      address: 'Calle Falsa 123',
      phone: '+54 11 4587 2365',
      country: 'Argentina',
      city: 'Buenos Aires',
    },
    {
      id: 2,
      email: 'jeanedoe@mail.com',
      name: 'Jane Doe',
      password: '12345679',
      address: 'Calle Falsa 123',
      phone: '+54 11 4587 1234',
      country: 'Argentina',
      city: 'Buenos Aires',
    },
    {
      id: 3,
      email: 'alice@mail.com',
      name: 'Alice Springs',
      password: '12345680',
      address: 'Calle Falsa 321',
      phone: '+54 3548 57 2365',
      country: 'Argentina',
      city: 'Córdoba',
    },
  ];

  async findById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  async getUsers() {
    return this.users;
  }
}
// Path: src/users/users.repository.ts
