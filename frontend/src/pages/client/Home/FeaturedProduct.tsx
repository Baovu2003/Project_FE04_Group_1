// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { Card, Button, Carousel } from 'antd';
// import { LeftOutlined, RightOutlined, ShoppingCartOutlined } from '@ant-design/icons';
// import type { CarouselRef } from 'antd/lib/carousel';
// import './featured.css';

// interface Product {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   discountPercentage?: number;
//   stock: number;
//   thumbnail: string;
//   status: string;
//   featured: string;
//   position: number;
//   deleted: boolean;
//   slug: string;
// }

// const FeaturedProduct = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const carouselRef = useRef<CarouselRef>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/products');
//         const data = await response.json();

//         // Debug logs
//         // console.log("All products:", data.recordsProduct);

//         // Filter featured products and log the process
//         const featuredProducts = data.recordsProduct.filter((product: Product) => {
//           // console.log(`Product ${product.title} - featured status:`, product.featured);
//           return product.featured === "1" && !product.deleted && !product.discountPercentage;
//         });

//         // console.log("Filtered featured products:", featuredProducts);

//         setProducts(featuredProducts);
//       } catch (error) {
//         console.error("Error fetching featured products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Debug log when products state changes
//   useEffect(() => {
//     // console.log("Products state updated:", products);
//   }, [products]);

//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
//   };

//   // Debug log before render
//   // console.log("Current products length:", products.length);

//   return (
//     <div className="flash-sale-container">
//       <div className="flash-sale-header">
//         <div className="flash-sale-title">
//           <span className="flash-sale-text">
//             ⚡ SẢN PHẨM NỔI BẬT ({products.length})
//           </span>
//         </div>

//       </div>

//       {products.length > 0 ? (
//         <div className="carousel-container">
//           <Button
//             icon={<LeftOutlined />}
//             className="carousel-arrow carousel-arrow-left"
//             shape="circle"
//             onClick={() => carouselRef.current?.prev()}
//           />
//           <Button
//             icon={<RightOutlined />}
//             className="carousel-arrow carousel-arrow-right"
//             shape="circle"
//             onClick={() => carouselRef.current?.next()}
//           />
//           <Carousel ref={carouselRef} slidesToShow={4} dots={false}>
//             {products.map(product => (
//               <div key={product._id} className="product-card-wrapper">
//                 <Card
//                   cover={
//                     <div className="product-image-container">
//                       <img
//                         src={
//                           product.thumbnail
//                             ? product.thumbnail.startsWith("http")
//                               ? product.thumbnail
//                               : `http://localhost:5000${product.thumbnail}`
//                             : "http://localhost:5000/path-to-placeholder-image.png"
//                         }
//                         alt={product.title}
//                         className="product-image"
//                         style={{
//                           width: '100%',
//                           height: '300px',
//                           objectFit: 'cover'
//                         }}
//                       />
//                     </div>
//                   }
//                   className="product-card"
//                 >
//                   <h3 className="product-name text-center">
//                     {product.title}
//                   </h3>
//                   <div className="product-price d-flex justify-content-center align-items-center">
//                     <span className="sale-price">
//                       {formatPrice(product.price)}
//                     </span>
//                     {/* {product.discountPercentage && product.discountPercentage > 0 ? (
//                       <span className="original-price">
//                         {formatPrice(product.price * (1 + product.discountPercentage / 100))}
//                       </span>
//                     ):<></>} */}
//                   </div>
//                   <div className="stock-status text-center">
//                     Còn lại: {product.stock}
//                   </div>

//                   <Link to={`/listProducts/detail/${product.slug}`}>
//                     <Button
//                       type="primary"
//                       danger
//                       className="buy-button"
//                       disabled={product.stock === 0}
//                       style={{ margin: '0 auto', display: 'block' }}
//                     >
//                       <ShoppingCartOutlined />
//                       {product.stock > 0 ? 'Chọn mua' : 'Hết hàng'}
//                     </Button>
//                   </Link>
//                 </Card>
//               </div>
//             ))}
//           </Carousel>

//         </div>
//       ) : (
//         <div style={{ textAlign: 'center', padding: '20px' }}>
//           Không có sản phẩm nổi bật
//         </div>
//       )}
//     </div>
//   );
// };

// export default FeaturedProduct;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { CarouselRef } from "antd/lib/carousel";
import "./featured.css"; // Import the CSS file

interface Product {
  _id: string;
  title: string;
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
}

const FeaturedProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const carouselRef = useRef<CarouselRef>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();

        const featuredProducts = data.recordsProduct.filter(
          (product: Product) => {
            return (
              product.featured === "1" &&
              !product.deleted &&
              !product.discountPercentage
            );
          }
        );

        setProducts(featuredProducts);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="flash-sale-container">
      <div className="flash-sale-header">
        <div className="flash-sale-title">
          <span className="flash-sale-text">
            ⚡ SẢN PHẨM NỔI BẬT ({products.length})
          </span>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="carousel-container">
          <Button
            icon={<LeftOutlined />}
            className="carousel-arrow carousel-arrow-left"
            shape="circle"
            onClick={() => carouselRef.current?.prev()}
          />
          <Button
            icon={<RightOutlined />}
            className="carousel-arrow carousel-arrow-right"
            shape="circle"
            onClick={() => carouselRef.current?.next()}
          />
          <Carousel ref={carouselRef} slidesToShow={4} dots={false}>
            {products.map((product) => (
              <div key={product._id} className="product-card-wrapper">
                <div className="product-card">
                  <div className="product-image-container">
                    <img
                      src={
                        product.thumbnail
                          ? product.thumbnail.startsWith("http")
                            ? product.thumbnail
                            : `http://localhost:5000${product.thumbnail}`
                          : "http://localhost:5000/path-to-placeholder-image.png"
                      }
                      alt={product.title}
                      className="product-image"
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h3 className="product-name">{product.title}</h3>
                  <div className="stock-status">Còn lại: {product.stock}</div>
                  <div className="card-overlay">
                    <Link to={`/listProducts/detail/${product.slug}`}>
                      <div className="purchase-container">
                        <button className="purchase-button">
                          Chọn mua:{" "}
                          <span className="price">
                            {formatPrice(product.price)}
                          </span>
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          Không có sản phẩm nổi bật
        </div>
      )}
    </div>
  );
};

export default FeaturedProduct;
