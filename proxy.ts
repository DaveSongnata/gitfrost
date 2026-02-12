import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const accessToken = request.nextUrl.searchParams.get('access');
  const expectedToken = process.env.ACCESS_TOKEN;

  // If no ACCESS_TOKEN is set in env, allow all access
  if (!expectedToken) {
    return NextResponse.next();
  }

  // Check if the access token matches
  if (accessToken !== expectedToken) {
    return new NextResponse('Acesso não autorizado', {
      status: 401,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  return NextResponse.next();
}

// Only run proxy on the home page
export const config = {
  matcher: '/',
};
