import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) return NextResponse.json({ code: 400, message: 'token required' }, { status: 400 });
  const decoded = verifyToken(token);
  await db.token.deleteMany({ where: { userId: decoded.sub, type: 'verifyEmailToken' } });
  return new NextResponse(null, { status: 204 });
}
