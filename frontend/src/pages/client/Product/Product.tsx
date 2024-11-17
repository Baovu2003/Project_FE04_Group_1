import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Typography, Space, Select, Card, Button, Popover, Menu, Radio, Pagination } from 'antd';
import { Link, useLocation  } from 'react-router-dom';
import { FilterOutlined, FolderOutlined } from '@ant-design/icons';
import './ProductList.css';
const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

interface Category {
  _id: string;
  title: string;
  parent_id: string;
  description: string;
  thumbnail: string;
  status: string;
  position: number;
  deleted: boolean;
  slug: string;
  children?: Category[];
}

interface Product {
  _id: string;
  title: string;
  product_category_id?: string;
  description: string;
  price: number;
  discountPercentage?: number;
  stock: number;
  thumbnail: string;
  status: string;
  featured: string;
  position: number;
  deleted: boolean;
  slug: string;
  createdBy: {
    account_id: string;
    createdAt: string;
  };
}

interface ApiResponse {
  recordsProduct: Product[];
  recordsCategory: Category[];
  discountPercentage?: number;
  stock: number;
  thumbnail: string;
  status: string;
  featured: string;
  position: number;
  deleted: boolean;
  slug: string;
  createdBy: {
    account_id: string;
    createdAt: string;
  };
}

interface ApiResponse {
  recordsProduct: Product[];
  recordsCategory: Category[];
}

