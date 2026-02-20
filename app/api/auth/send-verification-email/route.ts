import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthUserId, signToken } from '@/lib/auth';
import { sendEmail } from '@/lib/email';

export async function POST() {
  const userId = await getAuthUserId();
  if (!userId) return NextResponse.json({ code: 401, message: 'Please authenticate' }, { status: 401 });
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ code: 404, message: 'User not found' }, { status: 404 });
  const token = signToken(user.id, 'verifyEmailToken', '10m');
  await db.token.create({ data: { token, userId: user.id, type: 'verifyEmailToken', expires: new Date(Date.now() + 10 * 60 * 1000) } });
  await sendEmail(user.email, 'Verify email', `token=${token}`);
  return new NextResponse(null, { status: 204 });
}
