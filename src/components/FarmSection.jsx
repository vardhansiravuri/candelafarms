import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../store/useStore'

function CropRows({ size, color, type }) {
  const rows = useMemo(() => {
    const items = []
    const [w, h] = size
    const spacing = type === 'crop' ? 0.25 : 0.4
    const rowCount = Math.floor(h / spacing)

    for (let i = 0; i < rowCount; i++) {
      const z = -h / 2 + spacing * i + spacing / 2
      items.push(
        <mesh key={i} position={[0, 0.02, z]} castShadow>
          <boxGeometry args={[w * 0.85, 0.06, 0.08]} />
          <meshStandardMaterial
            color={new THREE.Color(color).offsetHSL(0, -0.1, (i % 2) * 0.05 - 0.1)}
            roughness={0.8}
          />
        </mesh>
      )
    }
    return items
  }, [size, color, type])

  return <group>{rows}</group>
}

function VegetableAssets({ size }) {
  const [w, h] = size
  const items = []

  // Simple vegetable markers inside vegetable sections
  const cols = 4
  const rows = 3
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = -w / 2 + (w / (cols + 1)) * (i + 1)
      const z = -h / 2 + (h / (rows + 1)) * (j + 1)
      items.push(
        <mesh key={`${i}-${j}`} position={[x, 0.06, z]} castShadow>
          <cylinderGeometry args={[0.05, 0.08, 0.18, 6]} />
          <meshStandardMaterial color="#16a34a" roughness={0.7} />
        </mesh>
      )
    }
  }

  return <group>{items}</group>
}

export default function FarmSection({ section }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)
  const setHoveredSection = useStore((s) => s.setHoveredSection)
  const scrollProgress = useStore((s) => s.scrollProgress)

  const color = new THREE.Color(section.color)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const pulse = 0.3 + Math.sin(t * 2 + section.position[0]) * 0.1
    meshRef.current.material.opacity = hovered ? 0.55 : pulse

    if (glowRef.current) {
      glowRef.current.material.opacity = hovered ? 0.3 : 0.05
      glowRef.current.scale.setScalar(hovered ? 1.08 : 1)
    }
  })

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    setHoveredSection(section)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    setHoveredSection(null)
    document.body.style.cursor = 'default'
  }

  return (
    <group position={section.position}>
      {/* Glow layer */}
      <mesh
        ref={glowRef}
        rotation={[-Math.PI / 2, 0, section.rotation || 0]}
        position={[0, 0.005, 0]}
      >
        <planeGeometry args={[section.size[0] + 0.3, section.size[1] + 0.3]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Main overlay */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, section.rotation || 0]}
        position={[0, 0.01, 0]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry args={section.size} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Border */}
      <lineSegments position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <edgesGeometry
          args={[new THREE.PlaneGeometry(section.size[0], section.size[1])]}
        />
        <lineBasicMaterial
          color={hovered ? '#ffffff' : section.color}
          linewidth={1}
          transparent
          opacity={hovered ? 1 : 0.6}
        />
      </lineSegments>

      {/* Crop rows */}
      {section.type === 'crop' && (
        <CropRows size={section.size} color={section.color} type={section.type} />
      )}

      {/* Extra vegetable assets for vegetable sections */}
      {section.name === 'Vegetables' && <VegetableAssets size={section.size} />}

      {/* Label */}
      <Html
        position={[0, 0.5, 0]}
        center
        distanceFactor={12}
        style={{
          pointerEvents: 'none',
          transition: 'all 0.3s ease',
          opacity: scrollProgress > 0.2 ? 1 : 0.7,
        }}
      >
        <div
          style={{
            background: hovered
              ? 'rgba(0,0,0,0.85)'
              : 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            padding: hovered ? '10px 16px' : '6px 12px',
            borderRadius: '8px',
            border: `1px solid ${hovered ? section.color : 'rgba(255,255,255,0.15)'}`,
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease',
            boxShadow: hovered
              ? `0 0 20px ${section.color}40`
              : 'none',
          }}
        >
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: section.color,
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.02em',
            }}
          >
            {section.name}
          </div>
          {section.subtitle && (
            <div
              style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.6)',
                marginTop: '2px',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {section.subtitle}
            </div>
          )}
        </div>
      </Html>
    </group>
  )
}
