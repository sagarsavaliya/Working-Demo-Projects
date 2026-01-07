import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ServiceRequestForm } from './pages/ServiceRequestForm';
import { FleetManagementPage } from './pages/FleetManagementPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { UsageReportingPage } from './pages/UsageReportingPage';
import { ViewRequestPage } from './pages/ViewRequestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/requests" element={<DashboardPage />} />
          <Route path="/requests/new" element={<ServiceRequestForm />} />
          <Route path="/requests/:id" element={<ViewRequestPage />} />
          <Route path="/fleet" element={<FleetManagementPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/reports" element={<UsageReportingPage />} />

          {/* Fallback for other routes */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
              <h2 className="text-2xl font-bold">Page coming soon</h2>
              <p className="text-slate-500">This feature is currently under development.</p>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
