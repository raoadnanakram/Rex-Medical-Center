import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { preloadRoute } from './routes'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Load the current page's chunk first so the first render matches the prerendered HTML.
// Prerendered pages ship with HTML inside #root, so hydrate them; the 404 shell is empty.
preloadRoute(window.location.pathname)
  .catch(() => {})
  .then(() => {
    if (container.hasChildNodes()) {
      hydrateRoot(container, app)
    } else {
      createRoot(container).render(app)
    }
  })
