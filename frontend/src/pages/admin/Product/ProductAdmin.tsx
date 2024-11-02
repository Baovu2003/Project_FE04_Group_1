import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, Upload, message, Pagination, Space  } from 'antd';
import { EyeOutlined, EditOutlined, InboxOutlined, UndoOutlined, UploadOutlined, SearchOutlined  } from '@ant-design/icons';
import type { UploadProps } from 'antd';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  description: string;
  discount: number;
  image: string;
  status: 'Active' | 'Archived';
}

interface Category {
  id: string;
  name: string;
}

const { Option } = Select;

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch products and categories from API
    // This is a placeholder. Replace with actual API calls.
    setProducts([
      { id: '1', name: 'Product 1', price: 10, category: 'Category 1', quantity: 100, description: 'Description 1', discount: 0, image: 'image1.jpg', status: 'Active' },
      { id: '2', name: 'Product 2', price: 20, category: 'Category 2', quantity: 200, description: 'Description 2', discount: 5, image: 'image2.jpg', status: 'Archived' },
      { id: '2', name: 'Product 2', price: 20, category: 'Category 2', quantity: 200, description: 'Description 2', discount: 5, image: 'image2.jpg', status: 'Archived' },
      { id: '2', name: 'Product 2', price: 20, category: 'Category 2', quantity: 200, description: 'Description 2', discount: 5, image: 'image2.jpg', status: 'Archived' },
      { id: '1', name: 'Product 1', price: 10, category: 'Category 1', quantity: 100, description: 'Description 1', discount: 0, image: 'image1.jpg', status: 'Active' },
      { id: '1', name: 'Product 1', price: 10, category: 'Category 1', quantity: 100, description: 'Description 1', discount: 0, image: 'image1.jpg', status: 'Active' },
      { id: '1', name: 'Product 1', price: 10, category: 'Category 1', quantity: 100, description: 'Description 1', discount: 0, image: 'image1.jpg', status: 'Active' },
      { id: '1', name: 'Product 1', price: 10, category: 'Category 1', quantity: 100, description: 'Description 1', discount: 0, image: 'image1.jpg', status: 'Active' },
    ]);
    setCategories([
      { id: '1', name: 'Category 1' },
      { id: '2', name: 'Category 2' },
    ]);
    setTotalPages(10); // Placeholder value
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Manage',
      key: 'action',
      render: (text: string, record: Product) => (
        <span>
          <Button icon={<EyeOutlined />} onClick={() => showDetailModal(record)} />
          <Button icon={<EditOutlined />} onClick={() => showUpdateModal(record)} />
          {record.status === 'Active' ? (
            <Button icon={<InboxOutlined />} onClick={() => confirmArchive(record.id)} />
          ) : (
            <Button icon={<UndoOutlined />} onClick={() => confirmUnarchive(record.id)} />
          )}
        </span>
      ),
    },
  ];

  const showDetailModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailModalVisible(true);
  };

  const showUpdateModal = (product: Product) => {
    setSelectedProduct(product);
    form.setFieldsValue(product);
    setIsUpdateModalVisible(true);
  };

  const showAddModal = () => {
    form.resetFields();
    setIsAddModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      // Handle form submission (add or update product)
      console.log('Form values:', values);
      setIsUpdateModalVisible(false);
      setIsAddModalVisible(false);
      message.success('Product updated successfully');
    });
  };

  const confirmArchive = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to archive this item?',
      onOk() {
        // Handle archive action
        console.log('Archiving product:', id);
      },
    });
  };

  const confirmUnarchive = (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to unarchive this item?',
      onOk() {
        // Handle unarchive action
        console.log('Unarchiving product:', id);
      },
    });
  };

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching for:', searchTerm);
    // You would typically filter the products based on the search term
    // and update the state accordingly
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h4>Manage Product</h4>
          <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
            <Button type="primary" onClick={showAddModal}>
              Add Product
            </Button>
            <Space>
              <Input
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onPressEnter={handleSearch}
              />
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                Search
              </Button>
            </Space>
          </Space>
          <Table columns={columns} dataSource={products} pagination={false} />
          <Pagination
            current={currentPage}
            total={totalPages * 10}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: 16, textAlign: 'center' }}
          />
        </div>
      </div>

      <Modal
        title="Product Details"
        visible={isDetailModalVisible}
        onOk={() => setIsDetailModalVisible(false)}
        onCancel={() => setIsDetailModalVisible(false)}
      >
        {selectedProduct && (
          <Form layout="vertical">
            <Form.Item label="ID">
              <Input value={selectedProduct.id} readOnly />
            </Form.Item>
            <Form.Item label="Name">
              <Input value={selectedProduct.name} readOnly />
            </Form.Item>
            <Form.Item label="Category">
              <Input value={selectedProduct.category} readOnly />
            </Form.Item>
            <Form.Item label="Price">
              <Input value={selectedProduct.price} readOnly />
            </Form.Item>
            <Form.Item label="Quantity">
              <Input value={selectedProduct.quantity} readOnly />
            </Form.Item>
            <Form.Item label="Description">
              <Input.TextArea value={selectedProduct.description} readOnly />
            </Form.Item>
            <Form.Item label="Discount">
              <Input value={selectedProduct.discount} readOnly />
            </Form.Item>
            <Form.Item label="Image">
              <Input value={selectedProduct.image} readOnly />
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Modal
        title={isUpdateModalVisible ? "Update Product" : "Add New Product"}
        visible={isUpdateModalVisible || isAddModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsUpdateModalVisible(false);
          setIsAddModalVisible(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" label="ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select>
              {categories.map(category => (
                <Option key={category.id} value={category.id}>{category.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="quantity" label="Quantity">
            <InputNumber style={{ width: '100%' }} disabled={isUpdateModalVisible} />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="discount" label="Discount">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}