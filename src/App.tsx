import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/layout';
import TableauDeBordGlobal from '@/pages/tableau-de-bord/global';
import TableauDeBordDepartement from '@/pages/tableau-de-bord/par-departement';
import Personnel from '@/pages/personnel/employe';
import LoginPage from '@/pages/auth/login';
import { AuthProvider } from '@/contexts/auth-context';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="wanec-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/tableau-de-bord/global" replace />} />
              <Route path="/tableau-de-bord/global" element={<TableauDeBordGlobal />} />
              <Route path="/tableau-de-bord/par-departement" element={<TableauDeBordDepartement />} />
              <Route path="/personnel/employe" element={<Personnel />} />
              {/* Other routes will be added as we implement more pages */}
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;