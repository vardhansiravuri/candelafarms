import { useMemo } from 'react'
import * as THREE from 'three'

function CowBody({ color = '#ffffff', spotColor = '#111111' }) {
  const spots = useMemo(
    () => [
      [-0.15, 0.18, 0.18],
      [0.05, 0.16, -0.16],
      [0.18, 0.2, 0],
    ],
    []
  )

  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.7, 0.35, 0.25]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>

      {/* Head */}
      <mesh position={[0.42, 0.26, 0]} castShadow>
        <boxGeometry args={[0.26, 0.24, 0.22]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>

      {/* Nose / muzzle */}
      <mesh position={[0.6, 0.22, 0]} castShadow>
        <boxGeometry args={[0.16, 0.16, 0.2]} />
        <meshStandardMaterial color="#f5a3a3" roughness={0.9} />
      </mesh>

      {/* Ears */}
      {[-1, 1].map((dir) => (
        <mesh key={dir} position={[0.45, 0.34, 0.14 * dir]} castShadow>
          <boxGeometry args={[0.08, 0.06, 0.04]} />
          <meshStandardMaterial color={spotColor} roughness={0.8} />
        </mesh>
      ))}

      {/* Horns */}
      {[-1, 1].map((dir) => (
        <mesh key={dir} position={[0.52, 0.34, 0.07 * dir]} castShadow>
          <cylinderGeometry args={[0.015, 0.02, 0.08, 6]} />
          <meshStandardMaterial color="#f5deb3" roughness={0.6} />
        </mesh>
      ))}

      {/* Legs */}
      {[
        [-0.22, 0.05, 0.09],
        [-0.22, 0.05, -0.09],
        [0.18, 0.05, 0.09],
        [0.18, 0.05, -0.09],
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.08, 0.18, 0.08]} />
          <meshStandardMaterial color={color} roughness={0.9} />
        </mesh>
      ))}

      {/* Hooves */}
      {[
        [-0.22, -0.02, 0.09],
        [-0.22, -0.02, -0.09],
        [0.18, -0.02, 0.09],
        [0.18, -0.02, -0.09],
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.08, 0.05, 0.08]} />
          <meshStandardMaterial color="#333333" roughness={0.6} metalness={0.1} />
        </mesh>
      ))}

      {/* Udder */}
      <mesh position={[0.05, 0.05, -0.03]} castShadow>
        <boxGeometry args={[0.16, 0.08, 0.14]} />
        <meshStandardMaterial color="#ffb6c1" roughness={1} />
      </mesh>

      {/* Tail */}
      <mesh position={[-0.37, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.02, 0.28, 6]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>

      {/* Spots */}
      {spots.map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.22, 0.18, 0.08]} />
          <meshStandardMaterial color={spotColor} roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

export default function Cows() {
  // Grass (For Cow Feed) section center — the middle open space for cows
  const basePosition = [-3.9, 0.06, 4.3]
  // Papaya block runs northeast–southwest; align cow row the same way
  const parallelToPapaya = -Math.PI / 4

  return (
    <group position={basePosition} rotation={[0, parallelToPapaya, 0]}>
      {/* Front isometric view */}
      <group position={[-0.7, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        <CowBody />
      </group>

      {/* Side profile view */}
      <group position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <CowBody />
      </group>

      {/* Rear isometric view */}
      <group position={[0.7, 0, 0]} rotation={[0, (5 * Math.PI) / 4, 0]}>
        <CowBody />
      </group>
    </group>
  )
}

