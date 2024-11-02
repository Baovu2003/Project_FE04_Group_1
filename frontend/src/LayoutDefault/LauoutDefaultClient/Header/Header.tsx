import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, SearchOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import logoWhite from '../../../assets/logo_white-7.png';
import './Header.css';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

const Header: React.FC = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.UserReducer);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchSubmit = (values: { search: string }) => {
    console.log('Searching for:', values.search);
    setSearchTerm('');
    setSearchVisible(false);
    // Handle search logic here, e.g., redirect to a search results page
  };

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="container-header">
        {/* Logo Section */}
        <div className="logo">
          <img src={logoWhite} alt="CoffeeKing Logo" />
        </div>

        {/* Desktop Navigation Section */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
          <NavLink to="/listProducts" className={({ isActive }) => isActive ? 'active' : ''}>
            Products
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
            About us
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
            Contact
          </NavLink>
        </nav>

        {/* Icons and Buttons Section */}
        <div className="actions">
          <button onClick={toggleSearch} className="search-button">
            <SearchOutlined />
          </button>
          <div className="cart-icon">
            <span className="cart-count">0</span>
            <ShoppingCartOutlined style={{ color: "white" }} />
          </div>

          {user && user.user._id ? (
            <>
              <span className="user-greeting">Hello, {user.user.fullName}!</span> {/* Greeting message */}
              <Button onClick={handleLogout} className="logout-button">
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/user/login" className="login-link">
                Login
              </NavLink>
              <NavLink to="/user/register" className="register-link">
                Register
              </NavLink>
            </>
          )}

          {isMobile && (
            <button onClick={toggleMobileMenu} className="mobile-menu-button">
              {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && isMobile && (
        <nav className="mobile-nav">
          <NavLink to="/" onClick={toggleMobileMenu}>Home</NavLink>
          <NavLink to="/listProducts" onClick={toggleMobileMenu}>Products</NavLink>
          <NavLink to="/about" onClick={toggleMobileMenu}>About us</NavLink>
          <NavLink to="/contact" onClick={toggleMobileMenu}>Contact</NavLink>
          {user && user.user._id ? (
            <NavLink to="" onClick={handleLogout}>
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink to="/user/login" onClick={toggleMobileMenu}>
                Login
              </NavLink>
              <NavLink to="/user/register" onClick={toggleMobileMenu}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      )}

      {/* Search Form */}
      {isSearchVisible && (
        <Form onFinish={handleSearchSubmit} className="search-form">
          <Form.Item name="search">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form>
      )}
    </header>
  );
};

export default Header;
