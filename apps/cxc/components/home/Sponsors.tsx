"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShimmerButton } from "@uwdsc/ui/index";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import type { Sponsor } from "../../types/home";
import { useIsMobile } from "../../hooks/useIsMobile";
import {
  PLATINUM_SPONSORS,
  BRONZE_SPONSORS,
  PARTNERS,
} from "../../constants/home";

// Floating cubes component
function FloatingCubes() {
  const groupRef = useRef<THREE.Group>(null);
  const isMobile = useIsMobile();

  const cubes = useMemo(() => {
    const cubeArray: THREE.Mesh[] = [];
    const cols = isMobile ? 4 : 6;
    const rows = isMobile ? 6 : 4;
    const cubeSize = isMobile ? 0.9 : 1.25;

    const spreadX = isMobile ? 16 : 30;
    const spreadY = isMobile ? 30 : 24;
    const cellWidth = spreadX / cols;
    const cellHeight = spreadY / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.25,
          wireframe: true,
        });

        const cube = new THREE.Mesh(geometry, material);

        // Calculate base position for this cell
        const baseCellX = -spreadX / 2 + col * cellWidth + cellWidth / 2;
        const baseCellY = -spreadY / 2 + row * cellHeight + cellHeight / 2;

        // Add random jitter within the cell (max 40% of cell size to prevent overlap)
        const jitterX = (Math.random() - 0.5) * cellWidth * 0.4;
        const jitterY = (Math.random() - 0.5) * cellHeight * 0.4;

        cube.userData = {
          initialX: baseCellX + jitterX,
          initialY: baseCellY + jitterY,
          initialZ: -10 + Math.random() * -8,
          speed: 0.3 + Math.random() * 0.5,
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02,
          },
        };

        cube.position.set(
          cube.userData.initialX,
          cube.userData.initialY,
          cube.userData.initialZ,
        );

        cubeArray.push(cube);
      }
    }
    return cubeArray;
  }, [isMobile]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    cubes.forEach((cube) => {
      // Float up and down
      cube.position.y =
        cube.userData.initialY + Math.sin(time * cube.userData.speed) * 2;

      // Rotate
      cube.rotation.x += cube.userData.rotationSpeed.x;
      cube.rotation.y += cube.userData.rotationSpeed.y;
      cube.rotation.z += cube.userData.rotationSpeed.z;
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, index) => (
        // eslint-disable-next-line react/no-unknown-property
        <primitive key={index} object={cube} />
      ))}
    </group>
  );
}

function SponsorSection({
  title,
  sponsors,
  isPartners,
  tier,
}: {
  title: string;
  sponsors: Sponsor[];
  isPartners?: boolean;
  tier?: "platinum" | "bronze" | "partner";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  const getTitleStyle = () => {
    switch (tier) {
      case "platinum":
        return "bg-gradient-to-r from-slate-300 via-gray-100 to-slate-400 bg-clip-text text-transparent";
      case "bronze":
        return "bg-gradient-to-r from-yellow-800 via-amber-700 to-yellow-900 bg-clip-text text-transparent";
      case "partner":
        return "";
      default:
        return "";
    }
  };

  return (
    <div ref={ref} className="mb-16 flex flex-col items-center">
      <motion.h3
        className={`text-3xl md:text-4xl font-bold mb-8 text-center ${getTitleStyle()}`}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={
          inView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 20, scale: 0.9 }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {title}
      </motion.h3>
      <div className="flex flex-wrap justify-center gap-10 w-full max-w-5xl">
        {sponsors.map((sponsor, index) => {
          const imageContent = (
            <motion.div
              className="inline-block leading-none"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                className={`block ${isPartners ? "h-26" : "h-24"} w-auto object-contain`}
              />
            </motion.div>
          );

          return sponsor.link ? (
            <a
              key={sponsor.name}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform duration-300 inline-block leading-none"
            >
              {imageContent}
            </a>
          ) : (
            <div key={sponsor.name} className="inline-block leading-none">
              {imageContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Sponsors() {
  const isMobile = useIsMobile();

  return (
    <section className="relative text-white py-20 overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{
            position: [0, 0, isMobile ? 12 : 15],
            fov: isMobile ? 60 : 50,
          }}
        >
          <FloatingCubes />
        </Canvas>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold mb-16 text-center">
          Our Sponsors
        </h2>

        {/* Sponsor Sections */}
        <div className="space-y-16">
          {PLATINUM_SPONSORS.length > 0 && (
            <SponsorSection
              title="Platinum Sponsor"
              sponsors={PLATINUM_SPONSORS}
              tier="platinum"
            />
          )}
          {BRONZE_SPONSORS.length > 0 && (
            <SponsorSection
              title="Bronze Sponsors"
              sponsors={BRONZE_SPONSORS}
              tier="bronze"
            />
          )}
          {PARTNERS.length > 0 && (
            <SponsorSection
              title="Partners"
              sponsors={PARTNERS}
              isPartners
              tier="partner"
            />
          )}
        </div>

        {/* Contact CTA */}
        <div className="flex flex-col items-center gap-6 mt-20">
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto text-center">
            Interested in sponsoring CXC? Click the button to get in touch.
          </p>

          <ShimmerButton
            className="shadow-sm shadow-white/30"
            onClick={() =>
              (window.location.href = "mailto:outreach@uwdatascience.ca")
            }
            shimmerSize="1.5px"
            aria-label="Email outreach to become a sponsor"
          >
            <span className="text-center text-base font-medium tracking-tight text-white md:text-xl">
              Become a Sponsor
            </span>
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
