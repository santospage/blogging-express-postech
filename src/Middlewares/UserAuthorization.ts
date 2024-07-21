import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

function UserAuthorization(req: Request, res: Response, next: NextFunction): Response | void {
  let tokenJwt = req.headers.authorization;

  if (tokenJwt) {
    tokenJwt = tokenJwt.replace('Bearer', '').trim();
    const secret = process.env.SECURITY_JWT;

    if (!secret) {
      return res.status(500).json({
        auth: false,
        message: 'Missing SECURITY_JWT in environment variables'
      });
    }

    jwt.verify(tokenJwt, secret, (e) => {
      if (e) {
        return res.status(401).json({
          auth: false,
          message: e.message
        });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({
      auth: false,
      message: 'Token not sent'
    });
  }
}

export default UserAuthorization;
