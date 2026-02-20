import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const user = await db.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json({ code: 404, message: 'User not found' }, { status: 404 });
  return NextResponse.json({ data: user });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const data = { ...body, password: body.password ? await bcrypt.hash(body.password, 8) : undefined };
  const user = await db.user.update({ where: { id: params.id }, data });
  return NextResponse.json(user);
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await db.user.delete({ where: { id: params.id } });
  return new NextResponse(null, { status: 204 });
}
