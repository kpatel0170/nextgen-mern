import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

export function signToken(sub: string, type: string, expiresIn: string) {
  return jwt.sign({ sub, type }, secret, { expiresIn });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret) as { sub: string; type: string };
}

export async function getAuthUserId() {
  const token = cookies().get('auth-token')?.value;
  if (!token) return null;
  try { return verifyToken(token).sub; } catch { return null; }
}
