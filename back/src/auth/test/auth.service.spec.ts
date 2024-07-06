import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { CreateUserDto } from '../../users/dto/CreateUser.dto';
import { User } from '../../users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

describe('AuthService', () => {
  let authService: AuthService;
  let mockAuthService: Partial<AuthService>;

  const mockUser: Partial<CreateUserDto> = {
    name: 'Test User',
    email: 'test@mail.com',
    password: 'password',
    phone: 1234567,
    country: 'Test Country',
    address: 'Test Address',
    city: 'Test City',
    createdAt: new Date(),
    isAdmin: false,
  };

  beforeEach(async () => {
    mockAuthService = {
      signIn: () => Promise.resolve(undefined),
      saveUser: async (
        CreateUserDto: Omit<CreateUserDto, 'IsAdmin'>,
      ): Promise<Omit<CreateUserDto, 'IsAdmin'> & User> => {
        const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);
        return {
          ...CreateUserDto,
          IsAdmin: false,
          id: '1234fs-234sd-234sdf-234sdf',
          password: hashedPassword,
          orders: [],
        } as Omit<CreateUserDto, 'IsAdmin'> & User;
      },
    };

    const mockJwtService = {
      sign: (payload) => jwt.sign(payload, 'testSecretKey'),
    };

    const module = await Test.createTestingModule({
      providers: [
        { provide: JwtService, useValue: mockJwtService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Create an instance of the AuthService', async () => {
    expect(authService).toBeDefined();
  });

  it('signups a new user with an encripted password', async () => {
    const newUser = await authService.saveUser(mockUser as CreateUserDto);

    expect(newUser).toBeDefined();
    expect(newUser.password).not.toEqual(mockUser.password);
    expect(newUser).toHaveProperty('id');

    const isMatch = await bcrypt.compare(mockUser.password, newUser.password);
    expect(isMatch).toBe(true);
  });
});
