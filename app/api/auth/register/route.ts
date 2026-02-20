import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { registerSchema } from '@/lib/validation';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ code: 400, message: parsed.error.errors.map((e) => e.message).join(', ') }, { status: 400 });
  const exists = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return NextResponse.json({ code: 400, message: 'Email already taken' }, { status: 400 });
  const user = await db.user.create({ data: { ...parsed.data, password: await bcrypt.hash(parsed.data.password, 8) } });
  const access = signToken(user.id, 'accessToken', '30m');
  const refresh = signToken(user.id, 'refreshToken', '30d');
  await db.token.create({ data: { token: refresh, userId: user.id, type: 'refreshToken', expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } });
  const res = NextResponse.json({ message: 'Register Successfully', user, tokens: { access: { token: access }, refresh: { token: refresh } } });
  res.cookies.set('auth-token', access, { httpOnly: true, path: '/' });
  return res;
}
