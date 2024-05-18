import { AuthInterceptor } from './password.interceptor';

describe('AuthInterceptor', () => {
  it('should be defined', () => {
    expect(new AuthInterceptor()).toBeDefined();
  });
});
