import { Shirt, CheckCircle2, Clock, Loader2, Wind, Truck, MoreHorizontal } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const OrderCard = ({ order }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: order.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.6 : 1,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Received': return 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]';
      case 'Washing': return 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]';
      case 'Drying': return 'bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]';
      case 'Ready': return 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
      case 'Delivered': return 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]';
      default: return 'bg-gray-100 dark:bg-zinc-500/10 text-gray-600 dark:text-zinc-400 border-gray-200 dark:border-zinc-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Received': return <Clock className="w-3.5 h-3.5 mr-1.5" />;
      case 'Washing': return <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />;
      case 'Drying': return <Wind className="w-3.5 h-3.5 mr-1.5" />;
      case 'Ready': return <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />;
      case 'Delivered': return <Truck className="w-3.5 h-3.5 mr-1.5" />;
      default: return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-5 border shadow-lg hover:shadow-xl transition-all cursor-grab active:cursor-grabbing group ${
        isDragging ? 'border-blue-500 ring-2 ring-blue-500/50 scale-105' : 'border-gray-200 dark:border-zinc-800/80 hover:border-gray-300 dark:hover:border-zinc-700/80'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono text-gray-500 dark:text-zinc-500 bg-gray-100 dark:bg-zinc-950/80 px-2 py-1 rounded-md pointer-events-none border border-gray-200 dark:border-zinc-800">
              {order.id}
            </span>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md border flex items-center uppercase tracking-wider ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              {order.status}
            </span>
          </div>
          <h4 className="text-gray-900 dark:text-white font-bold text-lg pointer-events-none tracking-tight transition-colors duration-300">{order.customer}</h4>
        </div>
        <div className="text-right pointer-events-none">
          <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400">₹{order.total}</p>
          <p className="text-[10px] text-gray-500 dark:text-zinc-500 mt-1 uppercase tracking-wider font-semibold transition-colors duration-300">
            {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-zinc-800/80 pt-4 mt-4 pointer-events-none transition-colors duration-300">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-widest font-bold transition-colors duration-300">Order Items</p>
          <MoreHorizontal className="w-4 h-4 text-gray-400 dark:text-zinc-600 group-hover:text-gray-600 dark:group-hover:text-zinc-400 transition-colors" />
        </div>
        <div className="space-y-2.5">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center text-sm text-gray-700 dark:text-zinc-300 transition-colors duration-300">
              <div className="w-6 h-6 rounded-md bg-gray-50 dark:bg-zinc-800 flex items-center justify-center mr-3 border border-gray-200 dark:border-zinc-700 transition-colors duration-300">
                <Shirt className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              </div>
              <span className="flex-1 font-medium">{item.name}</span>
              <span className="text-gray-600 dark:text-zinc-500 font-bold bg-gray-50 dark:bg-zinc-950 px-2 py-0.5 rounded text-xs border border-gray-200 dark:border-zinc-800 transition-colors duration-300">x{item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
