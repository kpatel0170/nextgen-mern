import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const refreshToken =
    body &&
    typeof body === 'object' &&
    'refreshToken' in body &&
    typeof (body as any).refreshToken === 'string'
      ? (body as any).refreshToken.trim()
      : '';

  if (!refreshToken) {
    return NextResponse.json({ error: 'refreshToken is required' }, { status: 400 });
  }

  await db.token.deleteMany({ where: { token: refreshToken, type: 'refreshToken', blacklisted: false } });
  const res = new NextResponse(null, { status: 204 });
  res.cookies.delete('auth-token');
  return res;
}
