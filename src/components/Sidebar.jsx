import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ListOrdered, Droplets, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'New Order', path: '/new-order', icon: PlusCircle },
    { name: 'Orders', path: '/orders', icon: ListOrdered },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex-col hidden md:flex z-10 shadow-xl transition-colors duration-300">
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-zinc-800/50 transition-colors duration-300">
        <span className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white tracking-wide transition-colors duration-300">
          <Droplets className="w-6 h-6 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] dark:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          SmartClean
        </span>
      </div>
      
      <div className="flex-1 py-6 px-4 flex flex-col gap-2">
        <div className="text-xs font-semibold text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-2 px-2 transition-colors duration-300">Main Menu</div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden ${
                isActive
                  ? 'text-blue-600 dark:text-white bg-blue-50 dark:bg-blue-500/10'
                  : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.4)] dark:shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-500' : 'text-gray-400 dark:text-zinc-500 group-hover:text-gray-600 dark:group-hover:text-zinc-300'}`} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-zinc-800/50 transition-colors duration-300">
        <NavLink 
          to="/settings" 
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium transition-colors ${
              isActive 
                ? 'text-blue-600 dark:text-white bg-blue-50 dark:bg-blue-500/10' 
                : 'text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-800/50'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Settings className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-500' : 'text-gray-400 dark:text-zinc-500'}`} />
              Settings
            </>
          )}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
