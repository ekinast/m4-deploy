import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guards';
import { UsersDBService } from './usersDB.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDBService: UsersDBService,
  ) {
    console.log('UsersController instantiated');
  }
  @Get()
  @UseGuards(AuthGuard)
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const allUsers: User[] = await this.usersDBService.getUsers(page, limit);
    return allUsers;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string) {
    console.log('id:', id);

    const user = await this.usersDBService.getUserById(id);
    if (!user) {
      return {
        error: 'No se encontró el usuario.',
      };
    }
    return user;
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() user: User) {
    return this.usersDBService.saveUser(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async updateUser(@Param('id') id: string, @Body() user: User) {
    console.log('id:', id);

    return this.usersDBService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async deleteUser(@Param('id') id: string) {
    return this.usersDBService.deleteUser(id);
  }
}
