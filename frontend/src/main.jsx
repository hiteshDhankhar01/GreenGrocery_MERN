import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './context/Authcontext.jsx'
import { CartProvider } from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider value>
        <CartProvider>
          <ToastContainer
            theme='dark'
            position='top-left'
            autoClose={1000}
            pauseOnHover={false} />
          <App />
        </CartProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode >,
)
