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
  const { orders, updateOrderStatus } = useStore();
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // minimum distance before drag starts (helps click events pass through)
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

    // Check if dropping onto a column itself (when empty or dropping in empty space)
    if (COLUMNS.includes(overId)) {
      if (activeOrder.status !== overId) {
        updateOrderStatus(activeOrderId, overId);
      }
      return;
    }

    // Check if dropping over another card
    const overOrder = orders.find(o => o.id === overId);
    if (overOrder && overOrder.status !== activeOrder.status) {
      updateOrderStatus(activeOrderId, overOrder.status);
    }
  };

  // Organize orders into their respective columns
  const ordersByStatus = COLUMNS.reduce((acc, status) => {
    acc[status] = orders.filter(order => order.status === status);
    acc[status].sort((a, b) => new Date(b.date) - new Date(a.date));
    return acc;
  }, {});

  const activeOrder = activeId ? orders.find(o => o.id === activeId) : null;

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-3xl font-bold text-white tracking-tight">Kanban Board</h1>
        <p className="text-gray-400 mt-2">Drag and drop orders across columns to update their status.</p>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4 custom-scrollbar">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-3 md:gap-4 lg:gap-6 h-full items-stretch w-full px-1">
            {COLUMNS.map(status => (
              <KanbanColumn 
                key={status}
                id={status}
                title={status}
                orders={ordersByStatus[status]}
              />
            ))}
          </div>

          {/* This overlay renders the card being dragged so it visually detaches from the list */}
          <DragOverlay dropAnimation={{ duration: 250, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
            {activeOrder ? <OrderCard order={activeOrder} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Orders;
