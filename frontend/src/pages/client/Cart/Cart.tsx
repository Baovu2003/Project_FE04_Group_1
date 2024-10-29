import React, { useState } from 'react';
import { Layout, Card, Row, Col, Typography, InputNumber, Button, Checkbox, Image } from 'antd';

const { Content } = Layout;
const { Title, Text } = Typography;

interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  image: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    title: "Program with C++ For Beginners",
    author: "Sam Smith",
    price: 17.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 2,
    title: "Program with C++ For Beginners",
    author: "Sam Smith",
    price: 17.99,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100"
  }
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [generateQR, setGenerateQR] = useState(false);

  const updateQuantity = (id: number, quantity: number | null) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: quantity || 0 } : item
    ));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', padding: '20px' }}>
      <Content>
        <Row gutter={16}>
          <Col span={16}>
            <Card title={<Title level={4}>Cart - {cartItems.length} items</Title>}>
              {cartItems.map(item => (
                <Row key={item.id} gutter={16} style={{ marginBottom: '20px' }}>
                  <Col span={6}>
                    <Image src={item.image} alt={item.title} />
                  </Col>
                  <Col span={12}>
                    <Title level={5}>{item.title}</Title>
                    <Text>{item.author}</Text>
                  </Col>
                  <Col span={6}>
                    <Text>Quantity</Text>
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) => updateQuantity(item.id, value)}
                    />
                    <Text strong style={{ display: 'block', marginTop: '10px' }}>
                      ${item.price.toFixed(2)}
                    </Text>
                  </Col>
                </Row>
              ))}
            </Card>
            <Card style={{ marginTop: '20px' }}>
              <Title level={5}>Now We Accept VNpay</Title>
              <Image src="/placeholder.svg?height=30&width=200" alt="Payment methods" />
            </Card>
          </Col>
          <Col span={8}>
            <Card title={<Title level={4}>Summary</Title>}>
              <Row justify="space-between">
                <Text>Products</Text>
                <Text>${totalAmount.toFixed(2)}</Text>
              </Row>
              <Row justify="space-between" style={{ marginTop: '10px' }}>
                <Text strong>Total amount (including VAT)</Text>
                <Text strong>${totalAmount.toFixed(2)}</Text>
              </Row>
              <Button type="primary" block style={{ marginTop: '20px' }}>
                Go to checkout
              </Button>
              <Checkbox
                checked={generateQR}
                onChange={(e) => setGenerateQR(e.target.checked)}
                style={{ marginTop: '10px' }}
              >
                Generate QR
              </Checkbox>
              {generateQR && (
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt="QR Code"
                  style={{ marginTop: '10px' }}
                />
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Cart;