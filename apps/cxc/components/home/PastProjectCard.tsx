import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Project } from "./PastProjects";

export default function PastProjectCard(project: Project) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (inView) setHasBeenInView(true);
  }, [inView]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* alien */}
      <motion.div
        className="relative w-20 h-10"
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={
          hasBeenInView
            ? {
                opacity: [0, 0.4, 0.7, 1],
                filter: ["blur(6px)", "blur(3px)", "blur(1px)", "blur(0px)"],
              }
            : {
                opacity: 0,
                filter: "blur(6px)",
              }
        }
        transition={{
          duration: 1,
          times: [0, 0.3, 0.6, 1],
          ease: "easeOut",
          delay: 0.1,
        }}
      >
        <Image
          src="/past_projects/alien.png"
          alt="alien"
          fill
          className="object"
        />
      </motion.div>

      {/* card */}
      <motion.div
        className="border border-white rounded-lg overflow-hidden flex flex-col items-center bg-background relative"
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={
          hasBeenInView
            ? {
                opacity: [0, 0.3, 0.6, 1],
                filter: ["blur(8px)", "blur(4px)", "blur(2px)", "blur(0px)"],
              }
            : {
                opacity: 0,
                filter: "blur(8px)",
              }
        }
        transition={{
          duration: 1,
          times: [0, 0.3, 0.6, 1],
          ease: "easeOut",
        }}
      >
        {/* Cyan glitch streaks */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={
            hasBeenInView
              ? {
                  opacity: [0, 1, 0, 1, 0, 0.8, 0, 0.9, 0],
                }
              : {}
          }
          transition={{
            duration: 0.85,
            times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1],
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute top-[20%] left-0 w-full h-[3px] bg-cyan-400"
            animate={
              hasBeenInView
                ? {
                    x: ["-100%", "100%"],
                  }
                : {}
            }
            transition={{ duration: 0.35, delay: 0.05 }}
          />
          <motion.div
            className="absolute top-[45%] left-0 w-full h-[2px] bg-cyan-300"
            animate={
              hasBeenInView
                ? {
                    x: ["100%", "-100%"],
                  }
                : {}
            }
            transition={{ duration: 0.3, delay: 0.2 }}
          />
          <motion.div
            className="absolute top-[70%] left-0 w-full h-[4px] bg-cyan-500"
            animate={
              hasBeenInView
                ? {
                    x: ["-100%", "100%"],
                  }
                : {}
            }
            transition={{ duration: 0.4, delay: 0.4 }}
          />
          <motion.div
            className="absolute top-[85%] left-0 w-full h-[2px] bg-cyan-200"
            animate={
              hasBeenInView
                ? {
                    x: ["100%", "-100%"],
                  }
                : {}
            }
            transition={{ duration: 0.25, delay: 0.6 }}
          />
          <motion.div
            className="absolute top-[30%] left-0 w-full h-[3px] bg-cyan-300"
            animate={
              hasBeenInView
                ? {
                    x: ["-100%", "100%"],
                  }
                : {}
            }
            transition={{ duration: 0.33, delay: 0.8 }}
          />
        </motion.div>

        {/* Red glitch streaks */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={
            hasBeenInView
              ? {
                  opacity: [0, 0.9, 0, 1, 0, 0.7, 0, 0.85, 0],
                }
              : {}
          }
          transition={{
            duration: 0.85,
            times: [0, 0.12, 0.22, 0.32, 0.42, 0.52, 0.62, 0.82, 1],
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute top-[15%] left-0 w-full h-[2px] bg-red-500"
            animate={
              hasBeenInView
                ? {
                    x: ["100%", "-100%"],
                  }
                : {}
            }
            transition={{ duration: 0.33, delay: 0.08 }}
          />
          <motion.div
            className="absolute top-[38%] left-0 w-full h-[3px] bg-red-400"
            animate={
              hasBeenInView
                ? {
                    x: ["-100%", "100%"],
                  }
                : {}
            }
            transition={{ duration: 0.37, delay: 0.25 }}
          />
          <motion.div
            className="absolute top-[60%] left-0 w-full h-[2px] bg-red-300"
            animate={
              hasBeenInView
                ? {
                    x: ["100%", "-100%"],
                  }
                : {}
            }
            transition={{ duration: 0.27, delay: 0.45 }}
          />
          <motion.div
            className="absolute top-[80%] left-0 w-full h-[4px] bg-red-600"
            animate={
              hasBeenInView
                ? {
                    x: ["-100%", "100%"],
                  }
                : {}
            }
            transition={{ duration: 0.35, delay: 0.65 }}
          />
          <motion.div
            className="absolute top-[50%] left-0 w-full h-[2px] bg-red-400"
            animate={
              hasBeenInView
                ? {
                    x: ["100%", "-100%"],
                  }
                : {}
            }
            transition={{ duration: 0.3, delay: 0.85 }}
          />
        </motion.div>

        {/* Green glitch streaks */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={
            hasBeenInView
              ? {
                  opacity: [0, 0.8, 0, 0.9, 0, 0.6, 0, 0.75, 0],
                }
              : {}
          }
          transition={{
            duration: 0.85,
            times: [0, 0.14, 0.24, 0.34, 0.44, 0.54, 0.64, 0.84, 1],
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute top-[10%] left-0 w-full h-[2px] bg-green-400"
            animate={
              hasBeenInView
                ? {
                    x: ["-100%", "100%"],
                  }
                : {}
            }
            transition={{ duration: 0.31, delay: 0.1 }}
          />
          <motion.div
            className="absolute top-[55%] left-0 w-full h-[3px] bg-green-300"
            animate={
              hasBeenInView
                ? {
                    x: ["100%", "-100%"],
                  }
                : {}
            }
            transition={{ duration: 0.35, delay: 0.3 }}
          />
          <motion.div
            className="absolute top-[75%] left-0 w-full h-[2px] bg-green-500"
            animate={
              hasBeenInView
                ? {
                    x: ["-100%", "100%"],
                  }
                : {}
            }
            transition={{ duration: 0.29, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-[25%] left-0 w-full h-[3px] bg-green-400"
            animate={
              hasBeenInView
                ? {
                    x: ["100%", "-100%"],
                  }
                : {}
            }
            transition={{ duration: 0.33, delay: 0.7 }}
          />
        </motion.div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3"
        >
          <div className="relative w-48 min-h-24 group">
            <Image
              src={project.imgSrc ?? ""}
              alt={project.title}
              fill
              className="rounded-md overflow-hidden border border-white object-cover"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-200 rounded-md pointer-events-none" />

            {/* description that appears on hover */}
            <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
              <p className="text-center text-white text-xs leading-tight pointer-events-none">
                {project.description ?? project.title}
              </p>
            </div>
          </div>
          <div className="mt-2 flex flex-col gap-2 max-w-56 text-center">
            <p className="font-semibold">{project.title}</p>
          </div>
        </a>
      </motion.div>
    </div>
  );
}
