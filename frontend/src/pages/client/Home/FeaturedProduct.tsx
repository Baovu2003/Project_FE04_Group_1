import React from 'react'
import { Card, Rate, Button, Carousel } from 'antd'
import { LeftOutlined, RightOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import type { CarouselRef } from 'antd/lib/carousel'
import './featured.css'

interface Product {
  id: number
  name: string
  originalPrice: number
  salePrice: number
  discount: number
  rating: number
  reviews: number
  image: string
}

function FeaturedProduct() {
  const carouselRef = React.useRef<CarouselRef>(null)
  const [countdown, setCountdown] = React.useState({ hours: 1, minutes: 11, seconds: 40 })

  const products: Product[] = [
    {
      id: 1,
      name: 'MUA 2 TẶNG 3 - Combo 2 Cà Phê Rang Xay Truyền Thống',
      originalPrice: 750000,
      salePrice: 712000,
      discount: 5,
      rating: 5,
      reviews: 1,
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      id: 2,
      name: 'MUA 1 TẶNG 1 - Cà phê Bột Truyền Thống 1kg Tặng 1 gói',
      originalPrice: 460000,
      salePrice: 365000,
      discount: 21,
      rating: 5,
      reviews: 1,
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      id: 3,
      name: '(Giao hoả tốc 18.10 và 19.10 HCM) Hộp quà cà phê',
      originalPrice: 479000,
      salePrice: 379000,
      discount: 21,
      rating: 0,
      reviews: 0,
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      id: 4,
      name: '(Quà tặng khi mua từ 399K) Combo 3 vị cà phê rang xay',
      originalPrice: 315000,
      salePrice: 283500,
      discount: 10,
      rating: 0,
      reviews: 0,
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      id: 5,
      name: 'MUA 1 TẶNG 1 - Cà Phê Hạt Full City Roast Highlands',
      originalPrice: 565000,
      salePrice: 529000,
      discount: 6,
      rating: 0,
      reviews: 0,
      image: '/placeholder.svg?height=200&width=200'
    }
  ]

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        const newSeconds = prev.seconds - 1
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds }
        
        const newMinutes = prev.minutes - 1
        if (newMinutes >= 0) return { ...prev, minutes: newMinutes, seconds: 59 }
        
        const newHours = prev.hours - 1
        if (newHours >= 0) return { hours: newHours, minutes: 59, seconds: 59 }
        
        clearInterval(timer)
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
  }

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0')
  }

  return (
    <div className="flash-sale-container">
      {/* Flash Sale Header */}
      <div className="flash-sale-header">
        <div className="flash-sale-title">
          <span className="flash-sale-text">
            ⚡ SẢN PHẨM NỔI BẬT
          </span>
          
        </div>
        <Button type="primary" danger>
          Xem tất cả
        </Button>
      </div>

      {/* Products Carousel */}
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
          {products.map(product => (
            <div key={product.id} className="product-card-wrapper">
              <Card 
                cover={
                  <div className="product-image-container">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                    {product.discount > 0 && (
                      <div className="discount-badge">
                        {product.discount}%
                      </div>
                    )}
                  </div>
                }
                className="product-card"
              >
                <h3 className="product-name">
                  {product.name}
                </h3>
                <div className="product-price">
                  <span className="sale-price">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="original-price">
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
                <div className="product-rating">
                  <Rate disabled defaultValue={product.rating} className="rating-stars" />
                  <span className="review-count">
                    ({product.reviews})
                  </span>
                </div>
                
                <Button 
                  type="primary" 
                  danger 
                  icon={<ShoppingCartOutlined />}
                  className="buy-button"
                >
                  Chọn mua
                </Button>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default FeaturedProduct