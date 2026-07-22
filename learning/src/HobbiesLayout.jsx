import { useEffect, useRef, useState } from 'react'
import hobbiesFolder from './assets/hobbies-folder.png'

const hobbySections = [
  {
    icon: '+',
    label: 'About',
  },
  {
    icon: '>',
    label: 'Games'
  },
  {
    icon: '~',
    label: 'Music',

  },
  {
    icon: '?',
    label: 'Gym',

  },
]

const hobbyItems = [
  {
    label: 'Games',
    title: 'Valorant',
    copy: 'Games are one of my favorite ways to unwind, explore new worlds, and spend time with friends.',
    detail: 'I am drawn to experiences with clever systems, strong visual direction, and memorable stories.',
  },
  {
    label: 'Games',
    title: 'League of Legends',
    copy: 'Games are one of my favorite ways to unwind, explore new worlds, and spend time with friends.',
    detail: 'I am drawn to experiences with clever systems, strong visual direction, and memorable stories.',
  },
  {
    label: 'Games',
    title: 'Pokemon',
    copy: 'Games are one of my favorite ways to unwind, explore new worlds, and spend time with friends.',
    detail: 'I am drawn to experiences with clever systems, strong visual direction, and memorable stories.',
  },
  {
    label: 'Music',
    title: 'Tiffany Day',
    copy: 'Music keeps me company while I work, travel, and experiment with new ideas.',
    detail: 'My playlists are always changing, and I enjoy discovering sounds outside my usual rotation.',
  },
  {
    label: 'Music',
    title: 'Keshi',
    copy: 'Music keeps me company while I work, travel, and experiment with new ideas.',
    detail: 'My playlists are always changing, and I enjoy discovering sounds outside my usual rotation.',
  },
  {
    label: 'Gym',
    title: 'Calisthenics',
    copy: 'I like following small curiosities and learning how unfamiliar things work.',
    detail: 'That habit often turns into a new skill, a side project, or a different way to approach a problem.',
  },

]

function HobbiesLayout({ onClose }) {
  const folderButtonRef = useRef(null)
  const dialogRef = useRef(null)
  const [activeItem, setActiveItem] = useState(0)
  const [activeFilter, setActiveFilter] = useState('About')
  const selectedItem = hobbyItems[activeItem]
  const filteredItems = hobbyItems
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => activeFilter === 'About' || item.label === activeFilter)
    .sort((a, b) => a.item.title.localeCompare(b.item.title))

  function selectFilter(section) {
    setActiveFilter(section.label)

    const firstMatchingItem = section.label === 'About'
      ? 0
      : hobbyItems.findIndex((item) => item.label === section.label)

    if (firstMatchingItem >= 0) setActiveItem(firstMatchingItem)
  }

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement
    folderButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const focusableElements = Array.from(
          dialogRef.current?.querySelectorAll('button:not([disabled])') ?? [],
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements.at(-1)

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }

    function keepFocusInDialog(event) {
      if (!dialogRef.current?.contains(event.target)) {
        folderButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', keepFocusInDialog)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', keepFocusInDialog)
      previouslyFocusedElement?.focus()
    }
  }, [onClose])

  return (
    <section
      className="hobbies-page"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className="hobbies-dialog bag-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hobbies-title"
      >
        <div className="bag-main">
          <aside className="bag-sidebar">
            <header className="bag-heading">
              <span>FOLDER</span>
              <small>ABOUT.EXE</small>
            </header>

            <button
              ref={folderButtonRef}
              className="bag-folder-button"
              type="button"
              aria-label="Close About"
              onClick={onClose}
            >
              <img src={hobbiesFolder} alt="Close the hobbies bag" />
            </button>

            <nav className="bag-tabs" aria-label="Hobby filters">
              {hobbySections.map((section) => (
                <button
                  key={section.label}
                  className={activeFilter === section.label ? 'is-active' : ''}
                  type="button"
                  aria-label={`Filter by ${section.label}`}
                  aria-pressed={activeFilter === section.label}
                  onClick={() => selectFilter(section)}
                >
                  <span aria-hidden="true">{section.icon}</span>
                </button>
              ))}
            </nav>

            <div className="bag-pocket-label" aria-live="polite">
              <span>{activeFilter.toUpperCase()}</span>
              <small>POCKET</small>
            </div>
          </aside>

          <section className="bag-list-panel" aria-label="Hobby inventory">
            <div className="bag-list-header">
              <span>HOBBY</span>
              <span>QTY</span>
            </div>
            <ul className="bag-list">
              {filteredItems.map(({ item, index }) => (
                <li key={item.title}>
                  <button
                    className={activeItem === index ? 'is-active' : ''}
                    type="button"
                    onClick={() => setActiveItem(index)}
                  >
                    <span>{item.title}</span>
                    <span aria-label="quantity 1">x 1</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="bag-scrollbar" aria-hidden="true">
              <span>^</span>
              <i />
              <span>v</span>
            </div>
          </section>
        </div>

        <article className="bag-description" aria-live="polite">
          <div className="bag-description-icon" aria-hidden="true">
            <img src={hobbiesFolder} alt="" />
          </div>
          <div>
            <p className="bag-description-label">{selectedItem.label} / selected</p>
            <h1 id="hobbies-title">{selectedItem.title}</h1>
            <p>{selectedItem.copy} {selectedItem.detail}</p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default HobbiesLayout
