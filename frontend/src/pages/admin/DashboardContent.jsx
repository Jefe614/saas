// src/components/DashboardContent.js
import React from 'react';
import StatsCard from './StatsCard';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';

const DashboardContent = ({ analytics, orders }) => (
  <div className="space-y-6">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Sales"
        value={`$${analytics.totalSales.toLocaleString()}`}
        growth={analytics.salesGrowth}
        icon={DollarSign}
        color="green"
      />
      <StatsCard
        title="Orders"
        value={analytics.totalOrders}
        growth={analytics.ordersGrowth}
        icon={ShoppingCart}
        color="blue"
      />
      <StatsCard
        title="Products"
        value={analytics.totalProducts}
        growth={analytics.productsGrowth}
        icon={Package}
        color="purple"
      />
      <StatsCard
        title="Customers"
        value={analytics.totalCustomers}
        growth={analytics.customersGrowth}
        icon={Users}
        color="orange"
      />
    </div>

    {/* Recent Orders */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Total</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-3 font-medium">{order.id}</td>
                <td className="py-3">{order.customer}</td>
                <td className="py-3">${order.total}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default DashboardContent;