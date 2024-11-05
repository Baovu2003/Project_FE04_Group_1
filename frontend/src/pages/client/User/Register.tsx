import React from 'react';
import { Button, Card, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  subscribe: boolean;
}

const App: React.FC = () => {
  const [form] = Form.useForm<SignupFormData>();

  const onFinish = (values: SignupFormData) => {
    console.log('Form submitted:', values);
  };

  return (
    <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', marginBottom: '200px' }}>
      <Card style={{ width: '80%', borderRadius: '25px', maxWidth: '800px' }}>
        <Row gutter={16}>
          {/* Form Column */}
          <Col xs={24} lg={12} className="d-flex flex-column align-items-center" >
            <Title level={1} style={{ textAlign: 'center', fontWeight: 'bold' }}>Sign Up</Title>
            
            <Form
              form={form}
              name="signup"
              layout="vertical"
              onFinish={onFinish}
              style={{ width: '100%' }}
            >
              <Form.Item
                name="name"
                label="Your Name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input placeholder="Enter your name" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                name="email"
                label="Your Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Enter a valid email' }
                ]}
              >
                <Input placeholder="Enter your email" prefix={<MailOutlined />} />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password placeholder="Enter your password" prefix={<LockOutlined />} />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Repeat your password"
                dependencies={['password']}
                rules={[
                  { required: true, message: 'Please confirm your password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match'));
                    }
                  })
                ]}
              >
                <Input.Password placeholder="Repeat your password" prefix={<KeyOutlined />} />
              </Form.Item>

              <Form.Item name="subscribe" valuePropName="checked">
                <Checkbox>Subscribe to our newsletter</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Col>

          {/* Image Column */}
          <Col xs={24} lg={12} className="d-flex align-items-center">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              alt="Sign up illustration"
              style={{ width: '100%', borderRadius: '25px' }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default App;
