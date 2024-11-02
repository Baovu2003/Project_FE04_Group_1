import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Card, Row, Col, Button, InputNumber, Typography, Space, Divider, Badge } from 'antd';
import { DeleteOutlined, PhoneOutlined, FacebookOutlined, ClockCircleOutlined, CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
}

const Breadcrumb: React.FC = () => {
  return (
    <nav aria-label="breadcrumb" style={{ padding: '10px', backgroundColor: '#f8f9fa' }}>
      <ol style={{ listStyle: 'none', display: 'flex', gap: '5px', fontSize: '14px', color: '#555' }}>
        <li>
          <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>Home</Link>
        </li>
        <li style={{ color: 'black' }}> / </li>
        <li>
          <Link to="/cart" style={{ color: 'red', textDecoration: 'none' }}>Cart</Link>
        </li>
      </ol>
    </nav>
  );
};

export default function Cart() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      id: 1,
      name: 'MUA 2 TẶNG 3 - Combo 2 Cà Phê Rang Xay Truyền Thống Highlands Coffee 1kg Tặng 2 gói 200gr và 1 ly sứ',
      price: 712000,
      quantity: 1,
      image: '/public/Cart_img/combo2coffee.png',
      brand: 'Highlands Coffee'
    },
    {
      id: 2,
      name: 'Combo 3 vị cà phê rang xay Highlands Coffee 200g',
      price: 283500,
      quantity: 1,
      image: '/public/Cart_img/combo3coffee.png',
      brand: 'Highlands Coffee'
    },
    {
      id: 3,
      name: 'Thùng 48 hộp Cà phê Sữa Highlands Coffee Tetra pack (180ml/hộp)',
      price: 480000,
      quantity: 1,
      image: '/public/Cart_img/48hopcoffee.png',
      brand: 'Highlands Coffee'
    }
  ]);

  const updateQuantity = (id: number, value: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, value) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout.Content className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <Breadcrumb />

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={16}>
          <Card title={<Title level={4}>Giỏ hàng ({cartItems.length} sản phẩm)</Title>}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {cartItems.map(item => (
                <Card key={item.id} bodyStyle={{ padding: 0 }} className="overflow-hidden">
                  <Row gutter={[16, 16]} align="middle" className="p-4">
                    <Col xs={24} sm={8}>
                        <img
                          src={item.image}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="rounded-lg object-cover"
                        />
                    </Col>
                    <Col xs={24} sm={16}>
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Text strong>{item.name}</Text>
                        <Text type="secondary">Thương hiệu: {item.brand}</Text>
                        <Text strong className="text-lg text-red-600">
                          {item.price.toLocaleString()}đ
                        </Text>
                        <Row justify="space-between" align="middle">
                          <Space>
                            <Button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </Button>
                            <InputNumber
                              min={1}
                              value={item.quantity}
                              onChange={(value) => updateQuantity(item.id, value || 1)}
                              className="w-16 text-center"
                            />
                            <Button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </Space>
                          <Button 
                            type="text" 
                            danger 
                            icon={<DeleteOutlined />}
                            onClick={() => removeItem(item.id)}
                          >
                            Xóa
                          </Button>
                        </Row>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title={<Title level={4}>Dịch vụ khách hàng</Title>}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Text>Bạn cần sự hỗ trợ từ chúng tôi? Hãy liên hệ ngay</Text>
                <Space>
                  <PhoneOutlined />
                  <Text strong>0917561212</Text>
                </Space>
                <Space>
                  <FacebookOutlined />
                  <Text strong>Chúng tôi trên Facebook</Text>
                </Space>
                <Space>
                  <ClockCircleOutlined />
                  <Text>Giờ mở cửa (08:00 - 18:00)</Text>
                </Space>
              </Space>
            </Card>

            <Card title={<Title level={4}>Mua sắm cùng CoffeeKing store</Title>}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Space>
                  <CheckOutlined className="text-green-500" />
                  <Text>Sản phẩm đẹp, thân thiện với môi trường</Text>
                </Space>
                <Space>
                  <CheckOutlined className="text-green-500" />
                  <Text>Không lo về giá</Text>
                </Space>
                <Space>
                  <CheckOutlined className="text-green-500" />
                  <Text>Miễn phí vận chuyển cho đơn hàng từ 1.500.000 VNĐ</Text>
                </Space>
              </Space>
            </Card>

            <Card>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Row justify="space-between">
                  <Text>Tạm tính:</Text>
                  <Text strong>{total.toLocaleString()}đ</Text>
                </Row>
                <Divider style={{ margin: '12px 0' }} />
                <Row justify="space-between">
                  <Text strong>Thành tiền:</Text>
                  <Text strong className="text-xl text-red-600">
                    {total.toLocaleString()}đ
                  </Text>
                </Row>
                <Button type="primary" size="large" block className="bg-red-600">
                  THANH TOÁN NGAY
                </Button>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </Layout.Content>
  );
}
