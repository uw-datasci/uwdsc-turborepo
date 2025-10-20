"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function WormholeWithRings({ partType }: { partType: 'top' | 'middle' | 'bottom' }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Define wormhole geometry based on part type
  const wormholeGeometry = useMemo(() => {
    if (partType === 'top') {
      return {
        height: 30,
        frontRadius: 10,
        backRadius: 30,
        curve: 2.0,
        perspective: 'down',
        frontHeight: 15,
        backHeight: 30
      };
    } else if (partType === 'middle') {
      return {
        height: 25,
        frontRadius: 8,
        backRadius: 7.2,
        curve: 0.2,
        perspective: 'middle'
      };
    } else {
      return {
        height: 20,
        frontRadius: 8,
        backRadius: 40,
        curve: 3.0,
        perspective: 'down',
        frontHeight: 15,
        backHeight: 30
      };
    }
  }, [partType]);
  
  // Function to calculate radius at any Y position
  const getRadiusAtY = (y: number) => {
    const t = y / (wormholeGeometry.height * 0.5);
    
    if (partType === 'top') {
      const depth = (t + 1.0) * 0.5;
      const curvedDepth = Math.pow(depth, wormholeGeometry.curve);
      return (wormholeGeometry.frontRadius || 3) + ((wormholeGeometry.backRadius || 15) - (wormholeGeometry.frontRadius || 3)) * curvedDepth;
    } else if (partType === 'middle') {
      const normalizedT = (t + 1.0) * 0.5;
      const centerCurve = 1.0 - Math.sin(normalizedT * Math.PI);
      const radius = (wormholeGeometry.backRadius || 2.8) + ((wormholeGeometry.frontRadius || 3.2) - (wormholeGeometry.backRadius || 2.8)) * centerCurve;
      return radius;
    } else {
      const depth = (t + 1.0) * 0.5;
      const curvedDepth = Math.pow(depth, wormholeGeometry.curve);
      return (wormholeGeometry.frontRadius || 3) + ((wormholeGeometry.backRadius || 30) - (wormholeGeometry.frontRadius || 3)) * curvedDepth;
    }
  };
  
  // Create wormhole grid lines
  const gridLines = useMemo(() => {
    const lines: THREE.Line[] = [];
    const numLines = 9;
    const segments = 30;
    
    // Vertical lines
    for (let i = 0; i < numLines; i++) {
      const angle = (i / numLines) * Math.PI * 2;
      const points = [];
      
      for (let j = 0; j <= segments; j++) {
        const y = wormholeGeometry.height * 0.5 - (j / segments) * wormholeGeometry.height;
        const radius = getRadiusAtY(y);
        
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        points.push(new THREE.Vector3(x, y, z));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const isDashed = i % 3 === 0;
      
      const material = isDashed 
        ? new THREE.LineDashedMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.4,
            dashSize: 0.5,
            gapSize: 0.3
          })
        : new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.7
          });
      
      const line = new THREE.Line(geometry, material);
      if (isDashed) {
        line.computeLineDistances();
      }
      
      lines.push(line);
    }
    
    return lines;
  }, [partType, wormholeGeometry]);
  
  // Create moving rings that follow wormhole shape
  const rings = useMemo(() => {
    const ringArray: THREE.Line[] = [];
    const numRings = 5;
    
    for (let i = 0; i < numRings; i++) {
      // Create ring as a perfect circle - let the group rotation handle the perspective
      const points = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        const x = Math.cos(angle);
        const y = 0;
        const z = Math.sin(angle);
        points.push(new THREE.Vector3(x, y, z));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        linewidth: 1
      });
      
      const ring = new THREE.Line(geometry, material);
      ringArray.push(ring);
    }
    
    return ringArray;
  }, []);
  
  // Animate the rings to follow wormhole shape
  useFrame((state) => {
    rings.forEach((ring, index) => {
      const speed = 0.02;
      const offset = (index / rings.length) * wormholeGeometry.height;
      
      let animatedY;
      if (partType === 'bottom') {
        animatedY = -(wormholeGeometry.height * 0.5) + ((state.clock.elapsedTime * speed * wormholeGeometry.height + offset) % wormholeGeometry.height);
      } else {
        animatedY = (wormholeGeometry.height * 0.5) - ((state.clock.elapsedTime * speed * wormholeGeometry.height + offset) % wormholeGeometry.height);
      }
      
      // Only show rings within the wormhole bounds to prevent deformation
      const halfHeight = wormholeGeometry.height * 0.5;
      if (Math.abs(animatedY) > halfHeight) {
        ring.visible = false;
        return;
      }
      
      ring.visible = true;
      
      // Get radius at this Y position to match wormhole shape
      const radius = getRadiusAtY(animatedY);
      
      // Position ring
      ring.position.y = animatedY;
      
      // Scale ring to match wormhole radius while preserving elliptical shape
      ring.scale.setScalar(radius);
      
      // Smooth fade at edges instead of abrupt opacity changes
      const edgeDistance = Math.abs(animatedY) / halfHeight;
      const fadeZone = 0.1;
      let opacity = 0.9;
      
      if (edgeDistance > (1.0 - fadeZone)) {
        const fadeProgress = (edgeDistance - (1.0 - fadeZone)) / fadeZone;
        opacity = 0.9 * (1.0 - fadeProgress);
      }
      
      (ring.material as THREE.LineBasicMaterial).opacity = Math.max(opacity, 0);
    });
  });
  
  return (
    <group ref={groupRef} rotation={partType === 'top' ? [Math.PI * 0.15, 0, 0] : partType === 'bottom' ? [-Math.PI * 0.15, 0, Math.PI] : [0, 0, 0]}>
      {/* Wormhole grid structure */}
      {gridLines.map((line, index) => (
        <primitive key={`line-${index}`} object={line} />
      ))}
      
      {/* Moving rings */}
      {rings.map((ring, index) => (
        <primitive key={`ring-${index}`} object={ring} />
      ))}
    </group>
  );
}

export function WormholeTop() {
  return (
    <div className="absolute inset-x-0 top-0 h-screen -z-10 overflow-hidden">
      <Canvas
        camera={{ 
          position: [0, -0.8, 35],
          fov: 75
        }}
        style={{ background: 'black' }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, -20);
        }}
      >
        <WormholeWithRings partType="top" />
      </Canvas>
    </div>
  );
}

export function WormholeMiddle() {
  return (
    <div className="absolute inset-x-0 top-0 h-screen -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: 'black' }}
      >
        <WormholeWithRings partType="middle" />
      </Canvas>
    </div>
  );
}

export function WormholeBottom() {
  return (
    <div className="absolute inset-x-0 top-0 h-screen -z-10 overflow-hidden">
      <Canvas
        camera={{ 
          position: [0, -2, -30], 
          fov: 75
        }}
        style={{ background: 'black' }}
        onCreated={({ camera }) => {
          camera.lookAt(0, 0, -20);
        }}
      >
        <WormholeWithRings partType="bottom" />
      </Canvas>
    </div>
  );
}