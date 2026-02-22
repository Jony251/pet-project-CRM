import { Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        }
      />
      <Route
        path="*"
        element={
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}
