import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import OrderCard from './OrderCard';

const KanbanColumn = ({ id, title, orders }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div className={`flex flex-col flex-1 min-w-[340px] max-w-[380px] bg-white/50 dark:bg-zinc-900/30 backdrop-blur-md rounded-2xl overflow-hidden border transition-colors duration-300 ${
      isOver ? 'border-blue-400 dark:border-blue-500/50 bg-white dark:bg-zinc-900/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'border-gray-200 dark:border-zinc-800/60'
    }`}>
      <div className="p-4 border-b border-gray-200 dark:border-zinc-800/60 flex items-center justify-between bg-white dark:bg-zinc-900/50 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            title === 'Received' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' :
            title === 'Washing' ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]' :
            title === 'Drying' ? 'bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]' :
            title === 'Ready' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' :
            'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]'
          }`} />
          <h3 className="font-bold text-gray-900 dark:text-white tracking-wide transition-colors duration-300">{title}</h3>
        </div>
        <span className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300 text-xs px-3 py-1 rounded-lg font-bold border border-gray-200 dark:border-zinc-700 shadow-inner transition-colors duration-300">
          {orders.length}
        </span>
      </div>

      <div 
        ref={setNodeRef}
        className="flex-1 p-4 overflow-y-auto min-h-[500px] custom-scrollbar"
      >
        <div className="space-y-4 h-full">
          <SortableContext 
            items={orders.map(order => order.id)} 
            strategy={verticalListSortingStrategy}
          >
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </SortableContext>
          {orders.length === 0 && !isOver && (
            <div className="h-full flex items-center justify-center text-gray-400 dark:text-zinc-600 font-medium text-sm border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-xl p-8 text-center mt-4 transition-colors duration-300">
              Drop orders here
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
