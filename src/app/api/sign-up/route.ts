import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const nestRes = await fetch(`${process.env.SERVER_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!nestRes.ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  const data = await nestRes.json();
  const token = data.access_token;

  const response = NextResponse.json({ data, success: true });
  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
  });

  return response;
}
