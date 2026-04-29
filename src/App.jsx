import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useStore from './store/useStore';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';
import Orders from './pages/Orders';
import Settings from './pages/Settings';

function App() {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50 overflow-hidden selection:bg-blue-500/30 selection:text-blue-900 dark:selection:text-blue-200 transition-colors duration-300">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden relative">
          {/* Subtle background glow */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none transition-colors duration-300" />
          <TopBar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 z-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/new-order" element={<NewOrder />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
