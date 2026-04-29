import { Bell, Search, User, Moon, Sun } from 'lucide-react';
import useStore from '../store/useStore';

const TopBar = () => {
  const { theme, toggleTheme } = useStore();

  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800/50 flex items-center justify-between px-6 shrink-0 z-10 transition-colors duration-300">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
          </div>
          <input
            type="text"
            placeholder="Search orders, customers..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-zinc-800 rounded-lg leading-5 bg-gray-50 dark:bg-zinc-950/50 text-gray-900 dark:text-zinc-300 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:bg-white dark:focus:bg-zinc-950 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors shadow-inner"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button className="p-2 rounded-full text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-zinc-900 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-medium shadow-[0_0_10px_rgba(59,130,246,0.3)] cursor-pointer ring-2 ring-gray-200 dark:ring-zinc-800 hover:ring-gray-300 dark:hover:ring-zinc-700 transition-all">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
