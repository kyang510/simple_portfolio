import { useEffect, useRef, useState } from 'react'
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
import HobbiesLayout from './HobbiesLayout.jsx'

function Background() {
  const [hoveredLayer, setHoveredLayer] = useState(null)
  const [showFightMoves, setShowFightMoves] = useState(false)
  const [showResume, setShowResume] = useState(false)
  const [aboutContent, setAboutContent] = useState(false)
  const resumeModalRef = useRef(null)
  const resumeCloseButtonRef = useRef(null)

  useEffect(() => {
    if (!showResume) return undefined

    const previouslyFocusedElement = document.activeElement
    const modal = resumeModalRef.current

    resumeCloseButtonRef.current?.focus()

    function handleDialogKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setShowResume(false)
        return
      }

      if (event.key !== 'Tab' || !modal) return

      const focusableElements = Array.from(
        modal.querySelectorAll('a[href], button:not([disabled]), iframe'),
      )

      if (focusableElements.length === 0) {
        event.preventDefault()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    function keepFocusInDialog(event) {
      if (!modal?.contains(event.target)) {
        resumeCloseButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleDialogKeyDown)
    document.addEventListener('focusin', keepFocusInDialog)

    return () => {
      document.removeEventListener('keydown', handleDialogKeyDown)
      document.removeEventListener('focusin', keepFocusInDialog)
      previouslyFocusedElement?.focus()
    }
  }, [showResume])

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

    if (action === 'showAbout') {
      setAboutContent((isVisible) => !isVisible)
    }
  }

  return (
    <main className="portfolio" aria-label="Portfolio home page">

      <div className={`portfolio-scene${aboutContent ? ' about-is-open' : ''}`}>
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
          style={{ '--resume-image': `url(${background})` }}
          aria-hidden="true"
        />

        <NavigationOverlay
          onAreaHover={setHoveredLayer}
          onAction={handleAction}
        />
      </div>

      {aboutContent && <HobbiesLayout onClose={() => setAboutContent(false)} />}

      {showResume && (
        <section
          ref={resumeModalRef}
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
                <button
                  ref={resumeCloseButtonRef}
                  type="button"
                  onClick={() => setShowResume(false)}
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
        </section>
      )}

    </main>
  )
}

export default Background
