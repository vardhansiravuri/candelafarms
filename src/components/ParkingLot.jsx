import { useState } from 'react'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../store/useStore'

function Car({ position, color }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.06, 0]} castShadow>
        <boxGeometry args={[0.18, 0.06, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.1, 0.04, 0.08]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.4} />
      </mesh>
    </group>
  )
}

export default function ParkingLot({ position, section }) {
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
      {/* Parking surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[1.6, 1.0]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.95} />
      </mesh>

      {/* Parking lines */}
      {[-0.3, -0.1, 0.1, 0.3].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.015, 0]}>
          <planeGeometry args={[0.02, 0.5]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
        </mesh>
      ))}

      {/* Cars */}
      <Car position={[-0.2, 0, 0.1]} color="#c62828" />
      <Car position={[0.2, 0, -0.1]} color="#1565c0" />
      <Car position={[0, 0, 0.1]} color="#2e7d32" />

      {/* Overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[1.8, 1.2]} />
        <meshBasicMaterial
          color="#6b7280"
          transparent
          opacity={hovered ? 0.25 : 0.08}
        />
      </mesh>

      <Html position={[0, 0.5, 0]} center distanceFactor={12}>
        <div
          style={{
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(107, 114, 128, 0.5)',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#9ca3af',
              fontFamily: 'var(--font-display)',
            }}
          >
            Parking
          </div>
        </div>
      </Html>
    </group>
  )
}
