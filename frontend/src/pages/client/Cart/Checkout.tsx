import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Radio,
  Space,
  Typography,
  Tag,
  Divider,
  Row,
  Col,
  Card,
  Layout,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import img from "../../../assets/img.png";

const { Title, Text } = Typography;
const { Option } = Select;
const { Content } = Layout;

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  tag?: string;
  description?: string;
}

interface CheckoutFormProps {
  items?: OrderItem[];
}

const defaultItems: OrderItem[] = [
  {
    id: 1,
    name: "Cà Phê Rang Xay Culi Highlands Coffee 200g/gói",
    price: 110000,
    quantity: 1,
    image: img,
    tag: "Quà tặng khi mua từ 399K",
    description: "(Giao hoá tốc 18.10 và 19.10 HCM)",
  },
  {
    id: 2,
    name: "Hộp quà cà phê Truyền thống Highlands Coffee 1Kg (CUP1000)",
    price: 379000,
    quantity: 1,
    image: img,
    description: "gồm 1 túi cà phê Truyền Thống 1Kg và 1 ly sứ cao cấp",
    tag: "SALE - HỘP QUÀ 1kg (-100.000₫)",
  },
  {
    id: 3,
    name: "COMBO 2 Gói Cà Phê Rang Xay Culi Highlands Coffee 200g/gói",
    price: 220000,
    quantity: 1,
    image: img,
    tag: "Quà tặng khi mua từ 399K",
  },
];

export default function CheckoutForm({
  items = defaultItems,
}: CheckoutFormProps) {
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "cod">("cod");
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  const handlePaymentChange = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value);
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log("Form values:", values);
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Content style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
        {/* <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src=img
            alt="Highlands Coffee"
            style={{ height: 80, width: "auto" }}
          />
        </div> */}

        <Row gutter={24}>
          <Col xs={24} lg={12}>
            <Card title="Thông tin nhận hàng" style={{ marginBottom: 24 }}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
              >
                <Form.Item name="email" rules={[{ type: "email" }]}>
                  <Input placeholder="Email (tùy chọn)" size="large" />
                </Form.Item>

                <Form.Item name="fullName" rules={[{ required: true }]}>
                  <Input placeholder="Họ và tên" size="large" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  rules={[{ required: true, pattern: /^[0-9]{10}$/ }]}
                >
                  <Input
                    addonBefore="+84"
                    placeholder="Số điện thoại"
                    size="large"
                  />
                </Form.Item>

                <Form.Item name="address" rules={[{ required: true }]}>
                  <Input placeholder="Địa chỉ" size="large" />
                </Form.Item>

                <Form.Item name="province">
                  <Select placeholder="Tỉnh thành" size="large">
                    <Option value="hcm">TP. Hồ Chí Minh</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="district">
                  <Select placeholder="Quận huyện" size="large">
                    <Option value="q1">Quận 1</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="ward">
                  <Select placeholder="Phường xã" size="large">
                    <Option value="p1">Phường 1</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="note">
                  <Input.TextArea
                    rows={4}
                    placeholder="Ghi chú (tùy chọn)"
                    style={{ resize: "none" }}
                  />
                </Form.Item>
              </Form>
            </Card>

            <Card style={{ marginBottom: 24 }}>
              <Text>Vui lòng nhập thông tin giao hàng</Text>
            </Card>

            <Card title="Thanh toán">
              <Radio.Group
                onChange={handlePaymentChange}
                value={paymentMethod}
                style={{ width: "100%" }}
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Card style={{ marginBottom: 16 }}>
                    <Radio value="momo">
                      <Space>
                        Thanh toán qua Ví điện tử MoMo
                        <img
                          src="/placeholder.svg?height=32&width=32"
                          alt="MoMo"
                          style={{ height: 32 }}
                        />
                      </Space>
                    </Radio>
                  </Card>
                  <Card>
                    <Radio value="cod">
                      <Space>
                        Thanh toán khi giao hàng (COD)
                        <img
                          src="/placeholder.svg?height=32&width=32"
                          alt="COD"
                          style={{ height: 32 }}
                        />
                      </Space>
                    </Radio>
                  </Card>
                </Space>
              </Radio.Group>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title={`Đơn hàng (${items.length} sản phẩm)`}>
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="large"
              >
                {items.map((item) => (
                  <div key={item.id} style={{ display: "flex", gap: 16 }}>
                    <div style={{ position: "relative" }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: -8,
                          right: -8,
                          width: 24,
                          height: 24,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#1890ff",
                          color: "white",
                          borderRadius: "50%",
                          fontSize: 12,
                        }}
                      >
                        {item.quantity}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text strong>{item.name}</Text>
                      {item.description && (
                        <Text type="secondary" style={{ display: "block" }}>
                          {item.description}
                        </Text>
                      )}
                      {item.tag && (
                        <Tag color="blue" style={{ marginTop: 8 }}>
                          {item.tag}
                        </Tag>
                      )}
                      <Text
                        strong
                        style={{
                          display: "block",
                          textAlign: "right",
                          marginTop: 8,
                        }}
                      >
                        {item.price.toLocaleString()}đ
                      </Text>
                    </div>
                  </div>
                ))}

                <Divider />

                <Space.Compact style={{ width: "100%" }}>
                  <Input
                    placeholder="Nhập mã giảm giá"
                    size="large"
                    style={{ flex: 1 }}
                  />
                  <Button type="primary" size="large">
                    Áp dụng
                  </Button>
                </Space.Compact>

                <Divider />

                <Space direction="vertical" style={{ width: "100%" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text>Tạm tính</Text>
                    <Text>{subtotal.toLocaleString()}đ</Text>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Text>Phí vận chuyển</Text>
                    <Text>
                      {shippingFee > 0
                        ? `${shippingFee.toLocaleString()}đ`
                        : "-"}
                    </Text>
                  </div>
                </Space>

                <Divider />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text strong>Tổng cộng</Text>
                  <Text strong style={{ fontSize: 20 }}>
                    {total.toLocaleString()}đ
                  </Text>
                </div>

                <Space
                  direction="vertical"
                  style={{ width: "100%" }}
                  size="middle"
                >
                  <Button
                    icon={<ArrowLeftOutlined />}
                    block
                    onClick={() => window.history.back()}
                    size="large"
                  >
                    Quay về giỏ hàng
                  </Button>
                  <Button
                    type="primary"
                    block
                    size="large"
                    loading={loading}
                    onClick={() => form.submit()}
                    style={{
                      backgroundColor: "#d4380d",
                      borderColor: "#d4380d",
                    }}
                  >
                    ĐẶT HÀNG
                  </Button>
                </Space>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
