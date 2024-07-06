import { RolesGuard } from './../auth/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
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
import { CreateUserDto } from '../users/dto/CreateUser.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersDBService: UsersDBService) {
    console.log('UsersController instantiated');
  }
  @Get()
  @ApiOperation({ summary: 'Ver todos los usuarios' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    example: 5,
  })
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const allUsers: User[] = await this.usersDBService.getUsers(page, limit);
    return allUsers;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ver un usuario por :id' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
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

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por :id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersDBService.updateUser(id, createUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por :id' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersDBService.deleteUser(id);
  }
}
