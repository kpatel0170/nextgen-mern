import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { registerSchema } from '@/lib/validation';

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name') || undefined;
  const role = req.nextUrl.searchParams.get('role') || undefined;
  const users = await db.user.findMany({ where: { name: name ? { contains: name } : undefined, role } });
  const safeUsers = users.map(({ password, ...rest }) => rest);
  return NextResponse.json({ results: safeUsers, page: 1, limit: safeUsers.length, totalResults: safeUsers.length, totalPages: 1 });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: 400, message: 'Invalid JSON body' }, { status: 400 });
  }
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ code: 400, message: parsed.error.errors.map((e) => e.message).join(', ') }, { status: 400 });
  }
  const exists = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return NextResponse.json({ code: 400, message: 'Email already taken' }, { status: 400 });
  const { password, ...userWithoutPassword } = await db.user.create({
    data: { ...parsed.data, password: await bcrypt.hash(parsed.data.password, 8) },
  });
  return NextResponse.json(userWithoutPassword, { status: 201 });
}
