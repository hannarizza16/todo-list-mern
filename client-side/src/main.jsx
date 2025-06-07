import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TodoListProvider } from '../contexts/TodoListContext.jsx'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TodoListProvider>
        <App />
      </TodoListProvider>
    </BrowserRouter>
  </StrictMode>,
)
