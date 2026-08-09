import { useState } from 'react'
import './App.css'
import NavigationOverlay from './NavigationOverlay.jsx'
import Modal from './Modal.jsx'
import background from './assets/background.png'
import me from './assets/me.png'
import about from './assets/about.png'
import projects from './assets/projects.png'
import hire_me from './assets/plzhire.png'
import github from './assets/github.png'
import fight from './assets/fight_moves.png'
import resumePdf from './assets/kevinyang.pdf'
import HobbiesLayout from './HobbiesLayout.jsx'
import ContactDialog from './ContactDialog.jsx'

function Background() {
  const [hoveredLayer, setHoveredLayer] = useState(null)
  const [showFightMoves, setShowFightMoves] = useState(false)
  const [activeDialog, setActiveDialog] = useState(null)

  function layerClass(name) {
    return `scene-layer ${name}${hoveredLayer === name ? ' is-hovered' : ''}`
  }

  return (
    <main className="portfolio" aria-label="Portfolio home page">

      <div className={`portfolio-scene${activeDialog === 'about' ? ' about-is-open' : ''}`}>
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
          className={`move-option${showFightMoves ? ' is-visible' : ''}`}
          aria-label="select-move"
          onClick={() => window.open('https://github.com/kyang510/dis-clone', '_blank', 'noopener,noreferrer')}
        />
        <div
          className={`resume-layer${hoveredLayer === 'resume' ? ' is-hovered' : ''}`}
          style={{ '--resume-image': `url(${background})` }}
          aria-hidden="true"
        />

        <NavigationOverlay
          onAreaHover={setHoveredLayer}
          onToggleFightMoves={() => setShowFightMoves((isVisible) => !isVisible)}
          onOpenDialog={setActiveDialog}
        />
      </div>

      {activeDialog === 'about' && <HobbiesLayout onClose={() => setActiveDialog(null)} />}

      {activeDialog === 'contact' && <ContactDialog onClose={() => setActiveDialog(null)} />}

      {activeDialog === 'resume' && (
        <Modal
          className="resume-modal"
          aria-labelledby="resume-title"
          onClose={() => setActiveDialog(null)}
        >
          <div className="resume-viewer">
            <div className="resume-toolbar">
              <h2 id="resume-title">Kevin Yang Resume</h2>
              <div className="resume-actions">
                <a href={resumePdf} download="Kevin-Yang-Resume.pdf">
                  Download
                </a>
                <button
                  autoFocus
                  type="button"
                  onClick={() => setActiveDialog(null)}
                >
                  Close
                </button>
              </div>
            </div>
            <iframe
              src={`${resumePdf}#view=Fit`}
              title="Kevin Yang Resume preview"
            />
          </div>
        </Modal>
      )}

    </main>
  )
}

export default Background
