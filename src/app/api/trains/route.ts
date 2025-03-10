import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No token found' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'departure';
  const order = searchParams.get('order') || 'ASC';

  const apiUrl = `${process.env.SERVER_BASE_URL}/trains?search=${encodeURIComponent(search)}&sortBy=${sortBy}&order=${order}`;

  const nestRes = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!nestRes.ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await nestRes.json();
  return NextResponse.json(data);
}
