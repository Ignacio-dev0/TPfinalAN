import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// initialize lightweight scroll reveal (no deps)
import initScrollReveal from './utils/scrollReveal'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// run scroll reveal after mount
if (typeof window !== 'undefined') {
  // a small timeout lets initial layout settle in dev/hydration cases
  setTimeout(() => initScrollReveal(), 60);
}
