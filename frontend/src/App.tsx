
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import LayoutDefaultClient from "./LayoutDefault/LauoutDefaultClient/LayoutDefaultClient";
import Home from "./pages/client/Home/Home";
import Product from "./pages/client/Product/Product";
import ProductDetail from "./pages/client/ProductDetail/ProductDetail";
import Contact from "./pages/client/Contact/Contact";
import About from "./pages/client/About/About";
import Cart from "./pages/client/Cart/Cart";
import LoginUser from "./pages/client/User/LoginUser";
import Register from "./pages/client/User/Register";
import NotFoundClient from "./pages/client/404NotFound/NotFound";
import LayoutDefaultAdmin from "./LayoutDefault/LayoutDefaultAdmin/LayoutDefaultAdmin";
import ProtectedRoute from "./pages/admin/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import Allcategory from "./pages/admin/Category/Allcategory";
import Category from "./pages/admin/Category/Category";
import CreateCategory from "./pages/admin/Category/CreateCategory";
import AllProduct from "./pages/admin/Product/AllProduct";
import ProductAdmin from "./pages/admin/Product/ProductAdmin";
import CreateProduct from "./pages/admin/Product/CreateProduct";
import Detailproduct from "./pages/admin/Product/Detailproduct";
import UpdateProduct from "./pages/admin/Product/UpdateProduct";
import RoleGroup from "./pages/admin/RoleGroup/RoleGroup";
import RolesList from "./pages/admin/RoleGroup/RolesList";
import CreateRole from "./pages/admin/RoleGroup/CreateRole";
import UpdateRole from "./pages/admin/RoleGroup/UpdateRole";
import Account from "./pages/admin/Accounts/Account";
import AccountList from "./pages/admin/Accounts/AccountList";
import AccountCreate from "./pages/admin/Accounts/AccountCreate";
import Permissions from "./pages/admin/Permissions/Permissions";
import Login from "./pages/admin/Auth/Login";
import NotFound from "./pages/admin/404NotFound/404NotFound/NotFound";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutDefaultClient />}>
          <Route index element={<Home />} />
          <Route path="listProducts" element={<Product />} />
          <Route path="listProducts/detail/:slug" element={<ProductDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/user/login" element={<LoginUser />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="*" element={<NotFoundClient />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<LayoutDefaultAdmin />}>
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products-category" element={<Allcategory />}>
              <Route index element={<Category />} />
              <Route path="create" element={<CreateCategory />} />
            </Route>

            <Route path="products" element={<AllProduct />}>
              <Route index element={<ProductAdmin />} />
              <Route path="create" element={<CreateProduct />} />
              <Route path="detail/:id" element={<Detailproduct />} />
              <Route path="edit/:id" element={<UpdateProduct />} />
            </Route>

            <Route path="roles" element={<RoleGroup />}>
              <Route index element={<RolesList />} />
              <Route path="create" element={<CreateRole />} />
              <Route path="edit/:id" element={<UpdateRole />} />
            </Route>

            <Route path="accounts" element={<Account />}>
              <Route index element={<AccountList />} />
              <Route path="create" element={<AccountCreate />} />
              {/* <Route path="edit/:id" element={<UpdateRole />} /> */}
            </Route>

            <Route path="permissions" element={<Permissions />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        <Route path="/admin/auth/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
