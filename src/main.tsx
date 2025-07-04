import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import UI from "./kwss/UI.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UI />
  </StrictMode>,
)
