import { Routes, Route } from 'react-router-dom'
import AppLayout from './layout/AppLayout.jsx'
import Home from './pages/Home.jsx'
import SirenPage from './pages/SirenPage.jsx'
import OdadcHubPage from './pages/OdadcHubPage.jsx'
import OdadcYearPage from './pages/OdadcYearPage.jsx'
import NewslettersPage from './pages/NewslettersPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="siren" element={<SirenPage />} />
        <Route path="odadc" element={<OdadcHubPage />} />
        <Route path="odadc/:year" element={<OdadcYearPage />} />
        <Route path="newsletters" element={<NewslettersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
