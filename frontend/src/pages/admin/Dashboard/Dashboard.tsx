// types.ts
interface UserInfo {
  email: string;
  fullname: string;
  phone: string;
  address: string;
}

interface Product {
  _id: string;
  product_id: string;
  quantity: number;
  price: number;
  discountPercentage: number;
}

interface Order {
  _id: string;
  user_id: string;
  userInfo: UserInfo;
  products: Product[];
  paymentMethod: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  activeOrders: number;
  averageOrderValue: number;
  recentOrders: Order[];
  chartData: { date: string; orders: number }[];
}

// OrderDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col, Table, Tag, Statistic, Spin, Alert } from 'antd';
import { 
  DollarCircleOutlined, 
  ShoppingCartOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons';
import { Area, AreaChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    activeOrders: 0,
    averageOrderValue: 0,
    recentOrders: [],
    chartData: []
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>('http://localhost:5000/admin/order');
      const ordersData = response.data;
      setOrders(ordersData);
      calculateStats(ordersData);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch orders');
      setLoading(false);
    }
  };

  const calculateStats = (ordersData: Order[]) => {
    const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = ordersData.filter(order => order.status === 'pending').length;
    const activeOrders = ordersData.filter(order => order.status === 'active').length;
    const averageOrderValue = ordersData.length ? totalRevenue / ordersData.length : 0;

    // Get daily orders data
    const dailyOrders = ordersData.reduce((acc: { [key: string]: number }, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(dailyOrders).map(([date, orders]) => ({
      date,
      orders
    }));

    setStats({
      totalRevenue,
      totalOrders: ordersData.length,
      pendingOrders,
      activeOrders,
      averageOrderValue,
      recentOrders: ordersData.slice(0, 5),
      chartData
    });
  };

  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: 'userInfo',
      key: 'userInfo',
      render: (userInfo: UserInfo) => (
        <div>
          <div>{userInfo.fullname}</div>
          <div style={{ color: '#666' }}>{userInfo.email}</div>
        </div>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => (
        <span>{total.toLocaleString()}đ</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'pending' ? 'gold' : 'green'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
  ];

  if (loading) return <Spin size="large" className="flex justify-center items-center h-screen" />;
  if (error) return <Alert message={error} type="error" />;

  return (
    <Layout>
      <Content className="p-6">
        <Row gutter={[16, 16]}>
          {/* Stats Cards */}
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng doanh thu"
                value={stats.totalRevenue}
                prefix={<DollarCircleOutlined />}
                suffix="đ"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng đơn hàng"
                value={stats.totalOrders}
                prefix={<ShoppingCartOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Đơn hàng đang chờ"
                value={stats.pendingOrders}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Đơn hàng hoạt động"
                value={stats.activeOrders}
                prefix={<CheckCircleOutlined />}
              />
            </Card>
          </Col>

          {/* Charts */}
          <Col xs={24} lg={12}>
            <Card title="Đơn hàng theo ngày">
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#1890ff" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Xu hướng doanh thu">
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={orders.map(order => ({
                      date: new Date(order.createdAt).toLocaleDateString(),
                      revenue: order.total
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#1890ff" fill="#1890ff" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>

          {/* Recent Orders Table */}
          <Col span={24}>
            <Card title="Đơn hàng gần đây">
              <Table
                columns={columns}
                dataSource={orders}
                rowKey="_id"
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;