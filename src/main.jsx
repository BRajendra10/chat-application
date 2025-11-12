import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/userSelectionContext.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </Provider>
)
