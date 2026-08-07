import { useEffect, useRef, useState } from 'react'
import hobbiesFolder from './assets/hobbies-folder.png'
import calVideo from './assets/cal.mp4'
const About = 'All'

const hobbySections = [
  {
    icon: '⅀',
    label: 'All',
  },
  {
    icon: '🃏',
    label: 'Games'
  },
  {
    icon: '𝄞',
    label: 'Music',

  },
  {
    icon: '⍓',
    label: 'Activities',
  },  
  {
    icon: '∬',
    label: 'Skills',
  },
  {
    icon: '✰',
    label: 'Misc',
  },

]

const hobbyItems = [
  {
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE2pVn694DXy29DQhNTc1GUwhszXFMpPenb6UB32iTXrKR3yBcoAznVYxr&s=10',
    label: 'Music',
    title: 'Ado',
    detailIcon: 'https://i.scdn.co/image/ab6761610000e5ebbcb1c184c322688f10cdce7a',
    detail: 'Ado was my first japanese artist that I really fell in love with, her unique voice and style is what drew me in.\
    There\'s something about her voice that just pulls me in.',
  },  
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/League_of_Legends_2019_vector.svg',
    label: 'Games',
    title: 'League of Legends',
    detailIcon: 'https://logos-world.net/wp-content/uploads/2023/02/LoL-Symbol.png',
    detail: 'The game that I always come back to. I started playing back in COVID. I play every role \
    but jungle, I don\'t find it fun. Reached Platinum in both mid and support. I played TFT too but not \
    recently. This new set it ain\'t that fun in my opinion. Peak rank for both TFT and solo/duo was Platinum.'
  },
  {
    icon: 'https://store-images.s-microsoft.com/image/apps.21507.13663857844271189.4c1de202-3961-4c40-a0aa-7f4f1388775a.20ed7782-0eda-4f9d-b421-4cc47492edc6',
    label: 'Games',
    title: 'Valorant',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version_%28cropped%29.png',
    detail: 'I\'ve been playing since beta. I used to solo queue competitive \
    but now I only play with my friends in a 5 stack. I play mostly because I like \
    playing games with friends and Val is the game they play the most. I play every role. \
    My mains are Omen, Cypher, and Jett those agents I have the most hours on. Peak rank was Ascendant 3.',
  },

  {
    icon: 'https://upload.wikimedia.org/wikipedia/en/c/ca/Pokemon_Platinum.png',
    label: 'Games',
    title: 'Pokemon',
    detailIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVEWQhRYfN8n_yiaf90QB_nvKWXUkSKkSlIGt6lgqgOFfqtyx25VviMzA&s=10',
    detail: 'My childhood game was Pokemon Platinum/Diamond. I remember playing it for hours and not \
    being able to beat the Elite Four. I used to collect Pokemon cards when I was younger not so much \
    anymore. My best card that I have is a shiny Blastoise.',
  },
  {
    icon: 'https://first-avenue.com/wp-content/uploads/2022/08/TiffanyDay-GratitudeProject-PressShot1-1080x1332-1.jpg',
    label: 'Music',
    title: 'Tiffany Day',
    detailIcon: 'https://i.scdn.co/image/ab67616d0000b273b5b273ebd1632a05019cd75c',
    detail: 'I been a fan for a while back in 2021, the song that got me was \
    IF I DON\'T TEXT YOU FIRST. Been listening to her new album, HALO. Its soo good. ',
  },
  {
    icon: 'https://i.scdn.co/image/ab67616d0000b273617997bc09bb7fa23624eff5',
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
    iconVideo: calVideo,
    label: 'Activities',
    title: 'Calisthenics',
    detailIcon: 'https://i.pinimg.com/736x/d6/cf/99/d6cf999e74448cb5d809b1f94e6cd4d5.jpg',
    detail: 'Picked up calisthenics for fun, was always a active person and got board one \
    day and decided to give it a try. I can now do a muscle up and a front lever.',
  },
  {
    icon: 'https://i.pinimg.com/736x/43/ea/4d/43ea4ded80d43f2958e7b442e188fc0d.jpg',
    label: 'Activities',
    title: 'Weight lifting',
    detailIcon: 'https://i.pinimg.com/736x/8e/81/a2/8e81a2dea4ee87cfccf724570f1772ed.jpg',
    detail: 'Started weight lifting to condition for volleyball back in high school. \
    Now for the past 3-4 years been constantly going to the gym.',
  },
  {
    icon: 'https://static.vecteezy.com/system/resources/thumbnails/035/320/507/small/ai-generated-volleyball-ball-isolated-on-transparent-background-free-png.png',
    label: 'Activities',
    title: 'Volleyball',
    detailIcon: 'https://pngpix.com/images/hd/haikyuu-volleyball-spike-action-zcpqlj7ov2bohbh8.jpg',
    detail: 'Played volleyball in high school I was on the jv team during freshman year, \
    joined the varsity team during sophomore year onwards. Was Vice Captain my junior and \
    Captain my senior year. I played libero for jv and then played outside hitter \
    for varsity. Haven\'t played in a while but it was fun playing and I made some great friends.',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/3840px-Spotify_logo_without_text.svg.png',
    label: 'Misc',
    title: 'My Music Taste',
    detailIcon:'https://f4.bcbits.com/img/a2869603325_16.jpg',
    detail: 'I listen to anything. I mean a n y t h i n g. From rap, classical, EDM, J-pop, K-pop, \
    hyper-pop all the way to nightcore, basically everything except for country I don\'t like it personally. \
    I think OSU, the rhythm game has forever changed my music taste. I played OSU since middle school.',
  },  
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png',
    label: 'Skills',
    title:'C',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png',
    detail: '',
  },
  {
    icon: 'https://nerdysoft.com/wp-content/uploads/2021/11/java-14-1.svg',
    label: 'Skills',
    title: 'Java',
    detailIcon: 'https://nerdysoft.com/wp-content/uploads/2021/11/java-14-1.svg',
    detail: '',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg',
    label: 'Skills',
    title: 'HTML',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg',
    detail: '',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg',
    label: 'Skills',
    title: 'CSS', 
    detailIcon :'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg',
    detail: '',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    label: 'Skills',
    title: 'JavaScript',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    detail: '',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    label: 'Skills',
    title: 'React',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    detail: '',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
    label: 'Skills',
    title: 'Node.js',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
    detail: '',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
    label: 'Skills',
    title: 'Python',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg',
    detail: '',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg',
    label: 'Skills',
    title: 'C++',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg',
    detail: '',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png',
    label: 'Skills',
    title: 'C#',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Csharp_Logo.png',
    detail: '',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png',
    label: 'Skills',
    title: 'SQL',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png',
    detail: '',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg',
    label: 'Skills',
    title: 'Git',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg',
    detail: '',
  },
  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
    label: 'Skills',
    title: 'GitHub',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
    detail: '',
  },

  {
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
    label: 'Skills',
    title:'Typescript',
    detailIcon: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
    detail: '',
  },
  {
    icon: 'https://ms-azuretools.gallerycdn.vsassets.io/extensions/ms-azuretools/vscode-docker/2.0.0/1748459272971/Microsoft.VisualStudio.Services.Icons.Default',
    label: 'Skills',
    title:'Docker',
    detailIcon: 'https://ms-azuretools.gallerycdn.vsassets.io/extensions/ms-azuretools/vscode-docker/2.0.0/1748459272971/Microsoft.VisualStudio.Services.Icons.Default',
    detail: '',
  },

]

