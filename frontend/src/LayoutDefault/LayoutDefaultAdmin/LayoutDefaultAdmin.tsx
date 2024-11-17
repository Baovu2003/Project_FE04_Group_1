import React, { useEffect } from "react";
import Header from "./Header/Header";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./LayoutDefaultAdmin.css";
import { getCookie } from "../../Helpers/Cookie.helper";
import { accountActions } from "../../actions/AccountAction";
import { useDispatch, useSelector } from "react-redux";
import { ApiResponse } from "../../actions/types";
import { RootState } from "../../store/store";
import { get } from "../../Helpers/API.helper";

const LayoutDefaultAdmin: React.FC = () => {
  const token = getCookie("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state: RootState) => state.AccountReducer);
  console.log(account)

  console.log(account)
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const accountByToken: ApiResponse = await get(`http://localhost:5000/admin/auth/${token}`);
        console.log(accountByToken)
        if (accountByToken) {
          dispatch(accountActions(accountByToken));
        } else {
          throw new Error("User not found in the response.");
        }
      } catch (error) {
        console.error("Error fetching account by token:", error);
        navigate("/admin/auth/login");
      }
    };

    if (token) {
      fetchApi();
    } else {
      navigate("/admin/auth/login");
    }
  }, [token, dispatch, navigate]);

  return (
    <div id="app">
      <header>
        <Header />
      </header>
      {account?.role.deleted ? <div className="alert alert-danger">
        Quyền này đã bị admin khoá, vui lòng liên hệ admin để trao đổi
      </div> : <>
        <main className="admin-layout">
          <div className="sidebar">
            {account && account.role && account.role.permission ? (
              <ul>
                <li>
                  <NavLink to="dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                    Tổng quan
                  </NavLink>
                </li>
                {account.role.permission.includes("products-category_view") && (
                  <li>
                    <NavLink to="products-category" className={({ isActive }) => (isActive ? "active" : "")}>
                      Danh mục sản Phẩm
                    </NavLink>
                  </li>
                )}
                {account.role.permission.includes("products_view") && (
                  <li>
                    <NavLink to="products" className={({ isActive }) => (isActive ? "active" : "")}>
                      Sản Phẩm
                    </NavLink>
                  </li>
                )}
                {/* Thêm mục Blog mới */}
                {account.role.permission.includes("blogs_view") && (
                  <li>
                    <NavLink to="blogs" className={({ isActive }) => (isActive ? "active" : "")}>
                      Blog
                    </NavLink>
                  </li>
                )}
                {account.role.permission.includes("roles_view") && (
                  <li>
                    <NavLink to="roles" className={({ isActive }) => (isActive ? "active" : "")}>
                      Nhóm quyền
                    </NavLink>
                  </li>
                )}
                {account.role.permission.includes("permissions_view") && (
                  <li>
                    <NavLink to="permissions" className={({ isActive }) => (isActive ? "active" : "")}>
                      Phân quyền
                    </NavLink>
                  </li>
                )}
                {account.role.permission.includes("accounts_view") && (
                  <li>
                    <NavLink to="accounts" className={({ isActive }) => (isActive ? "active" : "")}>
                      Danh sách tài khoản
                    </NavLink>
                  </li>
                )}
              </ul>
            ) : (
              <>Không có quyền</>
            )}
          </div>
          <div className="content">
            <Outlet />
          </div>
        </main>
      </>

      }
    </div>

  );
};

export default LayoutDefaultAdmin;
