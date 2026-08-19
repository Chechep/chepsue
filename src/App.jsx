import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Order from "./pages/Order";

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-white text-black flex flex-col">

        <Navbar />

        <main className="flex-1">
          <Routes>

            {/* Home */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* Products */}
            <Route
              path="/products"
              element={<Products />}
            />

            {/* Individual Product */}
            <Route
              path="/product/:id"
              element={<Product />}
            />

            {/* Contact */}
            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* Order */}
            <Route
              path="/order"
              element={<Order />}
            />

          </Routes>
        </main>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;