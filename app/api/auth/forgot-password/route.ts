import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { signToken } from '@/lib/auth';
import { sendEmail } from '@/lib/email';
import { forgotPasswordSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: 400, message: 'Invalid JSON body' }, { status: 400 });
  }
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ code: 400, message: parsed.error.errors.map((e) => e.message).join(', ') }, { status: 400 });
  }
  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) return NextResponse.json({ code: 404, message: 'No users found with this email' }, { status: 404 });
  const token = signToken(user.id, 'resetPasswordToken', '10m');
  await db.token.create({ data: { token, userId: user.id, type: 'resetPasswordToken', expires: new Date(Date.now() + 10 * 60 * 1000) } });
  await sendEmail(parsed.data.email, 'Reset password', `token=${token}`);
  return new NextResponse(null, { status: 204 });
}
