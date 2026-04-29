import { DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';
import useStore from '../store/useStore';
import StatCard from '../components/StatCard';
import OrderCard from '../components/OrderCard';

const Dashboard = () => {
  const { totalRevenue, activeOrders, orders } = useStore();
  const recentOrders = orders.slice(0, 4);

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
          value={`$${totalRevenue.toLocaleString()}`} 
          icon={DollarSign} 
          trend="+12% this week"
        />
        <StatCard 
          title="Active Orders" 
          value={activeOrders} 
          icon={ShoppingBag} 
          trend="+3 new today"
        />
        <StatCard 
          title="Growth" 
          value="24%" 
          icon={TrendingUp} 
          trend="vs last month"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Recent Orders</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {recentOrders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
