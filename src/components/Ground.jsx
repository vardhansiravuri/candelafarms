import { useRef } from 'react'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Ground() {
  const meshRef = useRef()

  return (
    <group>
      {/* Main ground */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 16]} />
        <meshStandardMaterial
          color="#2d5a27"
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* Extended terrain border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#1a3a15" roughness={1} />
      </mesh>
    </group>
  )
}
