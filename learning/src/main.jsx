import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Background from './Background.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Background />
  </StrictMode>,
)
