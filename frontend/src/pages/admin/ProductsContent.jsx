// src/components/ProductsContent.js
import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { message, Modal, Spin } from 'antd';
import ProductModal from './Modals/ProductModal';
import api from '../../api/axios';

const ProductsContent = ({ isDarkMode }) => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/products/');
        console.log('response', response.data);

        setProducts(response.data.products || []);
      } catch (err) {
        message.error(err.response?.data?.error || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Save product (create or update)
  const handleSaveProduct = async (formData, productId) => {
    setLoading(true);
    try {
      if (productId) {
        const response = await api.put(`/api/products/${productId}/`, formData);
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? response.data : p))
        );
        message.success('Product updated successfully');
      } else {
        const response = await api.post('/api/products/', formData);
        setProducts((prev) => [...prev, response.data]);
        message.success('Product created successfully');
      }
    } catch (err) {
      message.error(err.response?.data?.error || 'Failed to save product');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    setLoading(true);
    try {
      await api.delete(`/api/products/${productToDelete.id}/`);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      message.success('Product deleted successfully');
    } catch (err) {
      message.error(err.response?.data?.error || 'Failed to delete product');
    } finally {
      setLoading(false);
      setDeleteModalVisible(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Products</h3>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left py-3 px-4">Product</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Sales</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  {/* Product Image + Name */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4">
                    {product.category || product.primary_category || 'N/A'}
                  </td>

                  {/* Price */}
                  <td className="py-4 px-4">{product.price}</td>

                  {/* Status */}
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.is_available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.is_available ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  {/* Sales */}
                  <td className="py-4 px-4">{product.reviews_count || 0}</td>

                  {/* Actions */}
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsModalOpen(true);
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setProductToDelete(product);
                          setDeleteModalVisible(true);
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-red-600"
                      >
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

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleSaveProduct}
        product={selectedProduct}
        isDarkMode={isDarkMode}
        loading={loading}
      />

      {/* Delete Modal */}
      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDeleteProduct}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
        confirmLoading={loading}
      >
        <p>Are you sure you want to delete "{productToDelete?.name}"?</p>
        <p className="text-red-600">This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default ProductsContent;
