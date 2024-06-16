import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let token = '';
  let userId = '';
  let orderId = '';

  it('Post /auth/signup/ Signsup a user with an 201 status code and a user body without password and isAdmin field', async () => {
    const userCredentials = {
      name: 'Test User',
      email: 'test@mail.com',
      password: 'Admin$1234',
      phone: 543548561234,
      country: 'Argentina',
      address: 'Test 123',
      city: 'Test City',
    };

    const req = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(userCredentials);

    userId = req.body.id;
    expect(req.status).toBe(201);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('Post /auth/signin/ Returns a user with an OK status code and a token', async () => {
    const userCredentials = {
      email: 'eddy@mail.com',
      password: 'Admin$1234',
    };

    const req = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(userCredentials);

    token = req.body.token;
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('Get /users/ Returns users with an OK status code', async () => {
    const req = await request(app.getHttpServer())
      .get('/users/')
      .set('Authorization', `Bearer ${token}`);

    userId = req.body[1].id;
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('Get /users/:id Returns a user with an OK status code', async () => {
    const req = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  for (let i = 0; i < 2; i++) {
    it('Post /orders/ Adds two new orders and returns order.id and total price', async () => {
      const newOrder = {
        userId: userId,
        products: [
          { id: '3a298f80-cadb-4354-b916-1073f648760d' },
          { id: 'a43c8f70-b2d9-4eb3-9ef6-f0bf2c3bb3d0' },
        ],
      };

      const req = await request(app.getHttpServer())
        .post('/orders')
        .send(newOrder)
        .set('Authorization', `Bearer ${token}`);

      orderId = req.body.id;

      expect(req.status).toBe(201);
      expect(req.body).toBeInstanceOf(Object);
    });
  }

  it('Get /orders/ Returns orders with an OK status code', async () => {
    const req = await request(app.getHttpServer())
      .get('/orders/')
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  it('Delete /orders/:id Deletes an order with an OK status code and the orders id', async () => {
    const req = await request(app.getHttpServer())
      .delete(`/orders/${orderId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });

  it('Delete /users/:id Deletes a user with an OK status code and the users id', async () => {
    const req = await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });
});
