import { randomBytes, scryptSync } from 'crypto';

export default function createHash(password: string) {
  const salPass = randomBytes(16).toString('hex');
  const hashPass = scryptSync(password, salPass, 64).toString('hex');
  return { password: hashPass, salpass: salPass };
}
