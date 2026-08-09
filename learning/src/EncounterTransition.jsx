import { useEffect, useMemo } from 'react'
import './EncounterTransition.css'

const flashDuration = 440

function EncounterTransition({ onCovered }) {
  const grid = useMemo(() => {
    const columns = Math.min(10, Math.max(5, Math.ceil(window.innerWidth / 160)))
    let rows = Math.min(7, Math.max(5, Math.ceil(window.innerHeight / 160)))
    if (rows % 2 === 0) rows += 1

    const total = columns * rows
    const longestPath = Math.floor((total - 1) / 2)
    const step = Math.max(6, Math.min(24, 1050 / longestPath))
    const tiles = Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / columns)
      const column = index % columns
      const snakeIndex = row * columns + (row % 2 === 0 ? column : columns - column - 1)
      return flashDuration + Math.min(snakeIndex, total - snakeIndex - 1) * step
    })

    return { columns, duration: flashDuration + longestPath * step + 150, rows, tiles }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onCovered()
      return undefined
    }

    const timeout = window.setTimeout(onCovered, grid.duration)
    return () => window.clearTimeout(timeout)
  }, [grid.duration, onCovered])

  return (
    <div
      className="encounter-transition"
      style={{ '--columns': grid.columns, '--rows': grid.rows }}
      aria-hidden="true"
    >
      {grid.tiles.map((delay, index) => (
        <div className="encounter-tile" style={{ '--delay': `${delay}ms` }} key={index} />
      ))}
    </div>
  )
}

export default EncounterTransition
