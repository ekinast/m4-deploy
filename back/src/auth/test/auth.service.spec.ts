import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { CreateUserDTO } from '../../users/dto/CreateUser.dto';
import { User } from '../../users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

describe('AuthService', () => {
  let authService: AuthService;
  let mockAuthService: Partial<AuthService>;

  const mockUser: Partial<CreateUserDTO> = {
    name: 'Test User',
    email: 'test@mail.com',
    password: 'password',
    phone: 1234567,
    country: 'Test Country',
    address: 'Test Address',
    city: 'Test City',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    mockAuthService = {
      signIn: () => Promise.resolve(undefined),
      saveUser: async (
        createUserDTO: Omit<CreateUserDTO, 'IsAdmin'>,
      ): Promise<Omit<CreateUserDTO, 'IsAdmin'> & User> => {
        const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
        return {
          ...createUserDTO,
          IsAdmin: false,
          id: '1234fs-234sd-234sdf-234sdf',
          password: hashedPassword,
          orders: [],
        } as Omit<CreateUserDTO, 'IsAdmin'> & User;
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
    const newUser = await authService.saveUser(mockUser as CreateUserDTO);

    expect(newUser).toBeDefined();
    expect(newUser.password).not.toEqual(mockUser.password);
    expect(newUser).toHaveProperty('id');

    const isMatch = await bcrypt.compare(mockUser.password, newUser.password);
    expect(isMatch).toBe(true);
  });
});
