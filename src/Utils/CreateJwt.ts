import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function createJwt(payload: object): string {
  const secret = process.env.SECURITY_JWT;
  let tokenJwt = '';

  if (secret) {
    tokenJwt = jwt.sign(payload, secret, {
      expiresIn: '1h'
    });
  }
  return tokenJwt;
}

export default createJwt;
