import './App.css'

function NavigationOverlay({ onAreaHover, onAction }) {
  const areas = [
    {
      layer: 'projects',
      points: '8,675 356,624 430,740 45,846',
      action: 'showFightMoves',
    },
    {
      layer: 'github',
      points: '4,902 356,820 398,930 93,1066',
      url: 'https://github.com/kyang510',
    },
    {
      layer: 'about',
      points: '638,604 1070,640 925,810 556,706',
    },
    {
      layer: 'hire_me',
      points: '617,804 1050,909 900,1058 540,929',
    },
    {
      layer: 'resume',
      points: '700,219 1210,219 1117,370 700,370',
      action: 'showResume',
    },
  ]

  function handleClick(area) {
    if (area.action) {
      onAction(area.action)
      return
    }

    if (area.url) {
      window.open(area.url, '_blank', 'noopener,noreferrer')
      return
    }

    window.location.href = area.path
  }

  function handleKeyDown(event, area) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick(area)
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
        <polygon
          key={area.name}
          className="clickable-region"
          points={area.points}
          role="link"
          tabIndex={0}
          aria-label={area.name}
          onPointerEnter={() => onAreaHover(area.layer ?? null)}
          onPointerLeave={() => onAreaHover(null)}
          onFocus={() => onAreaHover(area.layer ?? null)}
          onBlur={() => onAreaHover(null)}
          onClick={() => handleClick(area)}
          onKeyDown={(event) => handleKeyDown(event, area)}
        >
          <title>{area.name}</title>
        </polygon>
      ))}
    </svg>
  )
}

export default NavigationOverlay
