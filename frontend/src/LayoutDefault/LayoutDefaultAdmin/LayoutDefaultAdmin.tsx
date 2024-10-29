import React from 'react';
import Header from './Header/Header';
import { NavLink, Outlet } from 'react-router-dom';

function LayoutDefaultAdmin() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main className="admin-layout">
        <div className="sidebar">
          <ul>
            <li>
              <NavLink to="dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
                Tổng quan
              </NavLink>
            </li>
            <li>
              <NavLink to="products-category" className={({ isActive }) => (isActive ? 'active' : '')}>
                Danh mục sản Phẩm
              </NavLink>
            </li>
            <li>
              <NavLink to="products" className={({ isActive }) => (isActive ? 'active' : '')}>
                Sản Phẩm
              </NavLink>
            </li>
            <li>
              <NavLink to="roles" className={({ isActive }) => (isActive ? 'active' : '')}>
                Nhóm quyền
              </NavLink>
            </li>
            <li>
              <NavLink to="permissions" className={({ isActive }) => (isActive ? 'active' : '')}>
                Phân quyền
              </NavLink>
            </li>
            <li>
              <NavLink to="accounts" className={({ isActive }) => (isActive ? 'active' : '')}>
                Danh sách tài khoản
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default LayoutDefaultAdmin;
