import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import Ground from './Ground'
import Cows from './Cows'
import FarmSection from './FarmSection'
import VolleyballCourt from './VolleyballCourt'
import PizzaOven from './PizzaOven'
import Barn from './Barn'
import FishTanks from './FishTanks'
import ParkingLot from './ParkingLot'
import Trees from './Trees'
import FloatingParticles from './FloatingParticles'
import { FARM_SECTIONS } from '../data/farmSections'
import useStore from '../store/useStore'

function CameraController() {
  const { camera } = useThree()
  const scrollProgress = useStore((s) => s.scrollProgress)
  const targetPos = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())

  useFrame((_, delta) => {
    const t = scrollProgress

    const heroPos = new THREE.Vector3(8, 7, 10)
    const heroLook = new THREE.Vector3(0, 0, 0)

    const midPos = new THREE.Vector3(4, 12, 5)
    const midLook = new THREE.Vector3(0, -0.5, 0)

    const topPos = new THREE.Vector3(0, 16, 0.1)
    const topLook = new THREE.Vector3(0, 0, 0)

    if (t < 0.5) {
      const p = t / 0.5
      const ease = p * p * (3 - 2 * p)
      targetPos.current.lerpVectors(heroPos, midPos, ease)
      targetLookAt.current.lerpVectors(heroLook, midLook, ease)
    } else {
      const p = (t - 0.5) / 0.5
      const ease = p * p * (3 - 2 * p)
      targetPos.current.lerpVectors(midPos, topPos, ease)
      targetLookAt.current.lerpVectors(midLook, topLook, ease)
    }

    camera.position.lerp(targetPos.current, 1 - Math.exp(-6 * delta))
    const currentLookAt = new THREE.Vector3()
    camera.getWorldDirection(currentLookAt)
    currentLookAt.multiplyScalar(10).add(camera.position)
    currentLookAt.lerp(targetLookAt.current, 1 - Math.exp(-6 * delta))
    camera.lookAt(targetLookAt.current)
  })

  useEffect(() => {
    camera.position.set(8, 7, 10)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return null
}

export default function Scene() {
  const setIsLoaded = useStore((s) => s.setIsLoaded)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500)
    return () => clearTimeout(timer)
  }, [setIsLoaded])

  const cropSections = FARM_SECTIONS.filter(
    (s) =>
      s.id !== 'volleyball' &&
      s.id !== 'pizza-oven' &&
      s.id !== 'fisheries' &&
      s.id !== 'parking' &&
      s.id !== 'grass'
  )

  return (
    <>
      <CameraController />

      <ambientLight intensity={0.4} color="#c8e6c9" />
      <directionalLight
        position={[10, 15, 8]}
        intensity={1.8}
        color="#fff8e1"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.001}
      />
      <directionalLight position={[-5, 8, -5]} intensity={0.3} color="#b3e5fc" />
      <hemisphereLight args={['#ffecd2', '#4a6741', 0.5]} />

      <fog attach="fog" args={['#1a2e1a', 15, 35]} />

      <Ground />

      {cropSections.map((section) => (
        <FarmSection key={section.id} section={section} />
      ))}

      <FarmSection section={FARM_SECTIONS.find((s) => s.id === 'grass')} />

      <VolleyballCourt
        position={FARM_SECTIONS.find((s) => s.id === 'volleyball').position}
        section={FARM_SECTIONS.find((s) => s.id === 'volleyball')}
      />
      <PizzaOven
        position={FARM_SECTIONS.find((s) => s.id === 'pizza-oven').position}
        section={FARM_SECTIONS.find((s) => s.id === 'pizza-oven')}
      />
      {/* Barn placed near the dairy farming hub to match the layout */}
      <Barn position={[0, 0, 2.8]} />
      <FishTanks
        position={FARM_SECTIONS.find((s) => s.id === 'fisheries').position}
        section={FARM_SECTIONS.find((s) => s.id === 'fisheries')}
      />
      <ParkingLot
        position={FARM_SECTIONS.find((s) => s.id === 'parking').position}
        section={FARM_SECTIONS.find((s) => s.id === 'parking')}
      />

      <Cows />

      <Trees />
      <FloatingParticles />
    </>
  )
}
