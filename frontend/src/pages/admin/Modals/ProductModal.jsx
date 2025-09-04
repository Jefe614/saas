// src/components/ProductModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Checkbox, Button, Upload, Select, Row, Col, message } from 'antd';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const badgeOptions = [
  { label: 'Best Seller', value: 'best_seller' },
  { label: 'New Arrival', value: 'new_arrival' },
  { label: 'Sale', value: 'sale' },
  { label: 'Popular', value: 'popular' },
  { label: 'Limited', value: 'limited' },
  { label: 'Out of Stock', value: 'out_of_stock' },
];

const ProductModal = ({ isOpen, onClose, onSubmit, product, isDarkMode }) => {
  const isEditMode = !!product;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log('isDarkMode in ProductModal:', isDarkMode);

  // Load categories from API
  useEffect(() => {
    axios
      .get('/api/categories/') // Adjust endpoint if needed
      .then((res) => {
        const categoryData = res.data.map((cat) => ({
          label: cat.name,
          value: cat.id,
        }));
        setCategories(categoryData);
      })
      .catch(() => {
        message.error('Failed to load categories');
      });
  }, []);

  // Pre-fill form for edit mode
  useEffect(() => {
    if (isEditMode && product) {
      form.setFieldsValue({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        originalPrice: product.original_price || '',
        rating: product.rating || 0,
        reviews: product.reviews_count || 0,
        inStock: product.is_available !== undefined ? product.is_available : true,
        badge: product.badge || null,
        categories: product.categories ? product.categories.map((c) => c.id) : [],
      });

      // Preload image in Upload
      if (product.image) {
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: product.image,
          },
        ]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [product, isEditMode, form]);

  const handleSubmit = (values) => {
    const imageUrl = fileList[0]?.url || fileList[0]?.response?.url || '';
    const formData = {
      ...values,
      image: imageUrl,
    };
    onSubmit(formData, isEditMode ? product.id : null);
    onClose();
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Modal
      title={isEditMode ? 'Edit Product' : 'Add Product'}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={800}
      className={isDarkMode ? 'ant-modal-dark' : ''} // Custom class for dark mode
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: '',
          description: '',
          price: '',
          originalPrice: '',
          rating: 0,
          reviews: 0,
          inStock: true,
          badge: null,
          categories: [],
        }}
        className={isDarkMode ? 'dark' : ''} // Apply dark mode class to form
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter the product name' }]}
            >
              <Input
                placeholder="Enter product name"
                className={isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : ''}
              />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <InputNumber
                min={0}
                step={0.01}
                placeholder="Enter price"
                style={{ width: '100%' }}
                className={isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : ''}
              />
            </Form.Item>

            <Form.Item name="originalPrice" label="Original Price">
              <InputNumber
                min={0}
                step={0.01}
                placeholder="Enter original price"
                style={{ width: '100%' }}
                className={isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : ''}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="rating" label="Rating (0-5)">
              <InputNumber
                min={0}
                max={5}
                step={0.1}
                style={{ width: '100%' }}
                className={isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : ''}
              />
            </Form.Item>

            <Form.Item name="reviews" label="Reviews Count">
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                className={isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : ''}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="badge" label="Badge">
              <Select
                placeholder="Select badge"
                allowClear
                options={badgeOptions}
                className={isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : ''}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="categories" label="Categories">
              <Select
                mode="multiple"
                placeholder="Select categories"
                options={categories}
                allowClear
                className={isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : ''}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="inStock" valuePropName="checked">
              <Checkbox className={isDarkMode ? 'dark:text-white' : ''}>In Stock</Checkbox>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Image">
              <Upload
                listType="picture"
                fileList={fileList}
                onChange={handleImageChange}
                beforeUpload={() => false} // Prevent auto-upload
                className={isDarkMode ? 'dark:text-white' : ''}
              >
                <Button
                  icon={<UploadOutlined />}
                  className={isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : ''}
                >
                  Upload Image
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="description" label="Description">
          <Input.TextArea
            rows={3}
            placeholder="Enter product description"
            className={isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : ''}
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end space-x-2">
            <Button
              onClick={onClose}
              className={isDarkMode ? 'dark:bg-gray-700 dark:border-gray-600 dark:text-white' : ''}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              className={isDarkMode ? 'dark:bg-blue-600 dark:text-white' : ''}
            >
              Save
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;