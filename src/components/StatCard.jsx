import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg relative overflow-hidden"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
          {trend && (
            <p className="text-emerald-400 text-sm font-medium mt-2 flex items-center gap-1">
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-gray-700/50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
      </div>
      
      {/* Decorative gradient blur */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full pointer-events-none" />
    </motion.div>
  );
};

export default StatCard;
