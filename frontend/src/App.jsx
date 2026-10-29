import {Toaster} from 'sonner'
import { BrowserRouter, Routes, Route } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import NotFound from './pages/NotFound.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {

  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route element={<ProtectedRoute />}>
      <Route path='/' element={<HomePage />} />
    </Route>
    <Route path='*' element={<NotFound />} />
    <Route path='/login' element={<LoginPage />} />
  </Routes>
  </BrowserRouter>
  <Toaster/>
    </>
  )
}

export default App
