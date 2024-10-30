
import React from 'react';
import { Carousel, Card, Button, Row, Col, Slider } from 'antd';
import {
  CarOutlined,
  GiftOutlined,
  FireOutlined,
  ShopOutlined,
  CoffeeOutlined,
  MessageOutlined
} from '@ant-design/icons';
import slider from '../../../assets/images/home/slider.png';
import FlashSale from './FlashSale';
import './home.css';

interface VoucherProps {
  code: string;
  amount: string;
  description: string;
}

const VoucherCard: React.FC<VoucherProps> = ({ code, amount, description }) => (
  <Card className="voucher-card" bordered={false}>
    <h3>Voucher {amount}</h3>
    <p>{description}</p>
    <div className="flex justify-between items-center mt-4">
      <span className="voucher-code">{code}</span>
      <Button type="primary" danger>
        Lưu
      </Button>
    </div>
  </Card>
);

function Home() {
  const menuItems = [
    { icon: <CarOutlined />, label: 'Giao hàng', color: '#ff4d4f' },
    { icon: <GiftOutlined />, label: 'Đặc quyền', color: '#ff4d4f' },
    { icon: <FireOutlined />, label: 'Bán chạy', color: '#ff4d4f' },
    { icon: <ShopOutlined />, label: 'Cửa hàng', color: '#ff4d4f' },
    { icon: <CoffeeOutlined />, label: 'Cách pha', color: '#ff4d4f' },
    { icon: <MessageOutlined />, label: 'Liên hệ', color: '#ff4d4f' },
  ];

  const vouchers = [
    {
      code: 'G19',
      amount: '19K',
      description: 'Nhập mã G19 tại mục Thanh Toán, áp dụng cho đơn từ 499,000đ'
    },
    {
      code: 'G30',
      amount: '30K',
      description: 'Nhập mã G30 tại mục Thanh Toán, áp dụng cho đơn từ 779,000đ'
    },
    {
      code: 'G99',
      amount: '99K',
      description: 'Nhập mã G99 tại mục Thanh Toán, áp dụng cho đơn từ 1,399,000đ'
    },
    {
      code: 'SHIP19K',
      amount: 'Phí ship chỉ từ 19K',
      description: 'Giao hàng toàn quốc chỉ từ 19K'
    }
  ];

  return (
    <div className="container mx-auto">
      {/* Banner Carousel */}
      <Carousel autoplay className="banner-carousel">
        <div>
          <div className="h-[400px] bg-gradient-to-r from-[#e74c3c] to-[#c0392b] px-8 py-12 flex items-center">
            <div className="w-1/2 flex justify-center items-center">
              <img src={slider} alt="Highlands Coffee Products" />
            </div>
          </div>
        </div>
      </Carousel>

      {/* Menu Icons
      <Row gutter={[24, 24]} className="mb-12">
        {menuItems.map((item, index) => (
          <Col span={4} key={index}>
            <div className="menu-icon-container">
              <div className="menu-icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <span className="menu-label">{item.label}</span>
            </div>
          </Col>
        ))}
      </Row> */}

      {/* Vouchers Section
      <div className="mb-12" style={{ textAlign: 'center', padding: '10px 34px' }} >
        <h2 className="voucher-section-title">Ưu đãi của bạn</h2>
        <Row gutter={[24, 24]}>
          {vouchers.map((voucher, index) => (
            <Col span={6} key={index}>
              <VoucherCard {...voucher} />
            </Col>
          ))}
        </Row>
      </div> */}

      {/* Flash Sale Section */}
      <FlashSale />
    </div>
  );
}

export default Home;
