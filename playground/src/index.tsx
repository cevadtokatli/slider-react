import './style.scss'
import '@cevad-tokatli/slider/style.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const root = createRoot(document.getElementById('app'))

root.render(<App />)
