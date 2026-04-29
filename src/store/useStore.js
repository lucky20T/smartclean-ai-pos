import { create } from 'zustand';

const useStore = create((set) => ({
  totalRevenue: 12500,
  activeOrders: 14,
  orders: [
    {
      id: 'ORD-001',
      customer: 'Alice Johnson',
      items: [{ name: 'Shirts', quantity: 2 }, { name: 'Jacket', quantity: 1 }],
      total: 45,
      status: 'Ready',
      date: new Date().toISOString()
    },
    {
      id: 'ORD-002',
      customer: 'Bob Smith',
      items: [{ name: 'Pants', quantity: 3 }],
      total: 30,
      status: 'Washing',
      date: new Date().toISOString()
    },
    {
      id: 'ORD-003',
      customer: 'Charlie Brown',
      items: [{ name: 'Suit', quantity: 1 }],
      total: 25,
      status: 'Pending',
      date: new Date().toISOString()
    }
  ],
  addOrder: (order) => set((state) => ({
    orders: [order, ...state.orders],
    activeOrders: state.activeOrders + 1,
    totalRevenue: state.totalRevenue + order.total
  })),
  updateOrderStatus: (id, newStatus) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    )
  }))
}));

export default useStore;
