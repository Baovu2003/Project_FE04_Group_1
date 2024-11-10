import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Table, Statistic } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface Order {
  _id: string;
  user_id: string;
  userInfo: {
    email: string;
    fullname: string;
    phone: string;
    address: string;
  };
  products: {
    product_id: string;
    quantity: number;
    price: number;
    discountPercentage: number;
  }[];
  paymentMethod: string;
  status: string;
  total: number;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [pendingOrders, setPendingOrders] = useState<number>(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/order", {
          withCredentials: true, // Đảm bảo gửi cookie cùng yêu cầu
        });
        console.log("Fetched Orders:", response.data);
        const ordersData = response.data;

        setOrders(ordersData);
        
        // Calculate total revenue and pending orders
        const totalRev = ordersData.reduce((sum: number, order: Order) => sum + order.total, 0);
        const pendingCount = ordersData.filter((order: Order) => order.status === 'pending').length;

        setTotalRevenue(totalRev);
        setPendingOrders(pendingCount);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Customer Name',
      dataIndex: ['userInfo', 'fullname'],
      key: 'fullname',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => `$${total.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Revenue" value={totalRevenue} prefix="$" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Orders" value={orders.length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Pending Orders" value={pendingOrders} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="Revenue Chart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Recent Orders">
            <Table
              dataSource={orders.slice(-5)} // Display the 5 most recent orders
              columns={columns}
              rowKey="_id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
