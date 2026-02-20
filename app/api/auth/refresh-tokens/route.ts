import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { signToken, verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();
  const decoded = verifyToken(refreshToken);
  const tokenDoc = await db.token.findFirst({ where: { token: refreshToken, type: 'refreshToken', blacklisted: false } });
  if (!tokenDoc) return NextResponse.json({ code: 401, message: 'Please authenticate' }, { status: 401 });
  await db.token.delete({ where: { id: tokenDoc.id } });
  const access = signToken(decoded.sub, 'accessToken', '30m');
  const refresh = signToken(decoded.sub, 'refreshToken', '30d');
  await db.token.create({ data: { token: refresh, userId: decoded.sub, type: 'refreshToken', expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } });
  return NextResponse.json({ access: { token: access }, refresh: { token: refresh } });
}
