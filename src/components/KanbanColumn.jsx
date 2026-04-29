import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import OrderCard from './OrderCard';

const KanbanColumn = ({ id, title, orders }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div className="flex flex-col flex-1 min-w-[320px] bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700/50">
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
        <h3 className="font-semibold text-white">{title}</h3>
        <span className="bg-gray-700 text-gray-300 text-xs px-2.5 py-1 rounded-full font-medium">
          {orders.length}
        </span>
      </div>

      <div 
        ref={setNodeRef}
        className={`flex-1 p-4 overflow-y-auto min-h-[400px] transition-colors ${
          isOver ? 'bg-gray-700/20' : ''
        }`}
      >
        <div className="space-y-4">
          <SortableContext 
            items={orders.map(order => order.id)} 
            strategy={verticalListSortingStrategy}
          >
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
