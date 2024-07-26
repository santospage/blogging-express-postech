import express, { Request, Response, NextFunction } from 'express';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import userAuthorization from '../../src/middlewares/user-authorization';

const app = express();

app.use(userAuthorization);
app.get('/test', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Authorized' });
});

describe('userAuthorization Middleware', () => {
  const secret = 'testSecret';
  process.env.SECURITY_JWT = secret;

  it('should return 401 if no token is sent', async () => {
    const response = await supertest(app).get('/test');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      auth: false,
      message: 'Token not sent'
    });
  });

  it('should return 500 if SECURITY_JWT is missing', async () => {
    delete process.env.SECURITY_JWT;

    const response = await supertest(app).get('/test').set('Authorization', 'Bearer someToken');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      auth: false,
      message: 'Missing SECURITY_JWT in environment variables'
    });

    process.env.SECURITY_JWT = secret;
  });

  it('should return 401 if token is invalid', async () => {
    const invalidToken = 'invalidToken';

    const response = await supertest(app).get('/test').set('Authorization', `Bearer ${invalidToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      auth: false,
      message: 'jwt malformed'
    });
  });

  it('should pass if token is valid', async () => {
    const validToken = jwt.sign({ user: 'testUser' }, secret, { expiresIn: '1h' });

    const response = await supertest(app).get('/test').set('Authorization', `Bearer ${validToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Authorized'
    });
  });
});
