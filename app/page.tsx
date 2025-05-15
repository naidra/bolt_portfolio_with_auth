"use client";

import { useTheme } from "next-themes";
import { Projects } from "@/components/projects";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Hero />
      <Projects />
      <Footer />
    </main>
  );
}