import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-zinc-800/50 shadow-xl relative overflow-hidden group transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-semibold tracking-wide uppercase mb-2 transition-colors duration-300">{title}</p>
          <h3 className="text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight transition-colors duration-300">{value}</h3>
          {trend && (
            <p className="text-emerald-600 dark:text-emerald-400/90 text-sm font-medium mt-3 flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full w-fit border border-emerald-200 dark:border-emerald-500/20 transition-colors duration-300">
              {trend}
            </p>
          )}
        </div>
        <div className="p-3.5 bg-gray-50 dark:bg-zinc-800/80 rounded-xl border border-gray-100 dark:border-zinc-700/50 shadow-inner group-hover:bg-blue-50 dark:group-hover:bg-blue-500/20 group-hover:border-blue-200 dark:group-hover:border-blue-500/30 transition-all duration-300">
          <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)] dark:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-transform" />
        </div>
      </div>
      
      {/* Decorative gradient blur */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/20 blur-[40px] rounded-full pointer-events-none group-hover:bg-blue-500/20 dark:group-hover:bg-blue-500/30 transition-colors duration-500" />
    </motion.div>
  );
};

export default StatCard;
