import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const secret = process.env.JWT_SECRET || (process.env.NODE_ENV !== 'production' ? 'dev_jwt_secret_change_me' : (() => { throw new Error('JWT_SECRET environment variable is not set'); })());

export function signToken(sub: string, type: string, expiresIn: string) {
  return jwt.sign({ sub, type }, secret, { expiresIn });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret) as { sub: string; type: string };
}

export async function getAuthUserId() {
  const token = cookies().get('auth-token')?.value;
  if (!token) return null;
  try {
    const decoded = verifyToken(token);
    if (decoded.type !== 'accessToken') return null;
    return decoded.sub;
  } catch { return null; }
}
