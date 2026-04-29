import { useState } from 'react';
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import useStore from '../store/useStore';
import KanbanColumn from '../components/KanbanColumn';
import OrderCard from '../components/OrderCard';

const COLUMNS = ['Received', 'Washing', 'Drying', 'Ready', 'Delivered'];

const Orders = () => {
  const { orders, updateOrderStatus, searchQuery } = useStore();
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeOrderId = active.id;
    const overId = over.id;

    const activeOrder = orders.find(o => o.id === activeOrderId);
    if (!activeOrder) return;

    if (COLUMNS.includes(overId)) {
      if (activeOrder.status !== overId) {
        updateOrderStatus(activeOrderId, overId);
      }
      return;
    }

    const overOrder = orders.find(o => o.id === overId);
    if (overOrder && overOrder.status !== activeOrder.status) {
      updateOrderStatus(activeOrderId, overOrder.status);
    }
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => {
    const query = (searchQuery || '').toLowerCase();
    return order.customer.toLowerCase().includes(query) || 
           order.id.toLowerCase().includes(query) ||
           order.items.some(item => item.name.toLowerCase().includes(query));
  });

  const ordersByStatus = COLUMNS.reduce((acc, status) => {
    acc[status] = filteredOrders.filter(order => order.status === status);
    acc[status].sort((a, b) => new Date(b.date) - new Date(a.date));
    return acc;
  }, {});

  const activeOrder = activeId ? orders.find(o => o.id === activeId) : null;

  return (
    <div className="max-w-[1800px] mx-auto px-2 py-4 h-full flex flex-col relative">
      <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="mb-8 flex-shrink-0">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 tracking-tight transition-colors duration-300">
          Kanban Board
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-2 text-lg transition-colors duration-300">Drag and drop orders across columns to update their status.</p>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-6 custom-scrollbar">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 md:gap-6 h-full items-stretch w-full px-1">
            {COLUMNS.map(status => (
              <KanbanColumn 
                key={status}
                id={status}
                title={status}
                orders={ordersByStatus[status]}
              />
            ))}
          </div>

          <DragOverlay dropAnimation={{ duration: 250, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
            {activeOrder ? <OrderCard order={activeOrder} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Orders;
