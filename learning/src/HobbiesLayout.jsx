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
    label: 'Activities',
  },
  {
    icon: '=',
    label: 'Misc',
  },
  {
    icon: 'D',
    label: 'Demo\'s',
  },
]

const hobbyItems = [
  {
    label: 'Games',
    title: 'Valorant',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg',
    detail: 'I\'ve been playing since beta. I used to solo queue competitive \
    but now I only play with my friends in a 5 stack. I play mostly because I like \
    playing games with friends and Val is the game they play the most. I play every role. \
    My mains are Omen, Cypher, and Jett those agents I have the most hours on. Peak rank was Ascendant 3.',
  },
  {
    label: 'Games',
    title: 'League of Legends',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/League_of_Legends_2019_vector.svg',
    detail: 'The game that I always come back to. I started playing back in COVID. I play every role \
    but jungle, I don\'t find it fun. Reached Platinum in both mid and support. I played TFT too but not \
    recently. This new set it ain\'t that fun in my opinion. Peak rank for both TFT and solo/duo was Platinum.'
  },
  {
    label: 'Games',
    title: 'Pokemon',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/en/c/ca/Pokemon_Platinum.png',
    detail: 'My childhood game was Pokemon Platinum/Diamond. I remember playing it for hours and not \
    being able to beat the Elite Four. I used to collect Pokemon cards when I was younger not so much \
    anymore. My best card that I have is a shiny Blastoise.',
  },
  {
    label: 'Music',
    title: 'Tiffany Day',
    detailIcon: 'https://i.scdn.co/image/ab67616d0000b273b5b273ebd1632a05019cd75c',
    detail: 'I been a fan for a while back in 2021, the song that got me was \
    IF I DON\'T TEXT YOU FIRST. Been listening to her new album, HALO. Its soo good. ',
  },
  {
    label: 'Music',
    title: 'Keshi',
    detailIcon: 'https://i.scdn.co/image/ab67616d0000b27394237be74edae41560152bce',
    detail: 'My favorite artist by far. I LOVE HIS MUSIC. Found him around the\
     time I got broken up with my ex a long time ago I around 2019. Ever since then, he\'s been \
     the top artist in my spotify wrapped ever since. Saw him live once right after COVID was over. \
     Went to Head In The Clouds 2022 in LA he wasn\'t even listed to preform but I think he was \
    filling for NIKI, BEST DAY OF MY LIFE its been only down hill since.',
  },
  {
    label: 'Activities',
    title: 'Calisthenics',
    detail: 'Picked up calisthenics for fun, was always a active person and got board one \
    day and decided to give it a try. I can now do a muscle up and a front lever.',
  },
  {
    label: 'Activities',
    title: 'Weight lifting',
    detail: 'Started weight lifting to condition for volleyball back in high school. \
    Now for the past 3-4 years been constantly going to the gym.',
  },
  {
    label: 'Activities',
    title: 'Volleyball',
    detail: 'Played volleyball in high school I was on the jv team during freshman year, \
    joined the varsity team during sophomore year onwards. Was Vice Captain my junior and \
    Captain my senior year. I played libero for jv and then played outside hitter \
    for varsity. Haven\'t played in a while but it was fun playing and I made some great friends.',
    
  },
  {
    label: 'Misc',
    title: 'My Music Taste',
    detailIcon:'https://f4.bcbits.com/img/a2869603325_16.jpg',
    detail: 'I listen to anything. I mean a n y t h i n g. From rap, classical, EDM, J-pop, K-pop, \
    hyper-pop all the way to nightcore, basically everything except for country I don\'t like it personally. \
    I think OSU, the rhythm game has forever changed my music taste. I played OSU since middle school.',
  },
  {
    label: 'Music',
    title: 'Ado',
    detailIcon: 'https://i.scdn.co/image/ab6761610000e5ebbcb1c184c322688f10cdce7a',
    detail: 'Ado was my first japanese artist that I really fell in love with, her unique voice and style is what drew me in.\
    There\'s something about her voice that just pulls me in.',
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
          </section>
        </div>

        <article className="bag-description" aria-live="polite">
          <div className="bag-description-icon" aria-hidden="true">
            <img src={selectedItem.detailIcon} alt="" />
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
