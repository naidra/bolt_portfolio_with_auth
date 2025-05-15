import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { username, password, key } = await request.json();
    const today = new Date();
    const todayDay = today.getDate().toString();

    // Check if username already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username)
    });

    if (key !== process.env.SECRET_ACC_REGISTER_KEY + todayDay) {
      return NextResponse.json(
        { error: 'Invalid registration key' },
        { status: 400 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await db.insert(users).values({
      username,
      password: hashedPassword,
    }).returning();

    return NextResponse.json({ 
      success: true,
      user: { 
        id: newUser[0].id,
        username: newUser[0].username 
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}