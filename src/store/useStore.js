import { create } from 'zustand';

const useStore = create((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  notifications: [
    { id: 'notif-initial', message: 'Welcome to SmartClean AI POS!', isNew: true, time: new Date().toISOString() }
  ],
  markNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, isNew: false }))
  })),
  clearNotifications: () => set({ notifications: [] }),

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
      status: 'Received',
      date: new Date().toISOString()
    }
  ],
  addOrder: (order) => set((state) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      message: `New order ${order.id} received for ${order.customer}.`,
      isNew: true,
      time: new Date().toISOString()
    };
    return {
      orders: [order, ...state.orders],
      notifications: [newNotif, ...state.notifications]
    };
  }),
  updateOrderStatus: (id, newStatus) => set((state) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      message: `Order ${id} moved to ${newStatus}.`,
      isNew: true,
      time: new Date().toISOString()
    };
    return {
      orders: state.orders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      ),
      notifications: [newNotif, ...state.notifications]
    };
  })
}));

export default useStore;
