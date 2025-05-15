import { NextResponse } from 'next/server';

const skills = {
  languages: [
    "JavaScript",
    "TypeScript",
    "PHP",
  ],
  frontend: [
    "React.js",
    "Redux",
    "Bootstrap",
    "Tailwind CSS",
    "CSS",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "Symfony",
    "Laravel",
    "REST APIs",
  ],
  databases: [
    "MySQL",
    "MongoDB",
  ],
  tools: [
    "Git",
    "GitHub",
    "GitLab",
    "BitBucket",
  ],
  cms: [
    "WordPress",
    "WordPress plugins",
  ],
  templates: [
    "Pug/Jade",
    "EJS",
  ],
};

export async function GET() {
  return NextResponse.json(skills);
}