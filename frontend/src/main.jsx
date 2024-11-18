import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/AuthProvider'
import { AppRoutes } from './routes/routes'
import './styles/general.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  </BrowserRouter>
)