import './assets/main.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react' // Import PersistGate
import { store, persistor } from './store/authReducer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  </StrictMode>
)
