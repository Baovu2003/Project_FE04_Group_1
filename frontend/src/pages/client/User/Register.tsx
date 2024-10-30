import React from 'react';
import { Form, Input, Button, Tabs, Card, Row, Col } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import placeholder from './placeholder.svg';

interface FormValues {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  password: string;
}

function Register() {
  const [form] = Form.useForm();

  const onFinish = (values: FormValues) => {
    console.log('Success:', values);
  };

  const tabItems: TabsProps['items'] = [
    {
      key: 'login',
      label: 'Đăng nhập',
      children: <div style={{ padding: '20px' }}>Login form content</div>,
    },
    {
      key: 'register',
      label: 'Đăng ký',
      children: (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="p-6"
        >
          <Form.Item
            label={<>HỌ<span className="text-red-500">*</span></>}
            name="lastName"
            rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
          >
            <Input placeholder="Nhập Họ" />
          </Form.Item>

          <Form.Item
            label={<>TÊN<span className="text-red-500">*</span></>}
            name="firstName"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input placeholder="Nhập Tên" />
          </Form.Item>

          <Form.Item
            label={<>SỐ ĐIỆN THOẠI<span className="text-red-500">*</span></>}
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input placeholder="Nhập Số điện thoại" />
          </Form.Item>

          <Form.Item
            label={<>EMAIL<span className="text-red-500">*</span></>}
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input placeholder="Nhập Địa chỉ Email" />
          </Form.Item>

          <Form.Item
            label={<>MẬT KHẨU<span className="text-red-500">*</span></>}
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password placeholder="Nhập Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" danger block size="large">
              TẠO TÀI KHOẢN
            </Button>
          </Form.Item>

          <div className="text-center my-4 relative">
            <span className="bg-white px-4 text-gray-500 relative z-10">
              hoặc đăng nhập qua
            </span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-0" />
          </div>

          <Row gutter={16}>
            <Col span={12}>
              <Button block icon={<img src="/placeholder.svg" alt="" className="w-5 h-5" />} className="flex items-center justify-center">
                <span className="text-[#4267B2]">Facebook</span>
              </Button>
            </Col>
            <Col span={12}>
              <Button block icon={<img src="/placeholder.svg" alt="" className="w-5 h-5" />} className="flex items-center justify-center">
                <span className="text-[#DB4437]">Google</span>
              </Button>
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <Row gutter={32} className="max-w-5xl mx-auto">
        <Col xs={24} md={12}>
          <div className="mb-8">
            <div className="relative h-80 bg-[#f5f0ff]">
              <img
                src={placeholder}
                alt="Online Shopping"
                className="w-50 h-50 object-contain"
              />
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-6">QUYỀN LỢI THÀNH VIÊN</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <CheckCircleOutlined className="text-blue-500 mt-1" />
                  <span>Mua hàng khắp thế giới cực dễ dàng, nhanh chóng</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleOutlined className="text-blue-500 mt-1" />
                  <span>Theo dõi chi tiết đơn hàng, địa chỉ thanh toán dễ dàng</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleOutlined className="text-blue-500 mt-1" />
                  <span>Nhận nhiều chương trình ưu đãi hấp dẫn từ chúng tôi</span>
                </li>
              </ul>
            </div>
          </div>
        </Col>
        
        <Col xs={24} md={12}>
          <Card bordered={false} className="shadow-sm">
            <Tabs
              defaultActiveKey="register"
              items={tabItems}
              className="auth-tabs"
            />
          </Card>
        </Col>
      </Row>

      <style>
      {`
        .auth-tabs .ant-tabs-nav::before {
          border: none;
        }
        .auth-tabs .ant-tabs-nav-list {
          width: 100%;
        }
        .auth-tabs .ant-tabs-tab {
          width: 50%;
          justify-content: center;
          margin: 0;
        }
        .auth-tabs .ant-tabs-tab-active {
          border-bottom: 2px solid #dc2626;
        }
        .auth-tabs .ant-tabs-ink-bar {
          background: #dc2626;
        }
      `}
    </style>
    </div>
  );
}

export default Register