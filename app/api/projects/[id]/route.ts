import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

type Project = {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
};

const projects_: Project[] = [
  {
    id: 1,
    title: "Noxolo",
    description: "Smart House",
    url: "https://dev001.noxolo.de/login",
    tags: ["Php", "Symfony", "Twig", "MySQL", "WebSocket", "Webhooks", "Bootstrap", "IoT", "Responsive design", "Smart Appliances", "Home Assistant", "Climate Control"],
  },
  {
    id: 2,
    title: "Dish App",
    description: "Restaurant web app",
    url: "https://dishapp.shop/main",
    tags: ["Php", "Symfony", "Twig", "MySQL", "Bootstrap", "Square", "Stripe", "Responsive design", "Food", "E-commerce"],
  },
  {
    id: 3,
    title: "Dash",
    description: "Hospital management system",
    url: "https://478.q-wise.de/login",
    tags: ["Php", "Symfony", "Twig, MySQL", "WebSocket", "Webhooks", "Bootstrap", "Healthcare", "Management", "Dashboard"],
  },
  {
    id: 4,
    title: "Albfix",
    description: "House devices repair company system",
    url: "https://albsmart.com/login",
    tags: ["NodeJs", "MongoDB", "PassportJs", "Express", "EJS", "Pug", "Bootstrap", "Cloudinary", "Mailjet", "Responsive design", "Service", "Management"],
  },
  {
    id: 5,
    title: "PDF Shop",
    description: "Digital document marketplace",
    url: "https://sell-pdf-files-node-js-with-api.vercel.app/",
    tags: ["NodeJs", "MongoDB", "PassportJs", "EJS", "Bootstrap", "Mailjet", "Cloudinary", "Square", "Stripe", "Paysera", "Responsive design", "E-commerce", "PDF", "Digital products"],
  },
  {
    id: 6,
    title: "Daniel Marquis",
    description: "Personal portfolio",
    url: "https://danielmarquis.com/",
    tags: ["Html", "Css", "Svg", "Animation", "Responsive design", "Portfolio", "Personal", "Web Design"],
  },
  {
    id: 7,
    title: "Quiz App",
    description: "Interactive learning platform",
    url: "https://quizapp-beta-six.vercel.app",
    tags: ["NextJs", "JSX", "NodeJs", "MongoDB", "Redux", "Bootstrap", "Opentdb api", "Responsive design", "Education"],
  },
];

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, description, url, tags } = await request.json();
    const updatedProject = await db
      .update(projects)
      .set({ title, description, url, tags })
      .where(eq(projects.id, parseInt(params.id)))
      .returning();

    return NextResponse.json(updatedProject[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await db
      .delete(projects)
      .where(eq(projects.id, parseInt(params.id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}