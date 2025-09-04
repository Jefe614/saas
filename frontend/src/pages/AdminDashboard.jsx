// src/AdminDashboard.js
import React, { useState } from 'react';
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Palette
} from 'lucide-react';
import DashboardContent from './admin/DashboardContent';
import Sidebar from './admin/Sidebar';
import Header from './admin/Header';
import ProductsContent from './admin/ProductsContent';
import OrdersContent from './admin/OrdersContent';
import CustomersContent from './admin/CustomersContent';
import AnalyticsContent from './admin/AnalyticsContent';
import CustomizeContent from './admin/CustomizeContent';
import SettingsContent from './admin/SettingsContent';


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Store configuration state
  const [storeConfig, setStoreConfig] = useState({
    storeName: 'TechHub Store',
    storeTagline: 'Your Technology Partner',
    heroTitle: 'Latest Tech Products at Best Prices',
    heroSubtitle: 'Discover cutting-edge technology, electronics, and gadgets.',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
    primaryColor: '#3B82F6',
    businessType: 'Electronics',
    contactEmail: 'info@techhub.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Tech Street, Silicon Valley, CA',
  });

  // Sample analytics data
  const [analytics] = useState({
    totalSales: 45280,
    totalOrders: 342,
    totalProducts: 156,
    totalCustomers: 1247,
    salesGrowth: 12.5,
    ordersGrowth: 8.3,
    productsGrowth: 15.2,
    customersGrowth: 9.7,
  });

  // Sample products data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      category: 'Smartphones',
      price: 1199,
      stock: 25,
      status: 'Active',
      sales: 45,
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=150&h=150&fit=crop',
      dateAdded: '2025-01-15',
    },
    {
      id: 2,
      name: 'MacBook Air M3',
      category: 'Laptops',
      price: 1099,
      stock: 12,
      status: 'Active',
      sales: 32,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150&h=150&fit=crop',
      dateAdded: '2025-01-10',
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5',
      category: 'Audio',
      price: 349,
      stock: 0,
      status: 'Out of Stock',
      sales: 78,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
      dateAdded: '2025-01-05',
    },
  ]);

  // Sample orders data
  const [orders] = useState([
    { id: '#12345', customer: 'John Doe', total: 1199, status: 'Completed', date: '2025-01-20' },
    { id: '#12346', customer: 'Jane Smith', total: 349, status: 'Processing', date: '2025-01-19' },
    { id: '#12347', customer: 'Mike Johnson', total: 2298, status: 'Shipped', date: '2025-01-18' },
  ]);

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'customize', label: 'Customize Store', icon: Palette },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Handle store config changes
  const handleConfigChange = (field, value) => {
    setStoreConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle image upload simulation
  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          handleConfigChange('heroImage', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Render different tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent analytics={analytics} orders={orders} />;
      case 'products':
        return <ProductsContent products={products} setProducts={setProducts} isDarkMode={isDarkMode} />;
      // case 'orders':
      //   return <OrdersContent orders={orders} />;
      // case 'customers':
      //   return <CustomersContent />;
      // case 'analytics':
      //   return <AnalyticsContent analytics={analytics} />;
      // case 'customize':
      //   return (
      //     <CustomizeContent
      //       storeConfig={storeConfig}
      //       handleConfigChange={handleConfigChange}
      //       handleImageUpload={handleImageUpload}
      //     />
      //   );
      // case 'settings':
      //   return <SettingsContent storeConfig={storeConfig} handleConfigChange={handleConfigChange} />;
      default:
        return <DashboardContent analytics={analytics} orders={orders} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
      />
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all`}>
        <Header
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <main className="p-6">{renderTabContent()}</main>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;