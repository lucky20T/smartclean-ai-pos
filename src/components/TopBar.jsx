import { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, Moon, Sun, Check, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import useStore from '../store/useStore';

const TopBar = () => {
  const { theme, toggleTheme, notifications, markNotificationsRead, clearNotifications, searchQuery, setSearchQuery } = useStore();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const unreadCount = notifications.filter(n => n.isNew).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenNotif = () => {
    setIsNotifOpen(!isNotifOpen);
    if (!isNotifOpen && unreadCount > 0) {
      markNotificationsRead();
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800/50 flex items-center justify-between px-6 shrink-0 z-10 transition-colors duration-300">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 dark:text-zinc-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, customers, or items..."
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
        
        <div className="relative" ref={notifRef}>
          <button 
            onClick={handleOpenNotif}
            className="p-2 rounded-full text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors relative"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-white dark:ring-zinc-900 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></span>
            )}
          </button>
          
          <AnimatePresence>
            {isNotifOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-gray-200 dark:border-zinc-800 overflow-hidden z-50"
              >
                <div className="p-4 border-b border-gray-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                  {notifications.length > 0 && (
                    <button onClick={clearNotifications} className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors">
                      <Trash2 className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 dark:text-zinc-400 text-sm">
                      <Check className="w-8 h-8 mx-auto mb-2 text-gray-300 dark:text-zinc-700" />
                      You're all caught up!
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {notifications.map(notif => (
                        <div key={notif.id} className={`p-4 border-b border-gray-50 dark:border-zinc-800/50 last:border-0 ${notif.isNew ? 'bg-blue-50/50 dark:bg-blue-500/5' : ''}`}>
                          <p className="text-sm text-gray-800 dark:text-zinc-200 font-medium">{notif.message}</p>
                          <span className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1.5 block font-semibold uppercase tracking-wider">
                            {new Date(notif.time).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-medium shadow-[0_0_10px_rgba(59,130,246,0.3)] cursor-pointer ring-2 ring-gray-200 dark:ring-zinc-800 hover:ring-gray-300 dark:hover:ring-zinc-700 transition-all">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
