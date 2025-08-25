import { Routes, Route } from "react-router-dom";
import data from "./data.json";
import Home from "./pages/home.jsx";
import ProductDetailPage from "./pages/product-detail-page.jsx";
import Cart from "./pages/cart.jsx";
import CheckOut from "./pages/checkout.jsx";
import Payment from "./pages/payment.jsx";
import Login from "./pages/login.jsx";
import Registered from "./pages/signup.jsx";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/Hero.jsx";
import FooterSection from "./components/Footer.jsx";
import WhatsNew from "./components/WhatsNew.jsx";
import MoreToExploreCarousel from "./components/MoreToExploreCarousel.jsx";
import DashboardLayout from "./dashboard/DashboardLayout";
import DashboardHome from "./dashboard/pages/DashboardHome";
import Reports from "./dashboard/pages/Reports";
import Settings from "./dashboard/pages/Settings";
import ManageProducts from "./dashboard/pages/ManageProducts.jsx";
import CreateProduct from "./dashboard/pages/CreateProduct.jsx";
import ProductDetail from "./dashboard/pages/ProductDetail.jsx";
import EditProduct from "./dashboard/pages/EditProduct.jsx";
import Categories from "./dashboard/pages/Categories.jsx";
import ManageUsers from "./dashboard/pages/Users.jsx";
import Orders from "./dashboard/pages/Orders.jsx";
import { useSelector } from "react-redux";

// import Login from "./pages/login.jsx";
import PrivateRoute from "../src/components/pritate-route.jsx";
// import DashboardLayout from "./components/dashboard-layout.jsx";
// import { ChartAreaInteractive } from "./components/chart-area-interactive.jsx";
// import { DataTable } from "./components/data-table.jsx";
// import { SectionCards } from "./components/section-cards.jsx";

export default function App() {

return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registered />} />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/order-successfully" element={<Payment />} />

        {/* ✅ Protected Admin Routes */}
        {/* Layaout */}
        <Route element={<PrivateRoute allowedRoles={[1]} />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<Settings />} />
            <Route path="manage-products" element={<ManageProducts />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="product" element={<ProductDetail />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="categories" element={<Categories />} />
            <Route path="users" element={<ManageUsers />} />
          </Route>
          {/* Layaout */}
        </Route>
      </Routes>
    </>
  );
}

{
  /* ✅ Protected Routes with layout */
}

<Route element={<PrivateRoute />}></Route>;

{
  /* </Route> */
  // <Route path="/dashboard" element={<DashboardLayout />}>
  //       <Route index element={<DashboardHome />} />
  //       <Route path="reports" element={<Reports />} />
  //       <Route path="settings" element={<Settings />} />
  //     </Route>
}
