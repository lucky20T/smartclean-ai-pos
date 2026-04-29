import { DollarSign, ShoppingBag, TrendingUp } from 'lucide-react';
import useStore from '../store/useStore';
import StatCard from '../components/StatCard';
import OrderCard from '../components/OrderCard';

const Dashboard = () => {
  const { totalRevenue, activeOrders, orders } = useStore();
  const recentOrders = orders.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-400 mt-2">Monitor your laundry business at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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
          <h2 className="text-xl font-bold text-white">Recent Orders</h2>
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
