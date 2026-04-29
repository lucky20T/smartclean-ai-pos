import { IndianRupee, ShoppingBag, TrendingUp } from 'lucide-react';
import useStore from '../store/useStore';
import StatCard from '../components/StatCard';
import OrderCard from '../components/OrderCard';

const Dashboard = () => {
  const { orders, searchQuery } = useStore();
  
  // Filter orders based on search query
  const filteredOrders = orders.filter(order => {
    const query = searchQuery.toLowerCase();
    return order.customer.toLowerCase().includes(query) || 
           order.id.toLowerCase().includes(query) ||
           order.items.some(item => item.name.toLowerCase().includes(query));
  });

  const displayOrders = searchQuery ? filteredOrders : filteredOrders.slice(0, 4);

  // Dynamic calculations based on real input data
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const activeOrders = orders.filter(order => order.status !== 'Delivered').length;
  
  // Calculate today's specific stats for trends
  const today = new Date().toDateString();
  const todaysOrders = orders.filter(order => new Date(order.date).toDateString() === today);
  const todayRevenue = todaysOrders.reduce((sum, order) => sum + order.total, 0);
  
  // Calculate dynamic growth metrics
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const todayRevenuePercentage = totalRevenue > 0 ? Math.round((todayRevenue / totalRevenue) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto py-8 px-2 relative">
      {/* Subtle background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-lg">Monitor your laundry business at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard 
          title="Total Revenue" 
          value={`₹${totalRevenue.toLocaleString()}`} 
          icon={IndianRupee} 
          trend={`+₹${todayRevenue} today`}
        />
        <StatCard 
          title="Active Orders" 
          value={activeOrders} 
          icon={ShoppingBag} 
          trend={`+${todaysOrders.length} new today`}
        />
        <StatCard 
          title="Avg Order Value" 
          value={`₹${avgOrderValue}`} 
          icon={TrendingUp} 
          trend={`${todayRevenuePercentage}% of total revenue today`}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {searchQuery ? 'Search Results' : 'Recent Orders'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {displayOrders.length > 0 ? (
            displayOrders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white/50 dark:bg-zinc-900/30 rounded-2xl border border-dashed border-gray-300 dark:border-zinc-800">
              <p className="text-gray-500 dark:text-zinc-400 text-lg">No orders found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
