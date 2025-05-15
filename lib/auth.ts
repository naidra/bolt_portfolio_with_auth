import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const token = cookies().get('token')?.value;
  if (!token) return null;
  return await decrypt(token);
}

export async function updateSession(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) return null;
  return await decrypt(token);
}