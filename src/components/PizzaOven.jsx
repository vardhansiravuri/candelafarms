import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../store/useStore'

function Flame({ position }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.scale.y = 0.8 + Math.sin(t * 8) * 0.3
    ref.current.scale.x = 0.8 + Math.cos(t * 6) * 0.15
    ref.current.material.emissiveIntensity = 1.5 + Math.sin(t * 10) * 0.5
  })

  return (
    <mesh ref={ref} position={position}>
      <coneGeometry args={[0.04, 0.12, 6]} />
      <meshStandardMaterial
        color="#ff6b00"
        emissive="#ff4500"
        emissiveIntensity={2}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

export default function PizzaOven({ position, section }) {
  const [hovered, setHovered] = useState(false)
  const setHoveredSection = useStore((s) => s.setHoveredSection)

  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        setHoveredSection(section)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        setHoveredSection(null)
        document.body.style.cursor = 'default'
      }}
    >
      {/* Base slab */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.2, 0.5]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.9} />
      </mesh>

      {/* Oven dome */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.28, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c45a30" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Brick texture bands */}
      {[0.12, 0.2, 0.28].map((y, i) => (
        <mesh key={i} position={[0, 0.22 + y * 0.4, 0]}>
          <torusGeometry args={[0.22 - i * 0.04, 0.01, 8, 24]} />
          <meshStandardMaterial color="#a0522d" roughness={1} />
        </mesh>
      ))}

      {/* Opening */}
      <mesh position={[0.28, 0.28, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 12, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#1a0a00" />
      </mesh>

      {/* Chimney */}
      <mesh position={[-0.05, 0.55, -0.05]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.25, 8]} />
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </mesh>

      {/* Flames */}
      <Flame position={[0.25, 0.28, 0.02]} />
      <Flame position={[0.25, 0.28, -0.02]} />
      <Flame position={[0.23, 0.30, 0]} />

      {/* Pumpkins */}
      {[
        [0.5, 0.08, 0.3],
        [0.6, 0.06, -0.2],
        [0.35, 0.07, 0.4],
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <sphereGeometry args={[0.06 + i * 0.01, 8, 8]} />
          <meshStandardMaterial color="#e67e22" roughness={0.8} />
        </mesh>
      ))}

      {/* Area overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[1.5, 1.0]} />
        <meshBasicMaterial
          color="#dc2626"
          transparent
          opacity={hovered ? 0.25 : 0.08}
        />
      </mesh>

      <pointLight position={[0.3, 0.3, 0]} color="#ff6b00" intensity={1.5} distance={2} />

      <Html position={[0, 0.9, 0]} center distanceFactor={12}>
        <div
          style={{
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(220, 38, 38, 0.5)',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#ef4444',
              fontFamily: 'var(--font-display)',
            }}
          >
            Pizza Oven
          </div>
        </div>
      </Html>
    </group>
  )
}
