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
      case 'Received': return 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]';
      case 'Washing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]';
      case 'Drying': return 'bg-orange-500/10 text-orange-400 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)]';
      case 'Ready': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]';
      case 'Delivered': return 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]';
      default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
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
      className={`bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-5 border shadow-lg hover:shadow-xl transition-all cursor-grab active:cursor-grabbing group ${
        isDragging ? 'border-blue-500 ring-2 ring-blue-500/50 scale-105' : 'border-zinc-800/80 hover:border-zinc-700/80'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950/80 px-2 py-1 rounded-md pointer-events-none border border-zinc-800">
              {order.id}
            </span>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md border flex items-center uppercase tracking-wider ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              {order.status}
            </span>
          </div>
          <h4 className="text-white font-bold text-lg pointer-events-none tracking-tight">{order.customer}</h4>
        </div>
        <div className="text-right pointer-events-none">
          <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">₹{order.total}</p>
          <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider font-semibold">
            {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="border-t border-zinc-800/80 pt-4 mt-4 pointer-events-none">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Order Items</p>
          <MoreHorizontal className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        </div>
        <div className="space-y-2.5">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center text-sm text-zinc-300">
              <div className="w-6 h-6 rounded-md bg-zinc-800 flex items-center justify-center mr-3 border border-zinc-700">
                <Shirt className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <span className="flex-1 font-medium">{item.name}</span>
              <span className="text-zinc-500 font-bold bg-zinc-950 px-2 py-0.5 rounded text-xs border border-zinc-800">x{item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
