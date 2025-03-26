import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [selectedView, setSelectedView] = useState<string | null>(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route 
            path="/" 
            element={
              <LandingPage 
                onViewSelect={(view) => setSelectedView(view)}
              />
            } 
          />
          <Route 
            path="/client-view/data" 
            element={
              selectedView === 'data' ? (
                <Dashboard />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/client-view/automation" 
            element={
              selectedView === 'automation' ? (
                <Dashboard />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/client-view/infrastructure" 
            element={
              selectedView === 'infrastructure' ? (
                <Dashboard />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/people-view" 
            element={
              selectedView === 'people' ? (
                <div className="p-8">
                  <h1 className="text-2xl font-bold text-gray-800">People View</h1>
                  <p className="mt-4 text-gray-600">People view coming soon...</p>
                </div>
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 