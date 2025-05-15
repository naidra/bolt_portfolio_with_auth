"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectData } from "@/lib/types";

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={item} whileHover={{ y: -5 }} transition={{ duration: 0.4 }}>
      <Card className="h-full flex flex-col overflow-hidden border border-border/40 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl tracking-tight">{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-secondary/70">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-2 border-t">
          <Button
            variant="ghost"
            className="w-full group"
            asChild
          >
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors"
            >
              Visit Site
              <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}