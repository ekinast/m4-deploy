import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
//import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guards';
import { UsersDBService } from './usersDB.service';
import { User } from './entities/users.entity';
import { CreateUserDTO } from 'src/users/dto/CreateUser.dto';

@Controller('users')
export class UsersController {
  constructor(
    //private readonly usersService: UsersService,
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
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
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
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.usersDBService.saveUser(createUserDTO);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    return this.usersDBService.updateUser(id, createUserDTO);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersDBService.deleteUser(id);
  }
}
