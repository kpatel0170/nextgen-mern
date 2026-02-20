import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) return NextResponse.json({ code: 400, message: 'token required' }, { status: 400 });
  const body = await req.json();
  const decoded = verifyToken(token);
  await db.user.update({ where: { id: decoded.sub }, data: { password: await bcrypt.hash(body.password, 8) } });
  await db.token.deleteMany({ where: { userId: decoded.sub, type: 'resetPasswordToken' } });
  return new NextResponse(null, { status: 204 });
}
