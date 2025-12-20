"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@uwdsc/ui";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: "cxc-2025", name: "CxC 2025" },
  { id: "web", name: "CxC 2024" },
  { id: "data", name: "CxC 2023" },
];

// Temporary placeholder projects
const tempProjects: Project[] = [
  {
    id: "1",
    title: "Project Alpha",
    description: "An innovative AI solution",
    category: "ai-ml",
  },
  {
    id: "2",
    title: "Project Beta",
    description: "Full-stack web application",
    category: "web",
  },
  {
    id: "3",
    title: "Project Gamma",
    description: "Data analysis platform",
    category: "data",
  },
  {
    id: "4",
    title: "Project Delta",
    description: "Machine learning model",
    category: "ai-ml",
  },
  {
    id: "5",
    title: "Project Epsilon",
    description: "Modern web framework",
    category: "web",
  },
];

export function PastProjects() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 py-20 px-4 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Past Projects
        </h2>
        <p className="text-lg md:text-xl text-purple-300">
          Hover over a UFO to see projects from each category
        </p>
      </motion.div>

      {/* UFO Categories - Responsive layout: column on mobile, scattered on desktop */}
      <div className="max-w-7xl mx-auto min-h-[1200px] flex flex-col gap-16 md:relative md:block">
        {/* Mobile: vertical stack */}
        <div className="block md:hidden">
          {categories.map((cat) => (
            <div key={cat.id} className="mb-16">
              <UFOSection category={cat} />
            </div>
          ))}
        </div>
        {/* Desktop: scattered absolute positions */}
        <div className="hidden md:block">
          <div className="absolute top-0 left-[10%]">
            <UFOSection category={categories[0]!} />
          </div>
          <div className="absolute top-0 right-[15%]">
            <UFOSection category={categories[1]!} />
          </div>
          <div className="absolute top-[450px] left-[35%]">
            <UFOSection category={categories[2]!} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface UFOSectionProps {
  category: Category;
}

function UFOSection({ category }: UFOSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const filteredProjects = tempProjects.filter(
    (p) => p.category === category.id,
  );

  return (
    <div className="flex flex-col items-center" style={{ minHeight: 340 }}>
      <div className="relative" style={{ minHeight: 220 }}>
        {/* UFO */}
        <UFO
          category={category}
          isHovered={isHovered}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        />
        {/* Beam/Ray effect is already absolutely positioned inside UFO */}
        {/* Projects below this UFO, absolutely positioned to avoid layout jump */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full w-full"
          style={{ minHeight: 120 }}
        >
          <AnimatePresence mode="wait">
            {isHovered && (
              <motion.div
                key={category.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex gap-6 justify-center"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

interface UFOProps {
  category: Category;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function UFO({ category, isHovered, onHoverStart, onHoverEnd }: UFOProps) {
  return (
    <div className="relative inline-block">
      {/* Category Label above UFO, responsive, no wrap */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-12 flex flex-col items-center select-none">
        <p
          className="text-white font-semibold tracking-wider text-base py-2 whitespace-nowrap"
          style={{
            filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
          }}
        >
          {category.name}
        </p>
      </div>
      <motion.div
        className="relative cursor-pointer"
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          layout: {
            duration: 0,
          },
        }}
      >
        {/* UFO Image with White Glow */}
        <div className="relative">
          <div
            className="absolute inset-0 bg-white rounded-full blur-2xl opacity-25 animate-pulse"
            style={{ animationDuration: "4s" }}
          ></div>

          <Image
            src="/past_projects/ufo3.png"
            alt={`${category.name} UFO`}
            width={316}
            height={119}
            className="relative w-40 h-15 md:w-52 md:h-20 lg:w-36 lg:h-14 object-contain"
            style={{
              filter:
                "drop-shadow(0 0 6px rgba(255,255,255,0.6)) drop-shadow(0 0 12px rgba(255,255,255,0.4))",
            }}
          />
          {/* Blinking lights */}
          <div
            className="absolute top-2 right-1 w-[1.5px] h-[1.5px] bg-white rounded-full opacity-80 animate-ping"
            style={{ animationDuration: "2s", animationDelay: "0s" }}
          ></div>
          <div
            className="absolute bottom-3 left-0 w-1 h-1 bg-white rounded-full opacity-70 animate-ping"
            style={{ animationDuration: "2s", animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 right-0 w-[2.5px] h-[2.5px] bg-white rounded-full opacity-60 animate-ping"
            style={{ animationDuration: "2s", animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute top-0 left-1/3 w-[1.5px] h-[1.5px] bg-white rounded-full opacity-60 animate-ping"
            style={{ animationDuration: "2s", animationDelay: "2.5s" }}
          ></div>
          <div
            className="absolute top-4 left-2 w-[2px] h-[2px] bg-white rounded-full opacity-75 animate-ping"
            style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-2 right-3 w-[1px] h-[1px] bg-white rounded-full opacity-65 animate-ping"
            style={{ animationDuration: "3s", animationDelay: "1.2s" }}
          ></div>
          <div
            className="absolute top-1/3 left-1/4 w-[3px] h-[3px] bg-white rounded-full opacity-70 animate-ping"
            style={{ animationDuration: "2.2s", animationDelay: "0.8s" }}
          ></div>
          <div
            className="absolute bottom-1/3 right-1/4 w-[1.5px] h-[1.5px] bg-white rounded-full opacity-85 animate-ping"
            style={{ animationDuration: "2.8s", animationDelay: "1.8s" }}
          ></div>
          <div
            className="absolute top-1/4 right-1/3 w-[2px] h-[2px] bg-white rounded-full opacity-60 animate-ping"
            style={{ animationDuration: "3.5s", animationDelay: "2.2s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/2 w-[1px] h-[1px] bg-white rounded-full opacity-70 animate-ping"
            style={{ animationDuration: "2.3s", animationDelay: "0.3s" }}
          ></div>
          <div
            className="absolute top-3 right-1/2 w-[2.5px] h-[2.5px] bg-white rounded-full opacity-75 animate-ping"
            style={{ animationDuration: "2.7s", animationDelay: "1.6s" }}
          ></div>
          <div
            className="absolute bottom-4 left-1/3 w-[1.5px] h-[1.5px] bg-white rounded-full opacity-65 animate-ping"
            style={{ animationDuration: "3.2s", animationDelay: "2.1s" }}
          ></div>
        </div>

        {/* Beam/Ray effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0, originY: 0 }}
              animate={{ opacity: 0.6, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute left-1/2 -translate-x-1/2 top-full pointer-events-none"
              style={{
                width: "300px",
                height: "256px",
                background: `linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)`,
                clipPath: "path('M 100 0 Q 150 12, 200 0 L 300 256 L 0 256 Z')",
              }}
            >
              <motion.div
                className="w-full h-full"
                animate={{
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
        scale: 0.5,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        y: -50,
        scale: 0.8,
        filter: "blur(10px)",
        transition: {
          duration: 0.6,
          ease: "easeInOut",
        },
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <Card
        className="relative overflow-hidden border-2 bg-slate-900/50 backdrop-blur-sm transition-all duration-300"
        style={{
          borderColor: isHovered
            ? "rgba(255,255,255,0.3)"
            : "rgba(255,255,255,0.1)",
          boxShadow: isHovered ? "0 0 30px rgba(255,255,255,0.25)" : "none",
        }}
      >
        <CardHeader>
          <CardTitle className="text-white">{project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-200/80">{project.description}</p>
        </CardContent>

        {/* Glitch effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
              className="absolute inset-0 pointer-events-none bg-white/10"
            />
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
