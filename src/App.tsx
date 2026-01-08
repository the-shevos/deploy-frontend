import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/Register";
import Dashboard from "./page/Dashboard";
import SupportPage from "./page/SupportPage";
import DashboardHome from "./page/DashboardHome";
import Members from "./page/Members";
import ProductPage from "./page/ProductPage";
import OrdersPage from "./page/OrdersPage";
import UserProductPage from "./page/Product";
import UserOrder from "./page/UserOrder";
import Home from "./page/Home";
import WishlistPage from "./page/WishlistPage";
import ContactPage from "./component/ContactPage";
import MyOrders from "./page/MyOrders";

import AIChat from "./component/AIChat";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userProduct" element={<UserProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/myOrders" element={<MyOrders />} />
        <Route path="/aiChat" element={<AIChat />} />
        <Route path="/userOrder" element={<UserOrder />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="members" element={<Members />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
