"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ProjectCard } from "@/components/project-card";
import { ProjectData } from "@/lib/types";

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format');
        }
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
    
    fetchProjects();
  }, []);
  
  const filteredProjects = filter 
    ? projects.filter(project => project.tags.includes(filter))
    : projects;
    
  const uniqueTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section id="projects" className="py-20 px-4 bg-secondary/30">
      <div ref={ref} className="container max-w-6xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of web applications I've developed, showcasing a range of skills and technologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <button
            onClick={() => setFilter(null)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              filter === null 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            All
          </button>
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filter === tag 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}