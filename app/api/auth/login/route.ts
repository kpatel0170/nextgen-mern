import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { loginSchema } from '@/lib/validation';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ code: 400, message: parsed.error.errors.map((e) => e.message).join(', ') }, { status: 400 });
  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await bcrypt.compare(parsed.data.password, user.password))) {
    return NextResponse.json({ code: 401, message: 'Sorry, the email / password combination is not valid. Please try again.\nIf the problem persists, kindly call support.' }, { status: 401 });
  }
  const accessExpires = new Date(Date.now() + 30 * 60 * 1000);
  const refreshExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const access = signToken(user.id, 'accessToken', '30m');
  const refresh = signToken(user.id, 'refreshToken', '30d');
  await db.token.create({ data: { token: refresh, userId: user.id, type: 'refreshToken', expires: refreshExpires } });
  const { password, ...publicUser } = user;
  const res = NextResponse.json({
    message: 'Login Successfully',
    user: publicUser,
    tokens: {
      access: { token: access, expires: accessExpires.toISOString() },
      refresh: { token: refresh, expires: refreshExpires.toISOString() },
    },
  });
  res.cookies.set('auth-token', access, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 60,
  });
  return res;
}
