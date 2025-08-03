import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import ModuleList from './components/ModuleList';
import TaskBoard from './components/TaskBoard';
import InvoiceList from './components/InvoiceList';
import TallySync from './components/TallySync';
import Reports from './components/Reports';
import Layout from './components/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    console.log('Login with role:', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout userRole={userRole} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={
            (() => {
              const redirectPath = userRole === 'project_manager' ? "/dashboard" : "/tasks";
              console.log('Redirecting to:', redirectPath, 'for role:', userRole);
              return <Navigate to={redirectPath} replace />;
            })()
          } />
          {userRole === 'project_manager' && (
            <>
              <Route key="dashboard" path="/dashboard" element={<Dashboard />} />
              <Route key="projects" path="/projects" element={<ProjectList />} />
              <Route key="modules" path="/modules/:projectId" element={<ModuleList />} />
              <Route key="invoices" path="/invoices" element={<InvoiceList />} />
              <Route key="tally-sync" path="/tally-sync" element={<TallySync />} />
              <Route key="reports" path="/reports" element={<Reports />} />
            </>
          )}
          <Route key="tasks" path="/tasks" element={<TaskBoard userRole={userRole} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 