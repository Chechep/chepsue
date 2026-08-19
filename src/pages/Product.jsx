import {
  ArrowLeft,
  Check,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import products from "../data/product";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);

  const product = products.find((item) => item.id === id);

  const addToOrder = () => {
    if (!product) return;

    const orders = JSON.parse(
      localStorage.getItem("chepsueOrders") || "[]"
    );

    const existing = orders.find(
      (item) => item.id === product.id
    );

    const updatedOrders = existing
      ? orders.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: (item.quantity || 1) + 1,
              }
            : item
        )
      : [
          ...orders,
          {
            ...product,
            quantity: 1,
            size: "",
            color: "",
          },
        ];

    localStorage.setItem(
      "chepsueOrders",
      JSON.stringify(updatedOrders)
    );

    // Immediately update Navbar cart count
    window.dispatchEvent(
      new Event("chepsueOrdersUpdated")
    );

    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 2000);
  };

  const orderNow = () => {
    addToOrder();
    navigate("/order");
  };

  if (!product) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">

          <h1 className="text-4xl font-bold text-black">
            Product Not Found
          </h1>

          <p className="text-gray-500 mt-3">
            The product you're looking for doesn't exist.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-8 bg-black text-white px-6 py-3 rounded-xl hover:bg-green transition"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>

        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white pt-32 pb-24">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-24 right-6 z-[60] flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl shadow-xl">
          <Check
            size={18}
            className="text-green"
          />

          Added to order list
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* BACK */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition"
        >
          <ArrowLeft size={17} />
          Back to Collection
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-10">

          {/* PRODUCT IMAGE */}
          <div className="relative">

            <div className="absolute -top-5 -right-5 w-24 h-24 border border-green/20 rounded-full" />

            <div className="absolute -bottom-5 -left-5 w-20 h-20 border border-black/10 rounded-full" />

            <div className="relative h-[450px] sm:h-[550px] lg:h-[650px] rounded-[32px] overflow-hidden bg-gray-100">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

            </div>
          </div>

          {/* PRODUCT INFORMATION */}
          <div className="max-w-xl">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mt-5 tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mt-6">
              {product.description}
            </p>

            {product.price && (
              <p className="text-2xl font-bold text-black mt-6">
                KSh. {product.price.toLocaleString()}
              </p>
            )}

            <div className="border-t border-black/10 my-8" />

            {/* QUALITY BOX */}
            <div className="bg-gray-50 border border-black/10 rounded-2xl p-5">
              <h3 className="font-light text-black"
              >
                Made with care
              </h3>

              <p className="text-black text-sm font-thin leading-relaxed mt-2">
                Each piece is handcrafted with attention to detail.
                Every creation has its own unique character.
              </p>

            </div>

            {/* ORDER BUTTONS */}
            <div className="grid sm:grid-cols-2 gap-3 mt-8">

              <button
                onClick={addToOrder}
                className="border border-black/30 text-black py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-black hover:text-white transition"
              >
                <ShoppingCart size={20} />
                Add to Order
              </button>

              <button
                onClick={orderNow}
                className="bg-navy/75 text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-black transition"
              >
                <Truck size={20} />
                Order Now
              </button>

            </div>

            <p className="text-center text-sm text-gray-500 mt-5">
              Want something different?{" "}
              <Link
                to="/contact"
                className="text-black font-semibold hover:text-green transition"
              >
                Request a custom piece
              </Link>
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}