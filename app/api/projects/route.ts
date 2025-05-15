import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { getSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allProjects = await db.select().from(projects);
    return NextResponse.json(allProjects);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, description, url, tags } = await request.json();
    const newProject = await db.insert(projects).values({
      title,
      description,
      url,
      tags,
    }).returning();

    return NextResponse.json(newProject[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}