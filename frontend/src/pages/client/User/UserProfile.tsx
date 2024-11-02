import React from 'react'
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  List,
  Row,
  Space,
  Tabs,
  Tag,
  Typography
} from 'antd'
import {
  EditOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  CalendarOutlined,
  ShoppingOutlined,
  HeartOutlined,
  SettingOutlined
} from '@ant-design/icons'
import './profile.css'

const { Title, Text } = Typography
const { TabPane } = Tabs

interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  joinDate: string
  avatar?: string
  orders: number
  wishlist: number
}

interface OrderHistory {
  id: string
  date: string
  total: number
  status: 'completed' | 'processing' | 'cancelled'
}

function Profile() {
  const userProfile: UserProfile = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    address: 'Hà Nội, Việt Nam',
    joinDate: '01/01/2023',
    orders: 12,
    wishlist: 5
  }

  const orderHistory: OrderHistory[] = [
    {
      id: 'ORD001',
      date: '2023-10-25',
      total: 1250000,
      status: 'completed'
    },
    {
      id: 'ORD002',
      date: '2023-10-20',
      total: 750000,
      status: 'processing'
    },
    {
      id: 'ORD003',
      date: '2023-10-15',
      total: 500000,
      status: 'cancelled'
    }
  ]

  const getStatusColor = (status: OrderHistory['status']) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'processing':
        return 'processing'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <Card className="profile-header">
        <Row gutter={24} align="middle">
          <Col xs={24} sm={8} md={6} className="profile-avatar-container">
            <Avatar
              size={120}
              icon={<UserOutlined />}
              src={userProfile.avatar}
              className="profile-avatar"
            />
          </Col>
          <Col xs={24} sm={16} md={18}>
            <Space direction="vertical" size="small" className="profile-info">
              <Title level={2}>{userProfile.name}</Title>
              <Space split={<Divider type="vertical" />}>
                <Text>
                  <ShoppingOutlined /> {userProfile.orders} Đơn hàng
                </Text>
                <Text>
                  <HeartOutlined /> {userProfile.wishlist} Yêu thích
                </Text>
                <Text>
                  <CalendarOutlined /> Tham gia {userProfile.joinDate}
                </Text>
              </Space>
              <Button type="primary" icon={<EditOutlined />}>
                Chỉnh sửa thông tin
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Profile Content */}
      <Card className="profile-content">
        <Tabs defaultActiveKey="info">
          <TabPane tab="Thông tin cá nhân" key="info">
            <Descriptions bordered column={{ xs: 1, sm: 2, md: 2 }}>
              <Descriptions.Item label="Họ tên">
                {userProfile.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <MailOutlined /> {userProfile.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                <PhoneOutlined /> {userProfile.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                <EnvironmentOutlined /> {userProfile.address}
              </Descriptions.Item>
            </Descriptions>
          </TabPane>

          <TabPane tab="Lịch sử đơn hàng" key="orders">
            <List
              itemLayout="horizontal"
              dataSource={orderHistory}
              renderItem={(order) => (
                <List.Item
                  actions={[
                    <Button key="view" type="link">
                      Xem chi tiết
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    title={`Đơn hàng #${order.id}`}
                    description={`Ngày đặt: ${order.date}`}
                  />
                  <div className="order-info">
                    <Text strong>
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(order.total)}
                    </Text>
                    <Tag color={getStatusColor(order.status)}>
                      {order.status === 'completed' && 'Hoàn thành'}
                      {order.status === 'processing' && 'Đang xử lý'}
                      {order.status === 'cancelled' && 'Đã hủy'}
                    </Tag>
                  </div>
                </List.Item>
              )}
            />
          </TabPane>

          <TabPane tab="Cài đặt" key="settings">
            <List>
              <List.Item
                actions={[<Button key="change">Thay đổi</Button>]}
              >
                <List.Item.Meta
                  avatar={<SettingOutlined />}
                  title="Mật khẩu"
                  description="Thay đổi mật khẩu đăng nhập của bạn"
                />
              </List.Item>
              <List.Item
                actions={[<Button key="manage">Quản lý</Button>]}
              >
                <List.Item.Meta
                  avatar={<EnvironmentOutlined />}
                  title="Địa chỉ"
                  description="Quản lý địa chỉ giao hàng của bạn"
                />
              </List.Item>
              <List.Item
                actions={[<Button key="preferences">Tùy chỉnh</Button>]}
              >
                <List.Item.Meta
                  avatar={<MailOutlined />}
                  title="Thông báo"
                  description="Cài đặt email và thông báo"
                />
              </List.Item>
            </List>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
}

export default Profile