import { Moon, Sun, Building, BellRing, Shield, UserCircle } from 'lucide-react';
import useStore from '../store/useStore';

const Settings = () => {
  const { theme, toggleTheme } = useStore();

  return (
    <div className="max-w-4xl mx-auto py-8 px-2 relative transition-colors duration-300">
      <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 tracking-tight">
          Settings
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-lg">Manage your application preferences and profile.</p>
      </div>

      <div className="space-y-6">
        
        {/* Appearance Section */}
        <section className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-zinc-800/80 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-blue-500" /> : <Sun className="w-5 h-5 text-blue-500" />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Appearance</h2>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Customize the look and feel of the dashboard.</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-4 border-t border-gray-100 dark:border-zinc-800/80">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Theme Mode</p>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Toggle between Light and Dark themes.</p>
            </div>
            <button
              onClick={toggleTheme}
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2 border border-gray-200 dark:border-zinc-700"
            >
              {theme === 'dark' ? (
                <><Sun className="w-4 h-4" /> Switch to Light</>
              ) : (
                <><Moon className="w-4 h-4" /> Switch to Dark</>
              )}
            </button>
          </div>
        </section>

        {/* Business Profile Section */}
        <section className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-zinc-800/80 transition-colors duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
              <Building className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Business Profile</h2>
              <p className="text-sm text-gray-500 dark:text-zinc-400">Manage your business information.</p>
            </div>
          </div>
          
          <div className="space-y-4 py-2 border-t border-gray-100 dark:border-zinc-800/80 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2 uppercase tracking-wider">Business Name</label>
                <input type="text" defaultValue="SmartClean Laundry" disabled className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-gray-500 dark:text-zinc-500 cursor-not-allowed shadow-inner" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2 uppercase tracking-wider">Support Email</label>
                <input type="text" defaultValue="support@smartclean.com" disabled className="w-full bg-gray-50 dark:bg-zinc-950/50 border border-gray-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-gray-500 dark:text-zinc-500 cursor-not-allowed shadow-inner" />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Settings;
