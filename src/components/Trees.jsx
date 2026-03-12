import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Tree({ position, scale = 1, color = '#2d7a2d', trunkColor = '#5d4037' }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.z = Math.sin(t * 0.5 + position[0] * 3) * 0.02
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.05, 0.4, 6]} />
        <meshStandardMaterial color={trunkColor} roughness={0.9} />
      </mesh>
      {/* Canopy layers */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color={color} roughness={0.8} flatShading />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshStandardMaterial
          color={new THREE.Color(color).offsetHSL(0.02, 0, 0.05)}
          roughness={0.8}
          flatShading
        />
      </mesh>
    </group>
  )
}

function FruitTree({ position, scale = 1, fruitColor = '#f97316' }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.z = Math.sin(t * 0.4 + position[2] * 2) * 0.015
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 0.5, 6]} />
        <meshStandardMaterial color="#6d4c41" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.6, 0]} castShadow>
        <dodecahedronGeometry args={[0.25, 1]} />
        <meshStandardMaterial color="#388e3c" roughness={0.75} flatShading />
      </mesh>
      {/* Fruits */}
      {[
        [0.12, 0.5, 0.1],
        [-0.1, 0.55, -0.08],
        [0.05, 0.65, 0.12],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshStandardMaterial color={fruitColor} roughness={0.6} />
        </mesh>
      ))}
    </group>
  )
}

export default function Trees() {
  const trees = useMemo(() => {
    const items = []

    const borderPositions = [
      [-8, 0, -6], [-7.2, 0, -5.5], [-6.5, 0, -6.2],
      [-8, 0, -3], [-7.5, 0, -1], [-8.2, 0, 1],
      [-7.8, 0, 3], [-8, 0, 5], [-7, 0, 6],
      [7, 0, -6], [7.5, 0, -4], [8, 0, -2],
      [7.8, 0, 0], [7.5, 0, 2], [8, 0, 4], [7, 0, 6],
      [-5, 0, -7], [-3, 0, -7.2], [-1, 0, -6.8],
      [1, 0, -7], [3, 0, -6.5], [5, 0, -7],
      [-5, 0, 7], [-3, 0, 6.5], [-1, 0, 7],
      [1, 0, 6.8], [3, 0, 7], [5, 0, 6.5],
    ]

    borderPositions.forEach((pos, i) => {
      items.push({
        type: 'tree',
        position: pos,
        scale: 0.8 + Math.random() * 0.5,
        color: `hsl(${120 + Math.random() * 30}, ${50 + Math.random() * 20}%, ${25 + Math.random() * 15}%)`,
      })
    })

    for (let i = 0; i < 6; i++) {
      items.push({
        type: 'fruit',
        position: [
          -3.2 + (i % 3) * 1.2,
          0,
          -3.8 + Math.floor(i / 3) * 1.0,
        ],
        scale: 0.6 + Math.random() * 0.2,
        fruitColor: '#7c3aed',
      })
    }

    for (let i = 0; i < 6; i++) {
      items.push({
        type: 'fruit',
        position: [
          3.5 + (i % 3) * 0.8,
          0,
          -4.5 + Math.floor(i / 3) * 1.2,
        ],
        scale: 0.7 + Math.random() * 0.3,
        fruitColor: '#22c55e',
      })
    }

    for (let i = 0; i < 4; i++) {
      items.push({
        type: 'fruit',
        position: [
          2.0 + (i % 2) * 0.7,
          0,
          -4.0 + Math.floor(i / 2) * 0.7,
        ],
        scale: 0.6 + Math.random() * 0.2,
        fruitColor: '#f97316',
      })
    }

    return items
  }, [])

  return (
    <group>
      {trees.map((tree, i) =>
        tree.type === 'fruit' ? (
          <FruitTree
            key={i}
            position={tree.position}
            scale={tree.scale}
            fruitColor={tree.fruitColor}
          />
        ) : (
          <Tree
            key={i}
            position={tree.position}
            scale={tree.scale}
            color={tree.color}
          />
        )
      )}
    </group>
  )
}
