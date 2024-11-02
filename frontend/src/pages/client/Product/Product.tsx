import React, { useState } from "react";
import {
  Layout,
  Typography,
  Select,
  Button,
  Card,
  Row,
  Col,
  Popover,
  Checkbox,
  Space,
} from "antd";
import {
  FilterOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
} from "@ant-design/icons";

import img from "../../../assets/img.png";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  unit: string;
  minOrder: number;
}

interface PriceRange {
  id: string;
  label: string;
  min: number;
  max?: number;
}

const ProductList: React.FC = () => {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const priceRanges: PriceRange[] = [
    { id: "under-100", label: "Giá dưới 100.000đ", min: 0, max: 100000 },
    { id: "100-200", label: "100.000đ - 200.000đ", min: 100000, max: 200000 },
    { id: "200-300", label: "200.000đ - 300.000đ", min: 200000, max: 300000 },
    { id: "300-500", label: "300.000đ - 500.000đ", min: 300000, max: 500000 },
    {
      id: "500-1000",
      label: "500.000đ - 1.000.000đ",
      min: 500000,
      max: 1000000,
    },
    { id: "over-1000", label: "Giá trên 1.000.000đ", min: 1000000 },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Thùng 12 Gói Cà Phê Rang Xay Truyền Thống",
      price: 1020000,
      image: img,
      size: "12",
      unit: "Gói",
      minOrder: 5,
    },
    {
      id: 2,
      name: "Thùng 24 Lon Cà Phê Sữa Highlands Coffee",
      price: 3920000,
      image: img,
      size: "24",
      unit: "Lon",
      minOrder: 10,
    },
    {
      id: 3,
      name: "Thùng 12 Gói Cà Phê Rang Xay Truyền Thống",
      price: 1020000,
      image: img,
      size: "12",
      unit: "Gói",
      minOrder: 5,
    },
    {
      id: 4,
      name: "Thùng 24 Lon Cà Phê Sữa Highlands Coffee",
      price: 3920000,
      image: img,
      size: "24",
      unit: "Lon",
      minOrder: 10,
    },
    {
      id: 5,
      name: "Thùng 12 Gói Cà Phê Rang Xay Truyền Thống",
      price: 1020000,
      image: img,
      size: "12",
      unit: "Gói",
      minOrder: 5,
    },
    {
      id: 6,
      name: "Thùng 24 Lon Cà Phê Sữa Highlands Coffee",
      price: 3920000,
      image: img,
      size: "24",
      unit: "Lon",
      minOrder: 10,
    },
  ];

  const handlePriceRangeChange = (checkedValues: string[]) => {
    setSelectedPriceRanges(checkedValues);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const priceFilterContent = (
    <Checkbox.Group
      onChange={handlePriceRangeChange}
      value={selectedPriceRanges}
    >
      <Space direction="vertical">
        {priceRanges.map((range) => (
          <Checkbox key={range.id} value={range.id}>
            {range.label}
          </Checkbox>
        ))}
      </Space>
    </Checkbox.Group>
  );

  return (
    <Layout>
      <Header style={{ background: "#fff", padding: "0 20px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Products
            </Title>
          </Col>
          <Col>
            <Space>
              <Text>Sắp xếp:</Text>
              <Select defaultValue="default" style={{ width: 160 }}>
                <Option value="default">Mặc định</Option>
                <Option value="price-asc">Giá tăng dần</Option>
                <Option value="price-desc">Giá giảm dần</Option>
              </Select>
            </Space>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "20px", backgroundColor: "white" }}>
        <Space style={{ marginBottom: "20px" }}>
          <FilterOutlined />
          <Text strong>TÌM NHANH</Text>
          <Popover content={priceFilterContent} title="Lọc giá" trigger="click">
            <Button>Lọc giá ▼</Button>
          </Popover>
        </Space>
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                cover={
                  <img
                    alt={product.name}
                    src={product.image}
                    style={{ padding: "20px" }}
                  />
                }
                bodyStyle={{
                  padding: "20px",
                  backgroundColor: "#FDB813",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <Text style={{ fontSize: "12px" }}>UỐNG HIGHLANDS tại nhà</Text>
                <Title level={3} style={{ color: "white", margin: "10px 0" }}>
                  MUA GIÁ SỈ
                </Title>
                <Text strong>{`Thùng ${product.size} ${product.unit}`}</Text>
                <Text style={{ display: "block", marginBottom: "10px" }}>
                  {product.name.split(" ").slice(2).join(" ")}
                </Text>
                {product.minOrder > 2 && (
                  <Text
                    strong
                    style={{ display: "block", marginTop: "10px" }}
                  >{`${product.minOrder} THÙNG`}</Text>
                )}
                <Title level={4} style={{ color: "white", margin: "10px 0" }}>
                  {formatPrice(product.price)}
                </Title>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "white",
                      color: "#FDB813",
                      width: "100%",
                    }}
                  >
                    Chọn mua
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default ProductList;