function HobbiesLayout({ onClose }) {
  const folderButtonRef = useRef(null)
  const dialogRef = useRef(null)
  const [activeItem, setActiveItem] = useState(0)
  const [highlightedItem, setHighlightedItem] = useState(0)
  const [activeFilter, setActiveFilter] = useState(About)
  const selectedItem = hobbyItems[activeItem]
  const filteredItems = hobbyItems
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => activeFilter === About || item.label === activeFilter)
    .sort((a, b) => a.item.title.localeCompare(b.item.title))

  function selectFilter(section) {
    setActiveFilter(section.label)

    const firstMatchingItem = section.label === About
      ? 0
      : hobbyItems.findIndex((item) => item.label === section.label)

    if (firstMatchingItem >= 0) {
      setActiveItem(firstMatchingItem)
      setHighlightedItem(firstMatchingItem)
    }
  }

  function handleItemKeyDown(event, itemPosition) {
    if (event.key === 'Enter') {
      event.preventDefault()
      setActiveItem(filteredItems[itemPosition].index)
      return
    }

    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return

    event.preventDefault()

    const direction = event.key === 'ArrowDown' ? 1 : -1
    const nextPosition = (
      itemPosition + direction + filteredItems.length
    ) % filteredItems.length
    const nextItem = filteredItems[nextPosition]

    setHighlightedItem(nextItem.index)
    event.currentTarget
      .closest('.bag-list')
      ?.querySelectorAll('button')[nextPosition]
      ?.focus()
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
          dialogRef.current?.querySelectorAll(
            'button:not([disabled]):not([tabindex="-1"])',
          ) ?? [],
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
              title="Close"
              onClick={onClose}
            >
                {selectedItem.iconVideo ? (
                  <video
                    key={selectedItem.iconVideo}
                    src={selectedItem.iconVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : selectedItem.icon ? (
                  <img src={selectedItem.icon} alt="" />
                ) : null}
              
            </button>

            <nav className="bag-tabs" aria-label="Hobby filters">
              {hobbySections.map((section) => (
                <button
                  key={section.label}
                  className={activeFilter === section.label ? 'is-active' : ''}
                  type="button"
                  aria-label={`Filter by ${section.label}`}
                  title={section.label}
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
              {filteredItems.map(({ item, index }, itemPosition) => (
                <li key={item.title}>
                  <button
                    className={[
                      activeItem === index ? 'is-active' : '',
                      highlightedItem === index ? 'is-highlighted' : '',
                    ].filter(Boolean).join(' ')}
                    type="button"
                    tabIndex={highlightedItem === index ? 0 : -1}
                    onClick={() => {
                      setActiveItem(index)
                      setHighlightedItem(index)
                    }}
                    onKeyDown={(event) => handleItemKeyDown(event, itemPosition)}
                  >
                    <span>{item.title}</span>
                    <span aria-label="quantity 1">x 1</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <article className="bag-description"aria-live="polite">
          <div className="bag-description-icon" aria-hidden="true">
            <img src={selectedItem.detailIcon} alt=""/>
          </div>
          <div>
            <p className="bag-description-label">{selectedItem.label} / selected</p>
            <h1 id="hobbies-title">{selectedItem.title}</h1>
            <p>{selectedItem.detail}</p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default HobbiesLayout
