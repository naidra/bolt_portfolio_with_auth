"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import lukasImg from "../public/images/Lukas.jpeg"

export function Hero() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
      <div 
        ref={ref}
        className="container max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center md:text-left order-2 md:order-1"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="block">Hi, I&apos;m a</span>
            <span className="text-primary">Full Stack Developer</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0">
            Specialized in JavaScript, Node.js, React, PHP, Symfony, Laravel, and more. 
            I build scalable web applications with a focus on performance and user experience.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start text-sm text-muted-foreground">
            <span className="px-3 py-1 bg-secondary/50 rounded-full">JavaScript</span>
            <span className="px-3 py-1 bg-secondary/50 rounded-full">React</span>
            <span className="px-3 py-1 bg-secondary/50 rounded-full">Node.js</span>
            <span className="px-3 py-1 bg-secondary/50 rounded-full">TypeScript</span>
            <span className="px-3 py-1 bg-secondary/50 rounded-full">PHP</span>
            <span className="px-3 py-1 bg-secondary/50 rounded-full">CSS</span>
          </div>
          <div className="pt-4">
            <Button 
              size="lg" 
              onClick={scrollToProjects}
              className="group"
            >
              View My Projects
              <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative order-1 md:order-2 flex justify-center"
        >
          <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden border-4 border-primary shadow-xl">
            <Image
              src={lukasImg}
              alt="Profile"
              fill
              priority
              sizes="(max-width: 768px) 16rem, 20rem"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent blur-xl -z-10" />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={scrollToProjects}
          aria-label="Scroll down"
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}