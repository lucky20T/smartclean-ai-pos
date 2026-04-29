import { Shirt, CheckCircle2, Clock, Loader2, Wind, Truck } from 'lucide-react';
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
    opacity: isDragging ? 0.4 : 1,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Received': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Washing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Drying': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Ready': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Delivered': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Received': return <Clock className="w-4 h-4 mr-1.5" />;
      case 'Washing': return <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />;
      case 'Drying': return <Wind className="w-4 h-4 mr-1.5" />;
      case 'Ready': return <CheckCircle2 className="w-4 h-4 mr-1.5" />;
      case 'Delivered': return <Truck className="w-4 h-4 mr-1.5" />;
      default: return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-gray-800 rounded-xl p-5 border shadow-md hover:border-gray-500 hover:-translate-y-1 transition-all cursor-grab active:cursor-grabbing ${
        isDragging ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-gray-700'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-gray-400 bg-gray-900 px-2 py-1 rounded pointer-events-none">
              {order.id}
            </span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border flex items-center ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              {order.status}
            </span>
          </div>
          <h4 className="text-white font-semibold pointer-events-none">{order.customer}</h4>
        </div>
        <div className="text-right pointer-events-none">
          <p className="text-xl font-bold text-emerald-400">₹{order.total}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700/50 pt-4 mt-4 pointer-events-none">
        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">Items</p>
        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center text-sm text-gray-300">
              <Shirt className="w-4 h-4 text-gray-500 mr-2" />
              <span className="flex-1">{item.name}</span>
              <span className="text-gray-500 font-medium">x{item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
