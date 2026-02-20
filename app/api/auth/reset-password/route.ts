import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { resetPasswordSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) return NextResponse.json({ code: 400, message: 'token required' }, { status: 400 });

  let decoded: any;
  try {
    decoded = verifyToken(token);
  } catch {
    return NextResponse.json({ code: 400, message: 'invalid token' }, { status: 400 });
  }

  if (!decoded || decoded.type !== 'resetPasswordToken' || !decoded.sub) {
    return NextResponse.json({ code: 400, message: 'invalid reset password token' }, { status: 400 });
  }

  const storedToken = await db.token.findFirst({
    where: { token, type: 'resetPasswordToken', userId: decoded.sub, blacklisted: false, expires: { gt: new Date() } },
  });
  if (!storedToken) {
    return NextResponse.json({ code: 400, message: 'reset password token is invalid or has expired' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: 400, message: 'Invalid JSON body' }, { status: 400 });
  }
  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ code: 400, message: parsed.error.errors.map((e) => e.message).join(', ') }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 8);
  await db.user.update({ where: { id: decoded.sub }, data: { password: hashedPassword } });
  await db.token.deleteMany({ where: { userId: decoded.sub, type: 'resetPasswordToken' } });
  return new NextResponse(null, { status: 204 });
}
