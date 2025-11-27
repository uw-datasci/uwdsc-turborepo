"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Center } from "@react-three/drei";
import { Suspense } from "react";

interface ModelProps {
  modelPath: string;
  scale?: number;
  initialRotation?: [number, number, number];
}

interface Model3DProps {
  modelPath: string;
  scale?: number;
  maxWidth?: string;
  cameraDistance?: number;
  initialRotation?: [number, number, number];
}

function Model({
  modelPath,
  scale = 0.8,
  initialRotation = [0, 0, 0],
}: ModelProps) {
  const { scene } = useGLTF(modelPath);
  const clonedScene = scene.clone(true);

  clonedScene.rotation.set(
    initialRotation[0],
    initialRotation[1],
    initialRotation[2],
  );

  return <primitive object={clonedScene} scale={scale} />;
}

export function WaterCube({
  modelPath,
  scale = 0.8,
  maxWidth = "400px",
  cameraDistance = 12,
  initialRotation = [0, 0, 0],
}: Model3DProps) {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ maxWidth }}
    >
      <div className="w-full h-full aspect-square">
        <Canvas
          camera={{
            position: [0, 0, cameraDistance],
            fov: 35,
            near: 0.1,
            far: 1000,
          }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.3} />

            <Center>
              <Model
                modelPath={modelPath}
                scale={scale}
                initialRotation={initialRotation}
              />
            </Center>

            <Environment preset="sunset" background={false} />

            <OrbitControls
              enableZoom={false}
              enableRotate={true}
              enablePan={false}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
