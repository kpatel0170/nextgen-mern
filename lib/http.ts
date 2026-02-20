import { NextResponse } from 'next/server';

export function errorResponse(code: number, message: string) {
  return NextResponse.json({ code, message }, { status: code });
}
