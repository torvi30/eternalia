import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import PublicLanding from './pages/PublicLanding';
import RestaurantLanding from './pages/RestaurantLanding';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <Routes>
            {/* Public Corporate Portal */}
            <Route path="/" element={<PublicLanding />} />

            {/* Dedicated Gastronomy / Restaurant Software Landing */}
            <Route path="/restaurantes" element={<RestaurantLanding />} />
            <Route path="/soluciones/restaurantes" element={<Navigate to="/restaurantes" replace />} />

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
