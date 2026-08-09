function NavigationOverlay({ onAreaHover, onToggleFightMoves, onOpenDialog }) {
  const areas = [
    {
      name: 'Projects',
      layer: 'projects',
      points: '8,675 356,624 430,740 45,846',
      activate: onToggleFightMoves,
    },
    {
      name: 'GitHub',
      layer: 'github',
      points: '4,902 356,820 398,930 93,1066',
      activate: () => window.open('https://github.com/kyang510', '_blank', 'noopener,noreferrer'),
    },
    {
      name: 'About and Hobbies',
      layer: 'about',
      points: '638,604 1070,640 925,810 556,706',
      activate: () => onOpenDialog('about'),
    },
    {
      name: 'Hire me',
      layer: 'hire_me',
      points: '617,804 1050,909 900,1058 540,929',
      activate: () => onOpenDialog('contact'),
    },
    {
      name: 'Resume',
      layer: 'resume',
      points: '700,219 1210,219 1117,370 700,370',
      activate: () => onOpenDialog('resume'),
    },
  ]

  function handleKeyDown(event, activate) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      activate()
    }
  }

  return (
    <svg
      className="overlay"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
      aria-label="Portfolio navigation"
    >
      {areas.map((area) => (
        <g key={area.name}>
          <polygon
            className="clickable-region"
            points={area.points}
            role="link"
            tabIndex={0}
            aria-label={area.name}
            onPointerEnter={() => onAreaHover(area.layer ?? null)}
            onPointerLeave={() => onAreaHover(null)}
            onClick={area.activate}
            onKeyDown={(event) => handleKeyDown(event, area.activate)}
          >
            <title>{area.name}</title>
          </polygon>
        </g>
      ))}
    </svg>
  )
}

export default NavigationOverlay
