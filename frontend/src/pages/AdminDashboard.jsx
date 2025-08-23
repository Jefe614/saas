import React, { useState } from 'react';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  Palette, 
  Upload, 
  Edit3, 
  Trash2, 
  Plus, 
  Save, 
  Eye, 
  EyeOff, 
  Search, 
  Filter,
  MoreHorizontal,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  UserPlus,
  Bell,
  LogOut,
  Menu,
  X,
  ImageIcon,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star
} from 'lucide-react';

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
    address: '123 Tech Street, Silicon Valley, CA'
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
    customersGrowth: 9.7
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
      dateAdded: '2025-01-15'
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
      dateAdded: '2025-01-10'
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
      dateAdded: '2025-01-05'
    }
  ]);

  // Sample orders data
  const [orders] = useState([
    { id: '#12345', customer: 'John Doe', total: 1199, status: 'Completed', date: '2025-01-20' },
    { id: '#12346', customer: 'Jane Smith', total: 349, status: 'Processing', date: '2025-01-19' },
    { id: '#12347', customer: 'Mike Johnson', total: 2298, status: 'Shipped', date: '2025-01-18' }
  ]);

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'customize', label: 'Customize Store', icon: Palette },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Handle store config changes
  const handleConfigChange = (field, value) => {
    setStoreConfig(prev => ({
      ...prev,
      [field]: value
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
        return <ProductsContent products={products} setProducts={setProducts} />;
      case 'orders':
        return <OrdersContent orders={orders} />;
      case 'customers':
        return <CustomersContent />;
      case 'analytics':
        return <AnalyticsContent analytics={analytics} />;
      case 'customize':
        return <CustomizeContent storeConfig={storeConfig} handleConfigChange={handleConfigChange} handleImageUpload={handleImageUpload} />;
      case 'settings':
        return <SettingsContent storeConfig={storeConfig} handleConfigChange={handleConfigChange} />;
      default:
        return <DashboardContent analytics={analytics} orders={orders} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}>
        
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg mb-2 transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : `hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Store Preview Link */}
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">
            <Eye className="w-5 h-5" />
            <span>Preview Store</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all`}>
        {/* Header */}
        <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b h-16 flex items-center justify-between px-6`}>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className={`${sidebarOpen ? 'hidden' : 'block'} lg:hidden`}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold capitalize">{activeTab.replace(/([A-Z])/g, ' $1')}</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
            <Bell className="w-6 h-6 cursor-pointer hover:text-blue-600 transition-colors" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
              <span className="font-medium">Admin</span>
            </div>
            <LogOut className="w-5 h-5 cursor-pointer hover:text-red-600 transition-colors" />
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {renderTabContent()}
        </main>
      </div>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

// Dashboard Content Component
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
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
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

// Products Content Component
const ProductsContent = ({ products, setProducts }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Products</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Stock</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Sales</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">{product.category}</td>
                  <td className="py-4 px-4">${product.price}</td>
                  <td className="py-4 px-4">{product.stock}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">{product.sales}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Customize Content Component
const CustomizeContent = ({ storeConfig, handleConfigChange, handleImageUpload }) => (
  <div className="space-y-8">
    {/* Store Branding */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Store Branding</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Store Name</label>
          <input
            type="text"
            value={storeConfig.storeName}
            onChange={(e) => handleConfigChange('storeName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Store Tagline</label>
          <input
            type="text"
            value={storeConfig.storeTagline}
            onChange={(e) => handleConfigChange('storeTagline', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>

    {/* Hero Section */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Hero Title</label>
          <input
            type="text"
            value={storeConfig.heroTitle}
            onChange={(e) => handleConfigChange('heroTitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
          <textarea
            value={storeConfig.heroSubtitle}
            onChange={(e) => handleConfigChange('heroSubtitle', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Hero Background Image</label>
          <div className="flex items-center space-x-4">
            <img src={storeConfig.heroImage} alt="Hero" className="w-32 h-20 object-cover rounded-lg" />
            <button
              onClick={handleImageUpload}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Change Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Color Theme */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Color Theme</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'].map((color) => (
          <button
            key={color}
            onClick={() => handleConfigChange('primaryColor', color)}
            className={`w-full h-16 rounded-lg border-4 transition-all ${
              storeConfig.primaryColor === color ? 'border-gray-800 scale-105' : 'border-gray-200 hover:scale-102'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>

    {/* Save Button */}
    <div className="flex justify-end">
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
        <Save className="w-4 h-4" />
        <span>Save Changes</span>
      </button>
    </div>
  </div>
);

// Other Content Components (simplified for space)
const OrdersContent = ({ orders }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">All Orders</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-2">Order ID</th>
            <th className="text-left py-2">Customer</th>
            <th className="text-left py-2">Total</th>
            <th className="text-left py-2">Status</th>
            <th className="text-left py-2">Date</th>
            <th className="text-left py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-100 dark:border-gray-700">
              <td className="py-3 font-medium">{order.id}</td>
              <td className="py-3">{order.customer}</td>
              <td className="py-3">${order.total}</td>
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="py-3">{order.date}</td>
              <td className="py-3">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  <Eye className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CustomersContent = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Customer Management</h3>
    <p className="text-gray-600 dark:text-gray-400">Customer management features coming soon...</p>
  </div>
);

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

const SettingsContent = ({ storeConfig, handleConfigChange }) => (
  <div className="space-y-6">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={storeConfig.contactEmail}
            onChange={(e) => handleConfigChange('contactEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={storeConfig.contactPhone}
            onChange={(e) => handleConfigChange('contactPhone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Address</label>
          <textarea
            value={storeConfig.address}
            onChange={(e) => handleConfigChange('address', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  </div>
);

// Stats Card Component
const StatsCard = ({ title, value, growth, icon: Icon, color }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className={`text-sm mt-1 ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {growth >= 0 ? '+' : ''}{growth}% from last month
        </p>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        color === 'green' ? 'bg-green-100 text-green-600' :
        color === 'blue' ? 'bg-blue-100 text-blue-600' :
        color === 'purple' ? 'bg-purple-100 text-purple-600' :
        'bg-orange-100 text-orange-600'
      }`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

export default AdminDashboard;