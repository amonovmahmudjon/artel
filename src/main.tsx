import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App.tsx'
import StoreProvider from './StoreProvider'




createRoot(document.getElementById('root')!).render(

  <StoreProvider>
    <App />
  </StoreProvider>


)


