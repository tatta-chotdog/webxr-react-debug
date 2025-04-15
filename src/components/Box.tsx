import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useBoxStore } from "../stores/boxStore";

export function Box() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { color, rotationSpeed, scale } = useBoxStore();

  useFrame((_, delta) => {
    meshRef.current!.rotation.x += delta * rotationSpeed;
    meshRef.current!.rotation.y += delta * rotationSpeed;
  });

  return (
    <mesh ref={meshRef} scale={scale} position={[0, 1.5, -1]}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}
