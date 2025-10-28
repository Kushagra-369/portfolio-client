import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Google_Fonts.css'
import {ThemeProvider} from './Context/ThemeContext.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
