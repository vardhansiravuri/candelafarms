import { Suspense, useEffect, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import Scene from './components/Scene'
import Overlay from './components/Overlay'
import LoadingScreen from './components/LoadingScreen'
import useStore from './store/useStore'

// Video: https://youtu.be/tFFGO9H-8rI
const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/tFFGO9H-8rI'

export default function App() {
  const scrollRef = useRef(null)
  const setScrollProgress = useStore((s) => s.setScrollProgress)
  const scrollToSection = useStore((s) => s.scrollToSection)
  const setScrollToSection = useStore((s) => s.setScrollToSection)

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const vh = window.innerHeight
    const landStart = 0 // start with 3D land
    const landHeight = 4 * vh // 400vh of scroll through the 3D land
    const landEnd = landStart + landHeight

    const scrollTop = el.scrollTop
    let progress

    if (scrollTop < landStart) {
      progress = 0
    } else if (scrollTop <= landEnd) {
      progress = (scrollTop - landStart) / landHeight
    } else {
      progress = 1
    }

    setScrollProgress(Math.min(1, Math.max(0, progress)))
  }, [setScrollProgress])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (scrollToSection !== 'land') return
    const id = requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
      }
      setScrollToSection(null)
    })
    return () => cancelAnimationFrame(id)
  }, [scrollToSection, setScrollToSection])

  return (
    <>
      <LoadingScreen />
      <div
        ref={scrollRef}
        style={{
          position: 'fixed',
          inset: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          background: '#0a0f0d',
        }}
      >
        <div style={{ position: 'relative', background: '#0a0f0d' }}>
          {/* 3D farm (main land) — starts immediately, long scroll so camera + overlay animate */}
          <div
            id="the-land"
            style={{
              height: '400vh',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'sticky',
                top: 0,
                width: '100%',
                height: '100vh',
              }}
            >
              <Canvas
                shadows
                dpr={[1, 2]}
                gl={{
                  antialias: true,
                  alpha: false,
                  powerPreference: 'high-performance',
                }}
                style={{ background: '#0a0f0d' }}
              >
                <Suspense fallback={null}>
                <Scene />
                <Preload all />
              </Suspense>
            </Canvas>
            <Overlay />
            </div>
          </div>

          {/* Bridge — compact, less gap before story */}
          <section
            style={{
              minHeight: '45vh',
              width: '100%',
              background: 'linear-gradient(180deg, #0a0f0d 0%, #0a0f0d 30%, #09120e 70%, #08100c 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 24px 40px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#4ade80',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              The story behind the farm
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: '#e8f5e9',
                textAlign: 'center',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                maxWidth: '480px',
              }}
            >
              Discover Candela Farms
            </h2>
          </section>

          {/* Story — visually distinct, not doc-like */}
          <section
            style={{
              minHeight: '100vh',
              background: 'linear-gradient(180deg, #08100c 0%, #08100c 10%, #07100a 50%, #061008 100%)',
              padding: '32px 24px 64px',
              fontFamily: 'var(--font-sans)',
            }}
          >
            <div
              style={{
                maxWidth: '720px',
                margin: '0 auto',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 700,
                  color: '#e8f5e9',
                  marginBottom: '0.5rem',
                }}
              >
                Candela Farms, in depth
              </h2>
              <div
                style={{
                  width: '48px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #4ade80, transparent)',
                  borderRadius: '2px',
                  marginBottom: '2rem',
                }}
              />

              <div
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'rgba(200, 230, 214, 0.92)',
                }}
              >
              <p style={{ marginBottom: '1.25rem' }}>
                Candela Farms is an experience driven natural farming project
                being developed on a 3.5 acre land near Visakhapatnam, India.
                The goal of the farm is not only to grow food but also to create
                a space where people can understand, experience, and reconnect
                with agriculture.
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#4ade80',
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem',
                  marginTop: '2rem',
                }}
              >
                PHILOSOPHY
              </div>
              <p style={{ marginBottom: '1rem' }}>
                The core philosophy of Candela Farms is natural and transparent
                farming. Visitors should be able to see where their food comes
                from, understand how it is grown, and experience the farming
                process directly. The farm is designed as an “experience farm”
                where people can visit occasionally, spend time in nature, and
                learn about agriculture in a simple and practical way.
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#4ade80',
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem',
                  marginTop: '2rem',
                }}
              >
                THE LAYOUT
              </div>
              <p style={{ marginBottom: '1rem' }}>
                The layout of the farm includes several functional areas.
                Mulberry plants will be grown as one of the primary crops, and a
                small stilt hut will be built within the farm area. The stilt hut
                will serve as a relaxation and meeting space where visitors can
                sit, work remotely, or even join online meetings through
                platforms like Zoom or Microsoft Teams while being surrounded by
                the farm environment. Fruit plantations such as Taiwan guava and
                papaya are also planned to provide seasonal produce.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                There are three dedicated areas for vegetable cultivation. Each
                area will use different styles of agricultural plantation so that
                visitors can see and understand multiple methods of growing
                vegetables.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Dairy farming is an important component of the farm. A specific
                section of the land is allocated for growing grass that will be
                used as feed for cows. The dairy activity is intended to be
                small scale but integrated with the farm ecosystem.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Another section of the farm will focus on cold pressed oils,
                where oil producing crops will be processed into natural oils.
                The farm will also include a small fisheries section for fish
                cultivation.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Candela Farms is also designed to include recreational and
                community elements. The plan includes a volleyball court for
                leisure activities and an outdoor pizza oven with a proper
                seating area, creating a space where visitors can enjoy food
                prepared with ingredients sourced from the farm.
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#4ade80',
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem',
                  marginTop: '2rem',
                }}
              >
                THE VISION
              </div>
              <p style={{ marginBottom: '1rem' }}>
                The broader vision behind Candela Farms is to bring
                professionals and technology oriented people closer to
                agriculture. The idea is that engineers, software professionals,
                and other urban workers can spend time on the farm, understand
                farming practices, and develop a deeper connection with food
                production and the land.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                Over time, the farm will continue to evolve into a complete
                agricultural and learning experience where people can visit,
                observe farming practices, participate in activities, and
                appreciate natural food systems. Candela Farms will document and
                share its progress as the project develops step by step.
              </p>
            </div>

            <div
              style={{
                marginTop: '2.5rem',
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: '12px',
                border: '1px solid rgba(74, 222, 128, 0.2)',
              }}
            >
              <iframe
                title="Candela Farms video"
                src={YOUTUBE_EMBED_URL}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
