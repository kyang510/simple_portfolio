import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import project2 from './assets/project-2.png'
import project3 from './assets/project-3.png'
import project4 from './assets/project-4.png'
import resumePdf from './assets/kevinyang.pdf'

const email = 'kevyang386@gmail.com'
const filters = ['All', 'Music', 'Games', 'Activities']
const navigation = ['work', 'about', 'toolkit', 'contact']
const interests = [
  ['Music', 'Keshi', 'My favorite artist and a constant in my Spotify Wrapped since 2019.'],
  ['Music', 'Ado', 'A singular voice and style that pulled me into Japanese music.'],
  ['Music', 'Tiffany Day', 'A favorite since 2021—HALO has been on repeat.'],
  ['Music', 'Everything, almost', 'Rap, classical, EDM, J-pop, K-pop, hyper-pop, and nightcore. Just not country.'],
  ['Games', 'League of Legends', 'A versatile mid and support player who reached Platinum.'],
  ['Games', 'Valorant', 'Playing since beta, now mostly in a five-stack with friends. Peak: Ascendant 3.'],
  ['Games', 'Pokémon', 'Platinum and Diamond were my childhood games—and started a card collection.'],
  ['Activities', 'Calisthenics', 'Picked it up for fun and learned the muscle-up and front lever.'],
  ['Activities', 'Weight lifting', 'Started for volleyball conditioning and kept going for the last several years.'],
  ['Activities', 'Volleyball', 'Former varsity captain and outside hitter; the team and friendships stayed with me.'],
]
const projectShots = [
  [project2, 'project-shot-light', 'Discord clone chat interface in a light custom theme'],
  [project3, 'project-shot-dark', 'Discord clone chat interface in a dark custom theme'],
  [project4, 'project-shot-settings', 'Discord clone appearance and audio settings dialog'],
]
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function zoomTargetRect(image) {
  const ratio = image.naturalWidth / image.naturalHeight
  const maxWidth = window.innerWidth * .9
  const maxHeight = window.innerHeight * .82
  const width = Math.min(maxWidth, maxHeight * ratio)
  const height = width / ratio
  return {
    width,
    height,
    left: (window.innerWidth - width) / 2,
    top: (window.innerHeight - height) / 2,
  }
}

function setZoomedShotFrame(element, rect) {
  Object.assign(element.style, {
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  })
}

function sourceTransform(sourceRect, targetRect) {
  return {
    x: sourceRect.left + sourceRect.width / 2 - (targetRect.left + targetRect.width / 2),
    y: sourceRect.top + sourceRect.height / 2 - (targetRect.top + targetRect.height / 2),
    scale: sourceRect.width / targetRect.width,
  }
}

function Dialog({ children, open, onClose, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) {
      dialog.showModal()
      if (!reducedMotion()) {
        window.anime.animate(dialog.querySelector('.modal-shell'), {
          opacity: { from: 0 },
          scale: { from: .94 },
          y: { from: 18 },
          duration: 420,
          ease: 'outExpo',
        })
      }
    }
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      {...props}
      ref={ref}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {children}
    </dialog>
  )
}

