import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import App from './components/App/App.tsx'
import Root from './components/Root/Root.tsx';
import { registerRuntimeErrorListener } from "./hmrOverlay.ts";

registerRuntimeErrorListener();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
