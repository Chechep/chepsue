import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./components/Products";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Notifications from "./pages/Notifications";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-black flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* HOME */}
            <Route path="/" element={<Home />} />

            {/* PRODUCTS */}
            <Route path="/products" element={<Products />} />

            {/* INDIVIDUAL PRODUCT */}
            <Route path="/product/:id" element={<Product />} />

            {/* CONTACT */}
            <Route path="/contact" element={<Contact />} />

            {/* ORDER */}
            <Route path="/order" element={<Order />} />

            {/* NOTIFICATIONS / ORDER HISTORY */}
            <Route path="/notifications" element={<Notifications />} />

            {/* AUTHENTICATION */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* USER PROFILE */}
            <Route path="/profile" element={<Profile />} />

            {/* ADMIN */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;