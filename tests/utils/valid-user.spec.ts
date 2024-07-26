import { scryptSync, timingSafeEqual } from 'crypto';
import validUser from '../../src/utils/valid-user';
import ILogin from '../../src/interfaces/login';

describe('validUser', () => {
  const password = 'testPassword';
  const salt = 'testSalt';
  const hash = scryptSync(password, salt, 64).toString('hex');

  const user: ILogin = {
    password: hash,
    salpass: salt
  };

  it('should return true for correct password', () => {
    const result = validUser(password, user);
    expect(result).toBe(true);
  });

  it('should return false for incorrect password', () => {
    const incorrectPassword = 'wrongPassword';
    const result = validUser(incorrectPassword, user);
    expect(result).toBe(false);
  });

  it('should return false if no password is provided', () => {
    const result = validUser('', user);
    expect(result).toBe(false);
  });

  it('should return false if no user salt or hash is provided', () => {
    const result = validUser(password, { password: '', salpass: '' } as ILogin);
    expect(result).toBe(false);
  });

  it('should return false if user salt is not a string', () => {
    const invalidSaltUser: ILogin = {
      password: hash,
      salpass: 1234 as any
    };
  });

  it('should return false if user password is not in hex format', () => {
    const invalidHexUser: ILogin = {
      password: 'notAHexHash',
      salpass: salt
    };
  });
});
