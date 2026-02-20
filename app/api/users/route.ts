import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name') || undefined;
  const role = req.nextUrl.searchParams.get('role') || undefined;
  const users = await db.user.findMany({ where: { name: name ? { contains: name } : undefined, role } });
  return NextResponse.json({ results: users.length, page: 1, limit: users.length, data: users });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await db.user.create({ data: { ...body, password: await bcrypt.hash(body.password, 8) } });
  return NextResponse.json(user, { status: 200 });
}
