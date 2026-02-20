import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { userPatchSchema } from '@/lib/validation';

function sanitizeUser<T extends { password?: unknown }>(user: T) {
  const { password, ...safeUser } = user;
  return safeUser;
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const user = await db.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json({ code: 404, message: 'User not found' }, { status: 404 });
  return NextResponse.json({ data: sanitizeUser(user) });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: 400, message: 'Invalid JSON body' }, { status: 400 });
  }
  const parsed = userPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ code: 400, message: parsed.error.errors.map((e) => e.message).join(', ') }, { status: 400 });
  }
  const data: Record<string, unknown> = { ...parsed.data };
  if (parsed.data.password) data.password = await bcrypt.hash(parsed.data.password, 8);
  try {
    const user = await db.user.update({ where: { id: params.id }, data });
    return NextResponse.json(sanitizeUser(user));
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ code: 404, message: 'User not found' }, { status: 404 });
    }
    throw error;
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await db.user.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return NextResponse.json({ code: 404, message: 'User not found' }, { status: 404 });
    }
    throw error;
  }
}
