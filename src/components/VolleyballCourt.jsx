import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../store/useStore'

function Net({ position }) {
  return (
    <group position={position}>
      {/* Posts */}
      <mesh position={[-1.2, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.2, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 1, 8]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Net */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2.4, 0.35, 0.02]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
      {/* Top rope */}
      <mesh position={[0, 0.88, 0]}>
        <boxGeometry args={[2.5, 0.02, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

export default function VolleyballCourt({ position, section }) {
  const groupRef = useRef()
  const vRef = useRef()
  const [hovered, setHovered] = useState(false)
  const setHoveredSection = useStore((s) => s.setHoveredSection)

  useFrame((state) => {
    if (!vRef.current) return
    const t = state.clock.elapsedTime
    vRef.current.material.emissiveIntensity = 0.8 + Math.sin(t * 3) * 0.4
    vRef.current.position.y = 0.6 + Math.sin(t * 1.5) * 0.05
  })

  return (
    <group
      ref={groupRef}
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
      {/* Sand surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[2.8, 2.0]} />
        <meshStandardMaterial color="#e8c170" roughness={1} />
      </mesh>

      {/* Court lines */}
      {[
        { pos: [0, 0.025, -0.95], size: [2.6, 0.03] },
        { pos: [0, 0.025, 0.95], size: [2.6, 0.03] },
        { pos: [-1.3, 0.025, 0], size: [0.03, 1.9] },
        { pos: [1.3, 0.025, 0], size: [0.03, 1.9] },
      ].map((line, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={line.pos}>
          <planeGeometry args={line.size} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      <Net position={[0, 0, 0]} />

      {/* Glowing V */}
      <mesh ref={vRef} position={[0, 0.6, 0]} castShadow>
        <torusGeometry args={[0.25, 0.06, 8, 6, Math.PI]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={1}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Court border glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[3.0, 2.2]} />
        <meshBasicMaterial
          color={hovered ? '#ef4444' : '#ef444480'}
          transparent
          opacity={hovered ? 0.3 : 0.1}
        />
      </mesh>

      <Html position={[0, 1.5, 0]} center distanceFactor={12}>
        <div
          style={{
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            whiteSpace: 'nowrap',
          }}
        >
          <div
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#ef4444',
              fontFamily: 'var(--font-display)',
            }}
          >
            Volleyball Court
          </div>
        </div>
      </Html>

      {/* Point light for court glow */}
      <pointLight
        position={[0, 1.5, 0]}
        color="#f97316"
        intensity={hovered ? 2 : 0.5}
        distance={4}
      />
    </group>
  )
}
