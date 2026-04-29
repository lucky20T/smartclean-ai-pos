import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';
import Orders from './pages/Orders';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-zinc-950 font-sans text-zinc-50 overflow-hidden selection:bg-blue-500/30">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden relative">
          {/* Subtle background glow */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          <TopBar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 z-0">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/new-order" element={<NewOrder />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
