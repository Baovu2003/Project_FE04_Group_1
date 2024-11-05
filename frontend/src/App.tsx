import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LayoutDefaultClient from "./LayoutDefault/LauoutDefaultClient/LayoutDefaultClient";
import Home from "./pages/client/Home/Home";
import Product from "./pages/client/Product/Product";
import ProductDetail from "./pages/client/ProductDetail/ProductDetail";
import Contact from "./pages/client/Contact/Contact";
import News from "./pages/client/News/News";
import About from "./pages/client/About/About";
import Cart from "./pages/client/Cart/Cart";
import LoginUser from "./pages/client/User/LoginUser";
import Register from "./pages/client/User/Register";
import PassResovery from "./pages/client/User/PassResovery";
import NotFoundClient from "./pages/client/404NotFound/NotFound";
import LayoutDefaultAdmin from "./LayoutDefault/LayoutDefaultAdmin/LayoutDefaultAdmin";
// import ProtectedRoute from "./pages/admin/ProtectedRoute/ProtectedRoute";
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
import 'antd/dist/reset.css';
import Profile from "./pages/client/User/UserProfile";
import DetailCategory from "./pages/admin/Category/DetailCategory";
import UpdateCategory from "./pages/admin/Category/UpdateCategory";
import UpdateAccount from "./pages/admin/Accounts/UpdateAccount";
import DetailAccount from "./pages/admin/Accounts/DetailAccount";
import ForgotPassword from "./pages/client/User/ForgotPassword";
import OTPPassword from "./pages/client/User/OTPPassword";
import ResetPassword from "./pages/client/User/ResetPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutDefaultClient />}>
          <Route index element={<Home />} />
          <Route path="listProducts" element={<Product />} />
          <Route path="listProducts/detail/:slug" element={<ProductDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="news" element={<News />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/user/login" element={<LoginUser />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/password/forgot" element={<ForgotPassword />} />
          <Route path="/user/password/otp/:email" element={<OTPPassword />} />
          <Route path="/user/password/reset" element={<ResetPassword />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/PassResovery" element={<PassResovery />} />
          <Route path="*" element={<NotFoundClient />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<LayoutDefaultAdmin />}>
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products-category" element={<Allcategory />}>
              <Route index element={<Category />} />
              <Route path="detail/:id" element={<DetailCategory />} />
              <Route path="edit/:id" element={<UpdateCategory />} />
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
              <Route path="edit/:id" element={<UpdateAccount />} />
              <Route path="detail/:id" element={<DetailAccount />} />
            </Route>

            <Route path="permissions" element={<Permissions />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        {/* </Route> */}
        <Route path="/admin/auth/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
