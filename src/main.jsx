import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../src/styles/index.css'

//npm i --save-dev vite-plugin-eslint eslint-config-react-app      

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
