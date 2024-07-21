import { scryptSync, timingSafeEqual } from 'crypto';
import ILogin from '../Interfaces/ILogin';

function validUser(password: string, user: ILogin): boolean {
  if (password && user.salpass) {
    const hashDigited = scryptSync(password, user.salpass, 64);
    const hashUser = Buffer.from(user.password, 'hex');
    const hashValid = timingSafeEqual(hashDigited, hashUser);
    return hashValid;
  }
  return false;
}

export default validUser;
