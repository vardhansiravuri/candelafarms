import { useRef } from 'react'
import * as THREE from 'three'

export default function Barn({ position }) {
  return (
    <group position={position}>
      {/* Main structure */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.0, 0.9]} />
        <meshStandardMaterial color="#8b2500" roughness={0.85} />
      </mesh>

      {/* White trim lines */}
      {[-0.35, 0, 0.35].map((z, i) => (
        <mesh key={i} position={[0, 0.5, z]} castShadow>
          <boxGeometry args={[1.22, 0.03, 0.02]} />
          <meshStandardMaterial color="#f5f5dc" />
        </mesh>
      ))}

      {/* Roof */}
      <mesh position={[0, 1.15, 0]} castShadow rotation={[0, 0, 0]}>
        <coneGeometry args={[0.85, 0.5, 4]} />
        <meshStandardMaterial color="#5a1a00" roughness={0.9} />
      </mesh>

      {/* Barn doors */}
      <mesh position={[0.601, 0.35, 0]}>
        <boxGeometry args={[0.02, 0.5, 0.35]} />
        <meshStandardMaterial color="#f5f5dc" />
      </mesh>
      <mesh position={[0.601, 0.35, -0.1]}>
        <boxGeometry args={[0.02, 0.5, 0.02]} />
        <meshStandardMaterial color="#d4c5a0" />
      </mesh>
      <mesh position={[0.601, 0.35, 0.1]}>
        <boxGeometry args={[0.02, 0.5, 0.02]} />
        <meshStandardMaterial color="#d4c5a0" />
      </mesh>

      {/* Window */}
      <mesh position={[0.602, 0.7, 0.25]}>
        <planeGeometry args={[0.15, 0.15]} />
        <meshStandardMaterial
          color="#ffeead"
          emissive="#ffa000"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Silo */}
      <mesh position={[-0.8, 0.6, 0.2]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 1.2, 12]} />
        <meshStandardMaterial color="#9e9e9e" roughness={0.7} metalness={0.3} />
      </mesh>
      <mesh position={[-0.8, 1.25, 0.2]} castShadow>
        <coneGeometry args={[0.2, 0.2, 12]} />
        <meshStandardMaterial color="#757575" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Tractor */}
      <group position={[0.8, 0, 0.5]}>
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.25, 0.15, 0.15]} />
          <meshStandardMaterial color="#e65100" roughness={0.7} />
        </mesh>
        <mesh position={[-0.1, 0.22, 0]} castShadow>
          <boxGeometry args={[0.12, 0.1, 0.13]} />
          <meshStandardMaterial color="#e65100" roughness={0.7} />
        </mesh>
        {/* Wheels */}
        {[
          [0.1, 0.06, 0.09],
          [0.1, 0.06, -0.09],
          [-0.1, 0.05, 0.08],
          [-0.1, 0.05, -0.08],
        ].map((pos, i) => (
          <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[i < 2 ? 0.06 : 0.045, i < 2 ? 0.06 : 0.045, 0.03, 12]} />
            <meshStandardMaterial color="#333" roughness={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
