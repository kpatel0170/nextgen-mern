import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { signToken, verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();

  if (!refreshToken || typeof refreshToken !== 'string') {
    return NextResponse.json({ code: 401, message: 'Please authenticate' }, { status: 401 });
  }

  let decoded: any;
  try {
    decoded = verifyToken(refreshToken);
  } catch {
    return NextResponse.json({ code: 401, message: 'Please authenticate' }, { status: 401 });
  }

  if (!decoded || decoded.type !== 'refreshToken') {
    return NextResponse.json({ code: 401, message: 'Please authenticate' }, { status: 401 });
  }

  const tokenDoc = await db.token.findFirst({
    where: { token: refreshToken, type: 'refreshToken', blacklisted: false },
  });

  const now = new Date();
  if (!tokenDoc || tokenDoc.userId !== decoded.sub || !tokenDoc.expires || tokenDoc.expires <= now) {
    return NextResponse.json({ code: 401, message: 'Please authenticate' }, { status: 401 });
  }

  await db.token.delete({ where: { id: tokenDoc.id } });

  const accessExpires = new Date(Date.now() + 30 * 60 * 1000);
  const refreshExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const access = signToken(decoded.sub, 'accessToken', '30m');
  const refresh = signToken(decoded.sub, 'refreshToken', '30d');
  await db.token.create({
    data: { token: refresh, userId: decoded.sub, type: 'refreshToken', expires: refreshExpires },
  });
  return NextResponse.json({
    access: { token: access, expires: accessExpires.toISOString() },
    refresh: { token: refresh, expires: refreshExpires.toISOString() },
  });
}
