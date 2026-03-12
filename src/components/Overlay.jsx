import useStore from '../store/useStore'

function Navbar({ scrollProgress }) {
  return (
    <nav
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background:
          scrollProgress > 0.1
            ? 'linear-gradient(180deg, rgba(10,15,13,0.9) 0%, transparent 100%)'
            : 'transparent',
        transition: 'background 0.5s ease',
      }}
    >
      <img
        src="/candela-farms-logo.png"
        alt="Candela Farms"
        style={{
          height: 'clamp(80px, 12vw, 120px)',
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </nav>
  )
}

function HeroContent({ scrollProgress }) {
  const opacity = Math.max(0, 1 - scrollProgress * 4)

  return (
    <div
      style={{
        position: 'absolute',
        top: '20%',
        left: '40px',
        zIndex: 50,
        opacity,
        transform: `translateY(${scrollProgress * 100}px)`,
        transition: 'opacity 0.1s ease',
        pointerEvents: opacity < 0.1 ? 'none' : 'auto',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          fontWeight: 800,
          lineHeight: 0.95,
          color: '#e8f5e9',
          letterSpacing: '-0.04em',
          maxWidth: '600px',
          marginBottom: '16px',
          textShadow: '0 0 60px rgba(74, 222, 128, 0.15)',
        }}
      >
        Candela Farms
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
          fontWeight: 600,
          color: '#4ade80',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          maxWidth: '480px',
        }}
      >
        Experience driven natural farming
      </p>
    </div>
  )
}

function HoverPopup() {
  const hoveredSection = useStore((s) => s.hoveredSection)

  if (!hoveredSection) return null

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        animation: 'fadeInUp 0.3s ease',
      }}
    >
      <div
        style={{
          background: 'rgba(10, 20, 15, 0.92)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: `1px solid ${hoveredSection.color}40`,
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${hoveredSection.color}15`,
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: `${hoveredSection.color}20`,
            border: `2px solid ${hoveredSection.color}60`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: hoveredSection.color,
              boxShadow: `0 0 10px ${hoveredSection.color}`,
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: hoveredSection.color,
              fontFamily: 'var(--font-display)',
              marginBottom: '4px',
            }}
          >
            {hoveredSection.name}
          </div>
          {hoveredSection.subtitle && (
            <div
              style={{
                fontSize: '0.75rem',
                color: 'rgba(167, 196, 181, 0.7)',
                fontFamily: 'var(--font-sans)',
                marginBottom: '8px',
              }}
            >
              {hoveredSection.subtitle}
            </div>
          )}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {hoveredSection.details &&
              Object.entries(hoveredSection.details)
                .slice(0, 4)
                .map(([key, value]) => (
                  <div key={key}>
                    <div
                      style={{
                        fontSize: '0.6rem',
                        color: 'rgba(167, 196, 181, 0.5)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {key}
                    </div>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        color: '#e8f5e9',
                        fontWeight: 500,
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

function ScrollIndicator({ scrollProgress }) {
  const opacity = Math.max(0, 1 - scrollProgress * 6)

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        opacity,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <div
        style={{
          fontSize: '0.65rem',
          color: 'rgba(167, 196, 181, 0.5)',
          letterSpacing: '0.15em',
          fontFamily: 'var(--font-sans)',
        }}
      >
        SCROLL TO EXPLORE
      </div>
      <div
        style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(180deg, rgba(74,222,128,0.5), transparent)',
          animation: 'scrollPulse 2s ease infinite',
        }}
      />
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; height: 30px; }
          50% { opacity: 1; height: 45px; }
        }
      `}</style>
    </div>
  )
}

export default function Overlay() {
  const scrollProgress = useStore((s) => s.scrollProgress)
  const hoveredSection = useStore((s) => s.hoveredSection)

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <div style={{ pointerEvents: 'auto' }}>
        <Navbar scrollProgress={scrollProgress} />
      </div>
      <HeroContent scrollProgress={scrollProgress} />
      {!hoveredSection && <ScrollIndicator scrollProgress={scrollProgress} />}
      {hoveredSection && <HoverPopup />}

      {/* Copyright */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '20px',
          fontSize: '0.6rem',
          color: 'rgba(167, 196, 181, 0.3)',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.05em',
          pointerEvents: 'none',
        }}
      >
      
      </div>
    </div>
  )
}
