import { motion } from 'framer-motion';
import { Shirt, CheckCircle2, Clock, Loader2 } from 'lucide-react';

const OrderCard = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Washing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Ready': return <CheckCircle2 className="w-4 h-4 mr-1.5" />;
      case 'Washing': return <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />;
      case 'Pending': return <Clock className="w-4 h-4 mr-1.5" />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-md hover:border-gray-600 transition-colors"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-gray-400 bg-gray-900 px-2 py-1 rounded">
              {order.id}
            </span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border flex items-center ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              {order.status}
            </span>
          </div>
          <h4 className="text-white font-semibold">{order.customer}</h4>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-white">${order.total.toFixed(2)}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700/50 pt-4 mt-4">
        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">Items</p>
        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center text-sm text-gray-300">
              <Shirt className="w-4 h-4 text-gray-500 mr-2" />
              <span className="flex-1">{item.name}</span>
              <span className="text-gray-500">x{item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;
