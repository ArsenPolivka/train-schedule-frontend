import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const nestRes = await fetch(`${process.env.SERVER_BASE_URL}/auth/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!nestRes.ok) {
    return NextResponse.json({ error: 'Invalid access token' }, { status: 401 });
  }

  const user = await nestRes.json();

  return NextResponse.json(user);
}
