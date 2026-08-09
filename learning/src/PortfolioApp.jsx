import { useCallback, useEffect, useState } from 'react'
import Apple from './Apple.jsx'
import Background from './Background.jsx'
import EncounterTransition from './EncounterTransition.jsx'

function MainPortfolio({ onBack }) {
  useEffect(() => {
    document.body.classList.add('pixel-view')
    return () => document.body.classList.remove('pixel-view')
  }, [])

  return (
    <>
      <button className="back-to-apple" type="button" onClick={onBack}>← Back</button>
      <Background />
    </>
  )
}

function PortfolioApp() {
  const [transitioning, setTransitioning] = useState(false)
  const [view, setView] = useState('apple')
  const finishTransition = useCallback(() => {
    setView('main')
    setTransitioning(false)
  }, [])

  useEffect(() => {
    const appleView = view === 'apple'
    document.title = appleView ? 'Portfolio' : 'Portfolio'
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', appleView ? '#07090d' : '#0b100d')
  }, [view])

  return (
    <>
      {view === 'apple'
        ? <Apple onOpenMain={() => setTransitioning(true)} />
        : <MainPortfolio onBack={() => setView('apple')} />}
      {transitioning && <EncounterTransition onCovered={finishTransition} />}
    </>
  )
}

export default PortfolioApp
