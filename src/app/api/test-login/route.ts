// src/app/api/test-login/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { encode } from 'next-auth/jwt'

export async function POST(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET

  if (!secret) {
    return NextResponse.json({ error: 'NEXTAUTH_SECRET is not set' }, { status: 500 })
  }

  const body = await req.json()
  const role = body.role || "user"

  const mockUser = {
    name: 'PizzaLover',
    email: 'pizza@lover.com',
    picture: 'https://i.imgur.com/pizza.png',
    sub: 'mock-user-id',
    role,
  }

  const token = await encode({
    token: mockUser,
    secret,
  })

  const res = NextResponse.json({ success: true })

  res.cookies.set('next-auth.session-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  })

  return res
}
