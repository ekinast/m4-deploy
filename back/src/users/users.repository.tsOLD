import { Injectable } from '@nestjs/common';
import { UserDTO_Id } from 'src/DTOs/UserDTO_Id';

@Injectable()
export class UsersRepository {
  private users: UserDTO_Id[] = [
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
    {
      id: 4,
      email: 'eddy@mail.com',
      name: 'Edmundo Kinast',
      password: 'admin1234',
      address: 'B. Jaime 61',
      phone: '+54 3548 57 2365',
      country: 'Argentina',
      city: 'La Cumbre',
    },
  ];

  async findById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  async getUsers(page: number = 1, limit: number = 5): Promise<UserDTO_Id[]> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return this.users.slice(startIndex, endIndex);
  }

  private id = 4;

  async createUser(user: UserDTO_Id) {
    const newUser: UserDTO_Id = { id: this.id, ...user };
    this.users.push(newUser);
    newUser.id = ++this.id;
    return newUser.id;
  }

  async updateUser(id: number, user: UserDTO_Id) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = user;
    return user.id;
  }

  async deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    const user = this.users[index];
    this.users.splice(index, 1);
    return user.id;
  }

  signIn(body: any) {
    const { email, password } = body;

    console.log('Email:', email);
    console.log('Password:', password);

    if (!email || !password) {
      return 'Email o password faltante';
    }

    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return 'Email o password incorrectos';
    }

    if (user.password !== password) {
      return 'Email o password incorrectos';
    }

    return user;
  }
}
// Path: src/users/users.repository.ts