function ProjectLightbox({ onClose, shot }) {
  const animationRef = useRef(null)
  const dialogRef = useRef(null)
  const zoomedShotRef = useRef(null)

  useEffect(() => {
    if (!shot) return
    const dialog = dialogRef.current
    const zoomedShot = zoomedShotRef.current
    const sourceImage = shot.source.querySelector('img')
    const targetRect = zoomTargetRect(sourceImage)
    const start = sourceTransform(shot.source.getBoundingClientRect(), targetRect)
    setZoomedShotFrame(zoomedShot, targetRect)
    dialog.showModal()

    if (reducedMotion()) return
    dialog.style.opacity = '0'
    animationRef.current = window.anime.createTimeline({
      onComplete: () => { animationRef.current = null },
    })
      .add(dialog, { opacity: 1, duration: 260, ease: 'outQuad' }, 0)
      .add(zoomedShot, {
        x: { from: start.x },
        y: { from: start.y },
        scale: { from: start.scale },
        duration: 560,
        ease: 'outExpo',
      }, 0)
  }, [shot])

  function close() {
    if (!shot) return
    animationRef.current?.complete()
    const dialog = dialogRef.current
    const zoomedShot = zoomedShotRef.current
    const targetRect = zoomedShot.getBoundingClientRect()
    const end = sourceTransform(shot.source.getBoundingClientRect(), targetRect)

    const finish = () => {
      dialog.close()
      dialog.removeAttribute('style')
      zoomedShot.removeAttribute('style')
      shot.source.focus()
      animationRef.current = null
      onClose()
    }

    if (reducedMotion()) {
      finish()
      return
    }

    animationRef.current = window.anime.createTimeline({ onComplete: finish })
      .add(dialog, { opacity: 0, duration: 380, ease: 'inQuad' }, 80)
      .add(zoomedShot, {
        x: end.x,
        y: end.y,
        scale: end.scale,
        duration: 480,
        ease: 'inOutQuad',
      }, 0)
  }

  return (
    <dialog
      className="image-lightbox"
      ref={dialogRef}
      aria-label="Enlarged project screenshot"
      onCancel={(event) => {
        event.preventDefault()
        close()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <button className="zoomed-shot" ref={zoomedShotRef} type="button" onClick={close} aria-label="Close enlarged screenshot">
        <img src={shot?.src} alt={shot?.alt || ''} />
      </button>
      <p>Click the image to close</p>
    </dialog>
  )
}

function Apple({ onOpenMain }) {
  const pageRef = useRef(null)
  const toastAnimation = useRef(null)
  const toastRef = useRef(null)
  const toastTimeout = useRef(null)
  const [activeSection, setActiveSection] = useState('')
  const [filter, setFilter] = useState('All')
  const [interestsOpen, setInterestsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)
  const [selectedShot, setSelectedShot] = useState(null)
  const [toastVisible, setToastVisible] = useState(false)
  const modalOpen = resumeOpen || interestsOpen || selectedShot

  useEffect(() => {
    document.body.classList.add('apple-view')
    return () => document.body.classList.remove('apple-view')
  }, [])

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  useEffect(() => () => window.clearTimeout(toastTimeout.current), [])

  useLayoutEffect(() => {
    const page = pageRef.current
    const reveals = [...page.querySelectorAll('.reveal')]
    let entranceAnimation
    let revealObserver

    if (reducedMotion()) {
      reveals.forEach((item) => item.classList.add('is-visible'))
    } else {
      document.documentElement.classList.add('has-anime')
      const { animate, createTimeline, stagger } = window.anime
      entranceAnimation = createTimeline({ defaults: { duration: 720, ease: 'outExpo' } })
        .add(page.querySelector('.hero-copy'), { opacity: 1, y: 0 }, 0)
        .add(page.querySelectorAll('.hero-copy > *'), {
          opacity: { from: 0 },
          y: { from: 18 },
          delay: stagger(70),
        }, 40)
        .add(page.querySelector('.hero-stage'), { opacity: 1, y: 0 }, 150)
        .add(page.querySelector('.code-window'), {
          opacity: { from: 0 },
          scale: { from: .94 },
          rotateY: { from: -12 },
        }, 180)
        .add(page.querySelectorAll('.chip'), {
          opacity: { from: 0 },
          scale: { from: .7 },
          delay: stagger(60),
          duration: 520,
        }, 390)
        .add(page.querySelector('.scroll-cue'), { opacity: { from: 0 }, y: { from: 10 }, duration: 500 }, 650)

      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          animate(entry.target, {
            opacity: 1,
            y: 0,
            duration: 700,
            ease: 'outExpo',
          })

          if (entry.target.matches('.project-facts, .toolkit-grid')) {
            animate([...entry.target.children], {
              opacity: { from: 0 },
              y: { from: 14 },
              delay: stagger(65),
              duration: 560,
              ease: 'outExpo',
            })
          }

          revealObserver.unobserve(entry.target)
        })
      }, { threshold: .12 })
      page.querySelectorAll('.section .reveal, .contact-section .reveal').forEach((item) => revealObserver.observe(item))
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-35% 0px -55%', threshold: [0, .2, .6] })
    page.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section))

    return () => {
      document.documentElement.classList.remove('has-anime')
      entranceAnimation?.cancel()
      revealObserver?.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!interestsOpen || reducedMotion()) return undefined
    let animation
    const frame = window.requestAnimationFrame(() => {
      animation = window.anime.animate([...pageRef.current.querySelectorAll('.interest-card')], {
        opacity: { from: 0 },
        y: { from: 14 },
        scale: { from: .97 },
        delay: window.anime.stagger(45),
        duration: 420,
        ease: 'outExpo',
      })
    })
    return () => {
      window.cancelAnimationFrame(frame)
      animation?.cancel()
    }
  }, [filter, interestsOpen])

  useEffect(() => {
    if (reducedMotion()) return
    toastAnimation.current?.complete()
    toastAnimation.current = window.anime.animate(toastRef.current, toastVisible
      ? { opacity: { from: 0 }, y: { from: 16 }, duration: 280, ease: 'outExpo' }
      : { opacity: 0, y: 16, duration: 240, ease: 'inQuad' })
  }, [toastVisible])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setToastVisible(true)
      window.clearTimeout(toastTimeout.current)
      toastTimeout.current = window.setTimeout(() => setToastVisible(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <div ref={pageRef}>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <nav className="nav-shell" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Kevin Yang, home">KY</a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span><span></span>
            <span className="sr-only">Open menu</span>
          </button>
          <div className={`nav-links${menuOpen ? ' is-open' : ''}`} id="nav-links" onClick={() => setMenuOpen(false)}>
            {navigation.map((section) => (
              <a className={activeSection === section ? 'is-active' : ''} href={`#${section}`} key={section}>
                {section[0].toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
          <button className="nav-cta" type="button" onClick={() => setResumeOpen(true)}>Resume</button>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="status-dot"></span>Available for opportunities</p>
            <h1 id="hero-title">I build software that feels <span>effortless.</span></h1>
            <p className="hero-intro">I’m Kevin, a full-stack software engineer and Computer Science student focused on responsive interfaces, real-time systems, and the details that make products feel alive.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
              <a className="button button-secondary" href={`mailto:${email}`}>Let’s talk <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="hero-stage reveal" aria-label="A preview of Kevin's development toolkit">
            <div className="code-window glass">
              <div className="window-bar">
                <div className="traffic-lights" aria-hidden="true"><i></i><i></i><i></i></div>
                <span>kevin / now</span>
                <span className="live-pill">Live</span>
              </div>
              <div className="code-body" aria-hidden="true">
                <p><b>const</b> engineer <em>=</em> {'{'}</p>
                <p className="indent">craft: <span>“thoughtful”</span>,</p>
                <p className="indent">systems: <span>“real-time”</span>,</p>
                <p className="indent">curiosity: <strong>true</strong></p>
                <p>{'}'}</p>
              </div>
              <div className="skill-cloud" aria-hidden="true">
                <span className="chip chip-react">React</span>
                <span className="chip chip-node">Node.js</span>
                <span className="chip chip-ts">TypeScript</span>
                <span className="chip chip-docker">Docker</span>
              </div>
            </div>
          </div>

          <a className="scroll-cue" href="#work"><span>Scroll to explore</span><i aria-hidden="true">↓</i></a>
        </section>

        <section className="work-section section" id="work" aria-labelledby="work-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Selected work</p>
            <h2 id="work-title">Built end to end.<br />Designed to connect.</h2>
          </div>

          <article className="project-card reveal">
            <div className="project-copy">
              <div>
                <p className="project-number">01 / Featured project</p>
                <h3>Real-time voice<br />& text platform</h3>
                <p>A Discord-inspired desktop application with live messaging, voice channels, secure authentication, and synchronized channel state.</p>
              </div>
              <ul className="project-tags" aria-label="Technologies used">
                {['Electron', 'WebRTC', 'Socket.IO', 'MySQL', 'JavaScript'].map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
              <a className="text-link" href="https://github.com/kyang510/dis-clone" target="_blank" rel="noreferrer">View on GitHub <span aria-hidden="true">↗</span></a>
            </div>
            <div className="gallery-wrap" aria-label="Discord clone project screenshots">
              <div className="project-gallery-frame">
                {projectShots.map(([src, className, alt]) => (
                  <button
                    className={`project-shot-card ${className}`}
                    type="button"
                    aria-label={`Enlarge ${alt.toLowerCase()}`}
                    aria-expanded={selectedShot?.src === src}
                    onClick={(event) => setSelectedShot({ alt, source: event.currentTarget, src })}
                    key={src}
                  >
                    <img className="project-shot" src={src} alt={alt} />
                  </button>
                ))}
              </div>
              <p>Light and dark appearances with configurable audio and display settings</p>
            </div>
          </article>

          <div className="project-facts reveal">
            <div><strong>Real-time</strong><span>Multi-user communication</span></div>
            <div><strong>Secure</strong><span>bcrypt authentication</span></div>
            <div><strong>Portable</strong><span>Dockerized environment</span></div>
            <div><strong>Peer-to-peer</strong><span>WebRTC voice channels</span></div>
          </div>
        </section>

        <section className="about-section section" id="about" aria-labelledby="about-title">
          <div className="section-heading reveal">
            <p className="eyebrow">About me</p>
            <h2 id="about-title">Curious by default.<br />Intentional by design.</h2>
          </div>

          <div className="bento-grid">
            <article className="bento bento-story reveal">
              <p className="card-label">My story</p>
              <h3>I turn ideas into products people can actually use.</h3>
              <p>I’m studying Computer Science at Cal State East Bay after completing my associate degree at Contra Costa College. I care about the full experience—from database structure to the last interaction on screen.</p>
              <button className="text-link button-link" type="button" onClick={() => setResumeOpen(true)}>Read my résumé <span aria-hidden="true">→</span></button>
            </article>

            <article className="bento bento-location reveal">
              <svg className="california-art" viewBox="0 0 400 520" aria-hidden="true">
                <path className="california-shape" d="M78 28h194l7 143 31 65-27 63 48 94-38 92-52-55-28-61-53-46-18-56-34-43-8-58-28-55-18-56Z" />
                <text x="186" y="265">CA</text>
                <g className="california-marker">
                  <circle cx="103" cy="194" r="18" />
                  <circle cx="103" cy="194" r="6" />
                </g>
              </svg>
              <div>
                <p className="card-label">Based in</p>
                <h3>California, USA</h3>
                <p>Open to thoughtful teams and ambitious products.</p>
              </div>
            </article>

            <article className="bento bento-interests reveal">
              <div className="interest-orbit" aria-hidden="true">
                <span>♫</span><span>⌁</span><span>△</span><span>◎</span>
                <b>KY</b>
              </div>
              <div>
                <p className="card-label">Off the clock</p>
                <h3>Music, movement, games & more.</h3>
                <button className="text-link button-link" type="button" onClick={() => setInterestsOpen(true)}>Explore my interests <span aria-hidden="true">→</span></button>
              </div>
            </article>

            <article className="bento bento-education reveal">
              <p className="card-label">Education</p>
              <div className="education-row"><span>2025—Now</span><div><strong>Cal State East Bay</strong><small>B.S. Computer Science</small></div></div>
              <div className="education-row"><span>2025</span><div><strong>Contra Costa College</strong><small>A.A. Liberal Arts: Math & Science</small></div></div>
            </article>
          </div>
        </section>

        <section className="toolkit-section section" id="toolkit" aria-labelledby="toolkit-title">
          <div className="section-heading reveal">
            <p className="eyebrow">Toolkit</p>
            <h2 id="toolkit-title">The right tools.<br />Used with purpose.</h2>
          </div>
          <div className="toolkit-grid reveal">
            <article><div className="tool-icon icon-code" aria-hidden="true">&lt;/&gt;</div><h3>Languages</h3><p>TypeScript · JavaScript · Python · Java · C · C++ · SQL</p></article>
            <article><div className="tool-icon icon-ui" aria-hidden="true">◫</div><h3>Interface</h3><p>React · HTML · CSS · responsive systems · accessibility</p></article>
            <article><div className="tool-icon icon-server" aria-hidden="true">⌘</div><h3>Systems</h3><p>Node.js · Express · Socket.IO · WebRTC · MySQL · Electron</p></article>
            <article><div className="tool-icon icon-ship" aria-hidden="true">◇</div><h3>Ship</h3><p>Docker · Git · GitHub · cross-platform development</p></article>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-layout">
            <div className="contact-copy reveal">
              <p className="eyebrow">Start a conversation</p>
              <h2 id="contact-title">Let’s build something<br /><span>worth using.</span></h2>
              <p>Have a role, project, or internship in mind? I’d love to hear about it.</p>
              <div className="contact-actions">
                <a className="button button-light" href={`mailto:${email}`}>Send me an email <span aria-hidden="true">↗</span></a>
                <button className="copy-button" type="button" onClick={copyEmail}><span>{email}</span><b>Copy</b></button>
              </div>
            </div>
            <div className="gameboy reveal" aria-label="Game Boy display reading Let's build">
              <div className="gameboy-screen-frame">
                <div className="gameboy-screen">
                  <span className="screen-kicker">Load</span>
                  <strong>UNSERIOUS<br />RESUME<br/> FLASH WARNING</strong>
                  <span className="screen-prompt">PRESS A</span>
                </div>
                <small>FLASH WARNING</small>
              </div>
              <div className="gameboy-brand">GAME<span>BOY</span></div>
              <div className="gameboy-controls">
                <div className="d-pad" aria-hidden="true"><i></i><i></i></div>
                <div className="start-select" aria-hidden="true"><i></i><i></i></div>
                <div className="action-buttons">
                  <button type="button" aria-label="Load the original portfolio" onClick={onOpenMain}>A</button>
                  <i aria-hidden="true">B</i>
                </div>
              </div>
              <div className="gameboy-speaker" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
            </div>
          </div>
          <footer>
            <span>Kevin Yang © {new Date().getFullYear()}</span>
            <div><a href="https://github.com/kyang510" target="_blank" rel="noreferrer">GitHub</a><a href="https://linkedin.com/in/kevin-yang-386922372" target="_blank" rel="noreferrer">LinkedIn</a><a href="#top">Back to top ↑</a></div>
          </footer>
        </section>
      </main>

      <Dialog className="modal" open={resumeOpen} onClose={() => setResumeOpen(false)} aria-labelledby="resume-title">
        <div className="modal-shell resume-shell">
          <header className="modal-header">
            <div><p className="card-label">Document</p><h2 id="resume-title">Resume</h2></div>
            <button className="close-button" type="button" onClick={() => setResumeOpen(false)} aria-label="Close résumé">×</button>
          </header>
          <iframe src={`${resumePdf}#view=FitH`} title="Kevin Yang résumé"></iframe>
          <div className="modal-actions"><a className="button button-primary" href={resumePdf} download="Kevin-Yang-Resume.pdf">Download PDF ↓</a></div>
        </div>
      </Dialog>

      <Dialog className="modal" open={interestsOpen} onClose={() => setInterestsOpen(false)} aria-labelledby="interests-title">
        <div className="modal-shell interests-shell">
          <header className="modal-header">
            <div><p className="card-label">Beyond the screen</p><h2 id="interests-title">Things I’m into.</h2></div>
            <button className="close-button" type="button" onClick={() => setInterestsOpen(false)} aria-label="Close interests">×</button>
          </header>
          <div className="filter-tabs" role="tablist" aria-label="Interest filters">
            {filters.map((name) => (
              <button className={filter === name ? 'is-active' : ''} type="button" onClick={() => setFilter(name)} key={name}>{name}</button>
            ))}
          </div>
          <div className="interest-grid">
            {interests
              .filter(([category]) => filter === 'All' || category === filter)
              .map(([category, title, detail]) => (
                <article className="interest-card" key={title}>
                  <span>{category}</span><h3>{title}</h3><p>{detail}</p>
                </article>
              ))}
          </div>
        </div>
      </Dialog>

      <ProjectLightbox shot={selectedShot} onClose={() => setSelectedShot(null)} />

      <div className={`toast${toastVisible ? ' is-visible' : ''}`} ref={toastRef} role="status" aria-live="polite">Email copied</div>
    </div>
  )
}

export default Apple
