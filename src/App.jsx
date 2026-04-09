import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layout/AppLayout.jsx'
import Home from './pages/Home.jsx'
import ResearchRadarPage from './pages/ResearchRadarPage.jsx'
import SpotlightPage from './pages/SpotlightPage.jsx'
import AlumniPage from './pages/AlumniPage.jsx'
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
        <Route path="research-radar" element={<ResearchRadarPage />} />
        <Route path="spotlight" element={<SpotlightPage />} />
        <Route path="alumni" element={<AlumniPage />} />
        <Route path="siren" element={<SirenPage />} />
        <Route path="odadc" element={<OdadcHubPage />} />
        <Route path="odadc/:year" element={<OdadcYearPage />} />
        <Route path="newsletters" element={<NewslettersPage />} />
        <Route path="student-stories" element={<Navigate to="/spotlight" replace />} />
        <Route path="faculty-spotlight" element={<Navigate to="/spotlight" replace />} />
        <Route path="alumni-connect" element={<Navigate to="/alumni" replace />} />
        <Route path="student-ambassadors" element={<Navigate to="/#student-ambassadors" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
