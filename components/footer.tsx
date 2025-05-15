"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Link from 'next/link'

interface ContactData {
  phone: string;
  email: string;
  address: string;
  education: {
    degree: string;
    university: string;
  };
  social: {
    github: string;
    linkedin: string;
    x: string
  };
}

interface SkillsData {
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  tools: string[];
  cms: string[];
  templates: string[];
}

export function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contact, setContact] = useState<ContactData | null>(null);
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [contactRes, skillsRes] = await Promise.all([
          fetch('/api/contact'),
          fetch('/api/skills')
        ]);
        
        const contactData = await contactRes.json();
        const skillsData: SkillsData = await skillsRes.json();
        
        setContact(contactData);
        setSkills([
          ...skillsData.languages,
          ...skillsData.frontend,
          ...skillsData.backend,
          ...skillsData.databases,
          ...skillsData.tools,
          ...skillsData.cms
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    fetchData();
  }, []);

  const currentYear = new Date().getFullYear();

  if (!contact) return null;

  const skillsFirstHalf = skills.slice(0, Math.ceil(skills.length / 2));
  const skillsSecondHalf = skills.slice(Math.ceil(skills.length / 2));

  return (
    <footer ref={ref} className="bg-background py-12 px-4 border-t">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="container max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold">Education</h3>
              <p className="text-muted-foreground mt-2">
                {contact.education.degree}<br />
                {contact.education.university}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Contact</h3>
              <div className="space-y-2 mt-2">
                <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {contact.address}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Skills</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="space-y-1">
                {skillsFirstHalf.map((skill, index) => (
                  <p key={index}>• {skill}</p>
                ))}
              </div>
              <div className="space-y-1">
                {skillsSecondHalf.map((skill, index) => (
                  <p key={index}>• {skill}</p>
                ))}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <a 
                href={contact.social.github}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
                target="_blank"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href={contact.social.linkedin}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
                target="_blank"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={contact.social.x}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="x"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                </svg>
              </a>
              <a 
                href={`mailto:${contact.email}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
                target="_blank"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Portfolio. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}