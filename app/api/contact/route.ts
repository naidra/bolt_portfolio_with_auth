import { NextResponse } from 'next/server';

const contact = {
  phone: "+38349303358",
  email: "ardiansallauka@gmail.com",
  address: "Kosovo, Prishtine",
  education: {
    degree: "Computer Science bachelor degree",
    university: "University of Prizren Ukshin Hoti"
  },
  social: {
    github: "https://github.com/naidra",
    linkedin: "https://www.linkedin.com/in/ardian-sallauka-563006187",
    x: "https://x.com/ArdianSall45867"
  }
};

export async function GET() {
  return NextResponse.json(contact);
}