const ProductList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedChildCategory, setSelectedChildCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const location = useLocation();
  const searchTerm = location.state?.searchTerm || '';


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data: ApiResponse = await response.json();
        console.log("Categories:", data.recordsCategory); // kiểm tra danh mục
        console.log("Products:", data.recordsProduct);
        setCategories(data.recordsCategory);
        setProducts(data.recordsProduct);
        setOriginalProducts(data.recordsProduct);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const searchResults = originalProducts.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(searchResults);
      setCurrentPage(1); // Reset về trang 1 khi có kết quả tìm kiếm mới
    } else {
      setProducts(originalProducts);
    }
  }, [searchTerm, originalProducts]);

  const handleSortChange = (value: string) => {
    setSortOrder(value);
    if (value === 'default') {
      setProducts(originalProducts); // Reset to original products
    } else {
      let sortedProducts = [...products];
      if (value === 'price-asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (value === 'price-desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
      }
      setProducts(sortedProducts);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const PriceFilterContent = () => (
    <Radio.Group
      onChange={(e) => setPriceRange(e.target.value)}
      value={priceRange}
      className="flex flex-col gap-2"
    >
      <Radio value="all">Tất cả</Radio>
      <Radio value="0-30000">0đ - 30.000đ</Radio>
      <Radio value="30000-100000">31.000đ - 100.000đ</Radio>
    </Radio.Group>
  );

  const renderCategoryMenu = (categories: Category[]) => {
    return categories.map((category) => {
      const hasChildren = category.children && category.children.length > 0;
      const menuItem = (
        <span className="flex items-center">
          <FolderOutlined className="mr-2" />
          <span>{category.title}</span>
          {category.status === 'inactive' && (
            <span className="ml-2 text-xs px-1 py-0.5 bg-gray-200 rounded">Inactive</span>
          )}
        </span>
      );

      if (hasChildren) {
        return (
          <Menu.SubMenu key={category._id} title={menuItem}>
            {renderCategoryMenu(category.children)} {/* Recursively render child categories */}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item
          key={category._id}
          onClick={() => {
            console.log("Clicked Category ID:", category._id); // Log ID danh mục đã chọn
            setSelectedCategory(category._id);
            setSelectedChildCategory('');
          }}
        >
          {menuItem}
        </Menu.Item>
      );
    });
  };

  useEffect(() => {
    if (selectedChildCategory) {
      const selectedProduct = products.find(product => product._id === selectedChildCategory);
      if (selectedProduct) {
        console.log("Selected Product:", selectedProduct);
      } else {
        console.log("No product found for selectedChildCategory:", selectedChildCategory);
      }
    }
  }, [selectedChildCategory, products]); // Theo dõi khi selectedChildCategory hoặc products thay đổi



  // Helper function to get all category IDs including children
  const getAllCategoryIds = (category: Category): string[] => {
    let ids = [category._id];
    if (category.children) {
      category.children.forEach(child => {
        ids = [...ids, ...getAllCategoryIds(child)];
      });
    }
    return ids;
  };

  // Helper function to find a category and its children by ID
  const findCategoryById = (categories: Category[], categoryId: string): Category | null => {
    for (const category of categories) {
      if (category._id === categoryId) {
        return category;
      }
      if (category.children) {
        const found = findCategoryById(category.children, categoryId);
        if (found) return found;
      }
    }
    return null;
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const productCategoryId = product.product_category_id || '';
    let matchesCategory = true;
    let matchesSearch = true;

    // Category filter
    if (selectedChildCategory) {
      matchesCategory = productCategoryId === selectedChildCategory;
    } else if (selectedCategory) {
      const selectedCat = findCategoryById(categories, selectedCategory);
      if (!selectedCat) {
        matchesCategory = false;
      } else {
        const validCategoryIds = getAllCategoryIds(selectedCat);
        matchesCategory = validCategoryIds.includes(productCategoryId);
      }
    }

    // Price filter
    let matchesPrice = true;
    if (priceRange === '0-30000') {
      matchesPrice = product.price >= 0 && product.price <= 30000;
    } else if (priceRange === '30000-100000') {
      matchesPrice = product.price > 30000 && product.price <= 100000;
    }

    // Search filter
    if (searchTerm) {
      matchesSearch = 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
    }

    return matchesCategory && matchesPrice && !product.deleted && matchesSearch;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const onPageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <Header className="bg-white px-5">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} className="m-0">Products</Title>
          </Col>
          <Col>
            <Space>
              <Text>Sắp xếp:</Text>
              <Select defaultValue="default" style={{ width: 160 }} onChange={handleSortChange}>
                <Option value="default">Mặc định</Option>
                <Option value="price-asc">Giá tăng dần</Option>
                <Option value="price-desc">Giá giảm dần</Option>
              </Select>
            </Space>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Sider width={250} className="bg-white p-4">
          <Title level={4}>Danh mục sản phẩm</Title>
          <Menu
            mode="inline"
            openKeys={openKeys}
            selectedKeys={[selectedCategory]}
            onOpenChange={setOpenKeys}
            onSelect={({ key }) => setSelectedCategory(key)}
            className="border-r-0"
          >
            <Menu.Item key="">
              <span className="flex items-center">
                <FolderOutlined className="mr-2" />
                Tất cả sản phẩm
              </span>
            </Menu.Item>
            {renderCategoryMenu(categories)}
          </Menu>
        </Sider>
        <Content className="p-5 bg-white">
          <Space className="mb-5">
            <FilterOutlined />
            <Text strong>TÌM NHANH</Text>
            <Popover
              content={<PriceFilterContent />}
              title="Lọc giá"
              trigger="click"
            >
              <Button>
                Lọc giá {priceRange !== 'all' && '✓'} ▼
              </Button>
            </Popover>
          </Space>
          <Row gutter={[16, 16]}>
            {currentProducts.map((product) => (
              !product.deleted && (
                <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    cover={
                      <div style={{ height: 200, overflow: 'hidden' }}>
                        <img
                          alt={product.title}
                          src={
                            product.thumbnail
                              ? product.thumbnail.startsWith("http")
                                ? product.thumbnail
                                : `http://localhost:5000${product.thumbnail}`
                              : "http://localhost:5000/path-to-placeholder-image.png" // Placeholder image URL
                          }
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    }
                    bodyStyle={{
                      padding: "20px",
                      backgroundColor: "#FDB813",
                      textAlign: "center",
                      color: "white",
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                  >
                    <Title
                      level={3}
                      className="text-white my-2"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        whiteSpace: 'normal',
                        height: '48px',
                      }}
                    >
                      {product.title}
                    </Title>

                    <Text strong>{product.description}</Text>
                    <Title level={4} className="text-white my-2">
                      {formatPrice(product.price)}
                    </Title>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <Text
                        style={{
                          color: product.discountPercentage ? '#ff4d4f' : '#888',
                          fontWeight: 'bold',
                          fontSize: '14px',
                          marginBottom: '8px',
                        }}
                      >
                        {`Discount: ${product.discountPercentage ?? 0}%`}
                      </Text>
                      <Link to={`/listProducts/detail/${product.slug}`}>
                        <Button className="purchase-button">Chọn mua</Button>
                      </Link>
                    </div>
                  </Card>
                </Col>
              )
            ))}
          </Row>
          <Row justify="center" style={{ marginTop: '2rem' }}>
          <Pagination
            current={currentPage}
            total={filteredProducts.length}
            pageSize={pageSize}
            onChange={onPageChange}
            showSizeChanger
            showQuickJumper
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
          />
        </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductList;