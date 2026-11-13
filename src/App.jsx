import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import PublicLanding from './pages/PublicLanding';

// Code-split RestaurantLanding to minimize initial mobile bundle size
const RestaurantLanding = lazy(() => import('./pages/RestaurantLanding'));

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <Suspense fallback={
            <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
            </div>
          }>
            <Routes>
              {/* Public Corporate Portal */}
              <Route path="/" element={<PublicLanding />} />

              {/* Dedicated Gastronomy / Restaurant Software Landing */}
              <Route path="/restaurantes" element={<RestaurantLanding />} />
              <Route path="/soluciones/restaurantes" element={<Navigate to="/restaurantes" replace />} />

              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
