// src/components/ProductModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Checkbox, Button, Upload, Select, Row, Col, message, Spin } from 'antd';
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

const ProductModal = ({ isOpen, onClose, onSubmit, product, isDarkMode, loading }) => {
  const isEditMode = !!product;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Load categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const response = await axios.get('/api/categories/');
        const categoryData = response.data.map((cat) => ({
          label: cat.name,
          value: cat.name,
        }));
        setCategories(categoryData);
      } catch (error) {
        message.error('Failed to load categories');
      } finally {
        setCategoriesLoading(false);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Pre-fill form for edit mode
  useEffect(() => {
    if (isEditMode && product) {
      form.setFieldsValue({
        name: product.name || '',
        description: product.description || '',
        price: product.priceValue || '',
        originalPrice: product.originalPriceValue || '',
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        inStock: product.inStock !== undefined ? product.inStock : true,
        badge: product.badgeValue || null,
        categories: product.categories || [],
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
  }, [product, isEditMode, form, isOpen]);

  const handleSubmit = (values) => {
  const formData = new FormData();
  formData.append("name", values.name);
  formData.append("description", values.description);
  formData.append("price", values.price);
  formData.append("originalPrice", values.originalPrice || "");
  formData.append("rating", values.rating || 0);
  formData.append("reviews", values.reviews || 0);
  formData.append("inStock", values.inStock);
  formData.append("badge", values.badge || "");
  values.categories.forEach((cat) => formData.append("categories", cat));

  if (fileList.length > 0 && fileList[0].originFileObj) {
    formData.append("image", fileList[0].originFileObj); // 👈 actual file
  }

  onSubmit(formData, isEditMode ? product.id : null);
};


  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

 const beforeUpload = (file) => {
  const isAllowedType =
    file.type === "image/jpeg" ||
    file.type === "image/jpg" ||
    file.type === "image/png";

  if (!isAllowedType) {
    message.error("Only JPG/PNG files are allowed!");
    return Upload.LIST_IGNORE; // prevent invalid files
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
    return Upload.LIST_IGNORE;
  }

  return true;
};


  return (
    <Modal
      title={isEditMode ? 'Edit Product' : 'Add Product'}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={800}
      className={isDarkMode ? 'ant-modal-dark' : ''}
    >
      <Spin spinning={categoriesLoading}>
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
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter the product name' }]}
              >
                <Input placeholder="Enter product name" />
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
                />
              </Form.Item>

              <Form.Item name="originalPrice" label="Original Price">
                <InputNumber
                  min={0}
                  step={0.01}
                  placeholder="Enter original price"
                  style={{ width: '100%' }}
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
                />
              </Form.Item>

              <Form.Item name="reviews" label="Reviews Count">
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
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
                  loading={categoriesLoading}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="inStock" valuePropName="checked">
                <Checkbox>In Stock</Checkbox>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Image">
                <Upload
                  listType="picture"
                  fileList={fileList}
                  onChange={handleImageChange}
                  beforeUpload={() => false} 
                  maxCount={1}
                  accept="image/jpeg,image/jpg,image/png"
                >
                  <Button icon={<UploadOutlined />}>
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
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end space-x-2">
              <Button onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
              >
                {isEditMode ? 'Update' : 'Create'} Product
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ProductModal;