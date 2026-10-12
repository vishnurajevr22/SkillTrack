import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import Tasks from './pages/Tasks';
import Goals from './pages/Goals';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

export default function App() {
  const { theme } = useApp();

  // Sync the chosen theme onto <html> so CSS variables switch app-wide
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}
