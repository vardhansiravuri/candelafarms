import { useEffect, useState } from 'react'
import useStore from '../store/useStore'

export default function LoadingScreen() {
  const isLoaded = useStore((s) => s.isLoaded)
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + Math.random() * 15
      })
    }, 200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (isLoaded && progress >= 90) {
      setProgress(100)
      const timer = setTimeout(() => setVisible(false), 800)
      return () => clearTimeout(timer)
    }
  }, [isLoaded, progress])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0a0f0d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.8s ease',
        opacity: progress >= 100 && isLoaded ? 0 : 1,
        pointerEvents: progress >= 100 && isLoaded ? 'none' : 'all',
      }}
    >
      <img
        src="/candela-farms-logo.png"
        alt="Candela Farms"
        style={{
          height: '200px',
          width: 'auto',
          objectFit: 'contain',
          marginBottom: '1.5rem',
        }}
      />
      <div
        style={{
          width: '200px',
          height: '2px',
          background: 'rgba(74, 222, 128, 0.15)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${Math.min(100, progress)}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #4ade80, #22c55e)',
            borderRadius: '1px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  )
}
