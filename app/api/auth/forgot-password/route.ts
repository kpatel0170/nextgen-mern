import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ code: 404, message: 'No users found with this email' }, { status: 404 });
  const token = signToken(user.id, 'resetPasswordToken', '10m');
  await db.token.create({ data: { token, userId: user.id, type: 'resetPasswordToken', expires: new Date(Date.now() + 10 * 60 * 1000) } });
  await sendEmail(email, 'Reset password', `token=${token}`);
  return new NextResponse(null, { status: 204 });
}
