import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../store/useStore'

function WaterSurface({ position, radius }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.material.opacity = 0.5 + Math.sin(t * 2 + position[0]) * 0.1
  })

  return (
    <mesh ref={ref} position={[position[0], position[1] + 0.18, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[radius - 0.02, 24]} />
      <meshStandardMaterial
        color="#1e88e5"
        transparent
        opacity={0.5}
        roughness={0.1}
        metalness={0.3}
      />
    </mesh>
  )
}

export default function FishTanks({ position, section }) {
  const [hovered, setHovered] = useState(false)
  const setHoveredSection = useStore((s) => s.setHoveredSection)

  const tanks = [
    { pos: [-0.4, 0, -0.3], r: 0.25 },
    { pos: [0.3, 0, -0.3], r: 0.25 },
    { pos: [-0.4, 0, 0.3], r: 0.2 },
    { pos: [0.3, 0, 0.3], r: 0.2 },
  ]

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
      {tanks.map((tank, i) => (
        <group key={i}>
          {/* Tank wall */}
          <mesh position={[tank.pos[0], 0.1, tank.pos[2]]} castShadow>
            <cylinderGeometry args={[tank.r, tank.r, 0.2, 24, 1, true]} />
            <meshStandardMaterial
              color="#78909c"
              roughness={0.5}
              metalness={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Tank rim */}
          <mesh position={[tank.pos[0], 0.2, tank.pos[2]]}>
            <torusGeometry args={[tank.r, 0.015, 8, 24]} />
            <meshStandardMaterial color="#90a4ae" metalness={0.6} roughness={0.3} />
          </mesh>
          <WaterSurface position={tank.pos} radius={tank.r} />
        </group>
      ))}

      {/* Area overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[1.8, 1.5]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={hovered ? 0.25 : 0.08}
        />
      </mesh>

      <Html position={[0, 0.8, 0]} center distanceFactor={12}>
        <div
          style={{
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(59, 130, 246, 0.5)',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#60a5fa',
              fontFamily: 'var(--font-display)',
            }}
          >
            Fisheries
          </div>
        </div>
      </Html>
    </group>
  )
}
