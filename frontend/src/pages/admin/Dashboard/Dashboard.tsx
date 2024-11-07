import React from 'react';
import { Card, Row, Col, Table, Typography, Space } from 'antd';
import { UserOutlined, ShopOutlined, FileTextOutlined, DollarOutlined } from '@ant-design/icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => (
  <Card bodyStyle={{ padding: '20px' }}>
    <Space direction="horizontal" size="middle">
      <div style={{ backgroundColor: color, padding: '8px', borderRadius: '8px' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '14px', color: '#8c8c8c' }}>{title}</div>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{value}</div>
      </div>
    </Space>
  </Card>
);

const Dashboard: React.FC = () => {
  // Sample data for the area chart
  const chartData = [
    { month: 'Jan', sales: 100, purchase: 50 },
    { month: 'Feb', sales: 120, purchase: 65 },
    { month: 'Mar', sales: 140, purchase: 70 },
    { month: 'Apr', sales: 130, purchase: 85 },
    { month: 'May', sales: 110, purchase: 60 },
    { month: 'Jun', sales: 90, purchase: 45 },
    { month: 'Jul', sales: 120, purchase: 70 },
    { month: 'Aug', sales: 130, purchase: 75 },
    { month: 'Sep', sales: 100, purchase: 60 },
  ];

  // Recent products columns
  const recentProductsColumns = [
    { title: '#', dataIndex: 'id', key: 'id' },
    { title: 'Products', dataIndex: 'name', key: 'name' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
  ];

  const recentProductsData = [
    { id: 1, name: 'Lenovo 3rd Generation', price: '$12500' },
    { id: 2, name: 'Nike V3.2', price: '$1600' },
    { id: 3, name: 'Nike Jordan', price: '$2000' },
    { id: 4, name: 'Apple Series 5 Watch', price: '$900' },
  ];

  // Expired products columns
  const expiredProductsColumns = [
    { title: 'Product', dataIndex: 'product', key: 'product' },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'Manufactured Date', dataIndex: 'manufacturedDate', key: 'manufacturedDate' },
    { title: 'Expired Date', dataIndex: 'expiredDate', key: 'expiredDate' },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const expiredProductsData = [
    {
      product: 'Red Premium Hoody',
      sku: 'P1006',
      manufacturedDate: '17 Jan 2023',
      expiredDate: '29 Mar 2023',
    },
    // Add more expired products data as needed
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Metrics Row */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Total Purchase Due"
            value="$307,144"
            icon={<DollarOutlined style={{ color: '#fff' }} />}
            color="#ff9f43"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Total Sales Due"
            value="$4,285"
            icon={<DollarOutlined style={{ color: '#fff' }} />}
            color="#00cfe8"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Total Sales Amount"
            value="$38,565.5"
            icon={<DollarOutlined style={{ color: '#fff' }} />}
            color="#1b2850"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MetricCard
            title="Total Expense Amount"
            value="$40,000"
            icon={<DollarOutlined style={{ color: '#fff' }} />}
            color="#28c76f"
          />
        </Col>
      </Row>

      {/* Info Cards Row */}
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ backgroundColor: '#ff9f43', color: 'white' }}>
            <Space>
              <UserOutlined />
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>100</div>
                <div>Customers</div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ backgroundColor: '#00cfe8', color: 'white' }}>
            <Space>
              <ShopOutlined />
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>110</div>
                <div>Suppliers</div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ backgroundColor: '#1b2850', color: 'white' }}>
            <Space>
              <FileTextOutlined />
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>150</div>
                <div>Purchase Invoice</div>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ backgroundColor: '#28c76f', color: 'white' }}>
            <Space>
              <FileTextOutlined />
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>170</div>
                <div>Sales Invoice</div>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Chart Section */}
      <Card style={{ marginTop: '24px' }}>
        <Title level={5}>Purchase & Sales</Title>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="purchase" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Tables Section */}
      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <Card title="Recent Products">
            <Table
              columns={recentProductsColumns}
              dataSource={recentProductsData}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Expired Products">
            <Table
              columns={expiredProductsColumns}
              dataSource={expiredProductsData}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;