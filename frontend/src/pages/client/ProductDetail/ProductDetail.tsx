import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Image,
  Typography,
  Tag,
  InputNumber,
  Button,
  Carousel,
  Divider,
} from "antd";
import {
  ShoppingCartOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import img from "../../../assets/img.png";
import { Breadcrumb } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

const ProductDetail: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  const productImages = [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
  ];

  return (
    <Layout>
      <Content style={{ padding: "0 50px", background: "white" }}>
        <Breadcrumb style={{ marginTop: "16px" }}>
          <Breadcrumb.Item>
            <a href="/">Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Cà Phê Cappuccino</Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={[24, 24]}>
          <Col span={10}>
            <Card bordered={false}>
              <Image src={img} alt="Product" />
              {/* <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "#00a2ae",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "50%",
                }}
              >
                x12
              </div> */}
              {/* <Carousel autoplay>
                {productImages.slice(1).map((img, index) => (
                  <div key={index}>
                    <Image src={img} alt={`Product ${index + 1}`} width={80} />
                  </div>
                ))}
              </Carousel> */}
            </Card>
          </Col>
          <Col span={14}>
            <Card bordered={false}>
              <Tag color="red">TOP DEAL</Tag>
              <Tag color="blue">30 NGÀY ĐỔI TRẢ</Tag>
              <Tag color="blue">CHÍNH HÃNG</Tag>
              <Text type="secondary">Thương hiệu: Whiskas</Text>
              <Title level={3}>Cà Phê Cappuccino</Title>
              <Text type="secondary">Đã bán 10</Text>
              <Title level={2} style={{ color: "#ff424e" }}>
                144.000đ
              </Title>
              <Text delete type="secondary">
                161.000đ
              </Text>
              <Text type="secondary"> -11%</Text>

              <Divider />

              <Title level={5}>Thông tin vận chuyển</Title>
              <Text>Giao đến Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</Text>
              <Button type="link" style={{ padding: 0 }}>
                Đổi
              </Button>
              <br />
              <Text type="success">
                <ThunderboltOutlined /> Giao siêu tốc 2h
              </Text>
              <br />
              <Text type="success">Trước 10h ngày mai: Miễn phí</Text>
              <Text delete type="secondary">
                {" "}
                25.000đ
              </Text>

              <Divider />

              {/* <Title level={5}>Dịch vụ bổ sung</Title>
              <Button icon={<CreditCardOutlined />}>
                Ưu đãi đến 600k với thẻ TikiCard
              </ trả sau</Button>
              <Divider />Button>
              <Button>Mua trước */}

              <Row align="middle" gutter={16}>
                <Col>
                  <Text>Số Lượng</Text>
                </Col>
                <Col>
                  <InputNumber
                    min={1}
                    value={quantity}
                    onChange={(value) => setQuantity(value as number)}
                  />
                </Col>
              </Row>

              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                  <Button type="primary" block size="large">
                    Mua ngay
                  </Button>
                </Col>
                <Col span={12}>
                  <Button block size="large" icon={<ShoppingCartOutlined />}>
                    Thêm vào giỏ
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default ProductDetail;
