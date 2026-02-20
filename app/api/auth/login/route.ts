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
  const access = signToken(user.id, 'accessToken', '30m');
  const refresh = signToken(user.id, 'refreshToken', '30d');
  await db.token.create({ data: { token: refresh, userId: user.id, type: 'refreshToken', expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } });
  const res = NextResponse.json({ message: 'Login Successfully', user, tokens: { access: { token: access }, refresh: { token: refresh } } });
  res.cookies.set('auth-token', access, { httpOnly: true, path: '/' });
  return res;
}
