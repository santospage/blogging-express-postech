import createJwt from '../../src/utils/create-jwt';
import jwt from 'jsonwebtoken';

describe('createJwt', () => {
  const secret = 'testSecret';
  process.env.SECURITY_JWT = secret;

  it('should generate a JWT token when a secret is present', () => {
    const payload = { userId: '12345' };
    const token = createJwt(payload);
    const decoded = jwt.verify(token, secret) as any;
    expect(decoded.userId).toBe(payload.userId);
  });

  it('should return an empty string when the secret is not present', () => {
    delete process.env.SECURITY_JWT;

    const payload = { userId: '12345' };
    const token = createJwt(payload);

    expect(token).toBe('');

    process.env.SECURITY_JWT = secret;
  });
});
