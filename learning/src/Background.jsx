import { useState } from 'react'
import './App.css'
import NavigationOverlay from './NavigationOverlay.jsx'
import background from './assets/background.png'
import me from './assets/me.png'
import about from './assets/about.png'
import projects from './assets/projects.png'
import hire_me from './assets/plzhire.png'
import github from './assets/github.png'
import fight from './assets/fight_moves.png'
import resumePdf from './assets/kevinyang.pdf'


function Background() {
  const [hoveredLayer, setHoveredLayer] = useState(null)
  const [showFightMoves, setShowFightMoves] = useState(false)
  const [showResume, setShowResume] = useState(false)

  function layerClass(name) {
    return `scene-layer ${name}${hoveredLayer === name ? ' is-hovered' : ''}`
  }

  function handleAction(action) {
    if (action === 'showFightMoves') {
      setShowFightMoves((isVisible) => !isVisible)
    }

    if (action === 'showResume') {
      setShowResume(true)
    }
  }

  return (
    <main className="portfolio" aria-label="Portfolio home page">
      <h1 className="sr-only">Welcome to My Portfolio</h1>

      <div className="portfolio-scene">
        <img src={background} alt="" className="scene-layer background" />
        <img src={me} alt="" className="scene-layer me" />
        <img src={about} alt="" className={layerClass('about')} />
        <img src={projects} alt="" className={layerClass('projects')} />
        <img src={hire_me} alt="" className={layerClass('hire_me')} />
        <img src={github} alt="" className={layerClass('github')} />
        <img
          src={fight}
          alt="Project fight moves"
          className={`scene-layer fight${showFightMoves ? ' is-visible' : ''}`}
        />
        <button
          type="button"
          className={`move-option discord-cone${showFightMoves ? ' is-visible' : ''}`}
          aria-label="Discord Cone"
          onClick={() => window.open('https://github.com/kyang510/dis-clone', '_blank', 'noopener,noreferrer')}
        />
        <div
          className={`resume-layer${hoveredLayer === 'resume' ? ' is-hovered' : ''}`}
          style={{ backgroundImage: `url(${background})` }}
          aria-hidden="true"
        />

        <NavigationOverlay
          onAreaHover={setHoveredLayer}
          onAction={handleAction}
        />
      </div>

      {showResume && (
        <section
          className="resume-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowResume(false)
          }}
        >
          <div className="resume-viewer">
            <div className="resume-toolbar">
              <h2 id="resume-title">Kevin Yang Resume</h2>
              <div className="resume-actions">
                <a href={resumePdf} download="Kevin-Yang-Resume.pdf">
                  Download
                </a>
                <button type="button" onClick={() => setShowResume(false)}>
                  Close
                </button>
              </div>
            </div>
            <iframe
              src={`${resumePdf}#view=Fit`}
              title="Kevin Yang Resume preview"
            />
          </div>
        </section>
      )}
    </main>
  )
}

export default Background
