import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) return NextResponse.json({ code: 400, message: 'token required' }, { status: 400 });

  let decoded: any;
  try {
    decoded = verifyToken(token);
  } catch {
    return NextResponse.json({ code: 400, message: 'invalid token' }, { status: 400 });
  }

  if (!decoded || decoded.type !== 'verifyEmailToken' || !decoded.sub) {
    return NextResponse.json({ code: 400, message: 'invalid token type' }, { status: 400 });
  }

  const tokenRecord = await db.token.findFirst({
    where: { token, type: 'verifyEmailToken', userId: decoded.sub, blacklisted: false, expires: { gt: new Date() } },
  });
  if (!tokenRecord) {
    return NextResponse.json({ code: 400, message: 'invalid or expired token' }, { status: 400 });
  }

  await db.user.update({ where: { id: decoded.sub }, data: { isEmailVerified: true } });
  await db.token.deleteMany({ where: { userId: decoded.sub, type: 'verifyEmailToken' } });
  return new NextResponse(null, { status: 204 });
}
