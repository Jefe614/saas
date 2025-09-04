// src/components/AnalyticsContent.js
import React from 'react';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';
import StatsCard from './StatsCard';

const AnalyticsContent = ({ analytics }) => (
  <div className="space-y-6">
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Detailed Analytics</h3>
      <p className="text-gray-600 dark:text-gray-400">Advanced analytics charts and reports coming soon...</p>
    </div>
  </div>
);

export default AnalyticsContent;