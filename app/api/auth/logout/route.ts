import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();
  await db.token.deleteMany({ where: { token: refreshToken, type: 'refreshToken', blacklisted: false } });
  const res = new NextResponse(null, { status: 204 });
  res.cookies.delete('auth-token');
  return res;
}
