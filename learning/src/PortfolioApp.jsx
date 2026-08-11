import { useCallback, useEffect, useRef, useState } from 'react'
import Apple from './Apple.jsx'
import Background from './Background.jsx'
import EncounterTransition from './EncounterTransition.jsx'
import pokemonMusic from './assets/Pokémon.mp3'

function MainPortfolio({ onBack, onVolumeChange, volume }) {
  useEffect(() => {
    document.body.classList.add('pixel-view')
    return () => document.body.classList.remove('pixel-view')
  }, [])

  return (
    <>
      <div className="portfolio-controls">
        <button className="back-to-apple" type="button" onClick={onBack}>← Back</button>
        <label className="volume-control">
          <span>Volume</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            aria-label="Music volume"
            onChange={(event) => onVolumeChange(Number(event.target.value))}
          />
        </label>
      </div>
      <Background />
    </>
  )
}

function PortfolioApp() {
  const musicRef = useRef(null)
  const [transitioning, setTransitioning] = useState(false)
  const [volume, setVolume] = useState(.1)
  const [view, setView] = useState('apple')
  const finishTransition = useCallback(() => {
    setView('main')
    setTransitioning(false)
  }, [])

  useEffect(() => {
    const appleView = view === 'apple'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', appleView ? '#07090d' : '#0b100d')
  }, [view])

  function openMain() {
    musicRef.current.volume = .05
    musicRef.current.play().catch(() => {})
    setTransitioning(true)
  }

  function backToApple() {
    musicRef.current.pause()
    musicRef.current.currentTime = 0
    setView('apple')
  }

  function changeVolume(nextVolume) {
    musicRef.current.volume = nextVolume
    setVolume(nextVolume)
  }

  return (
    <>
      {view === 'apple'
        ? <Apple onOpenMain={openMain} />
        : <MainPortfolio
            volume={volume}
            onBack={backToApple}
            onVolumeChange={changeVolume}
          />}
      {transitioning && <EncounterTransition onCovered={finishTransition} />}
      <audio
        ref={musicRef}
        src={pokemonMusic}
        autoPlay={transitioning || view === 'main'}
        loop
        playsInline
        preload="auto"
      />
    </>
  )
}

export default PortfolioApp
