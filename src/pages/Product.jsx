import { ArrowLeft, Check, ShoppingCart, Sparkles } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import products from "../data/product";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);

  const product = products.find((item) => item.id === id);

  const addToOrder = () => {
    const orders = JSON.parse(localStorage.getItem("chepsueOrders") || "[]");
    const existing = orders.find((item) => item.id === product.id);

    const updatedOrders = existing
      ? orders.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...orders, { ...product, quantity: 1, size: "", color: "" }];

    localStorage.setItem("chepsueOrders", JSON.stringify(updatedOrders));
    setToast(true);
    setTimeout(() => setToast(false), 2000);
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
      {toast && (
        <div className="fixed top-24 right-6 z-[60] flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl shadow-xl">
          <Check size={18} className="text-green" />
          Added to order list
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition"
        >
          <ArrowLeft size={17} />
          Back to Collection
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-10">
          <div className="relative">
            <div className="absolute -top-5 -right-5 w-24 h-24 border border-green/20 rounded-full" />

            <div className="absolute -bottom-5 -left-5 w-20 h-20 border border-black/10 rounded-full" />

            <div className="relative h-[450px] sm:h-[550px] lg:h-[650px] rounded-[32px] overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              <span className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-black">
                {product.category}
              </span>
            </div>
          </div>

          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-green text-sm font-semibold">
              <Sparkles size={16} />
              Handmade by Chepsue Arts
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mt-5 tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mt-6">
              {product.description}
            </p>

            {product.price && (
              <p className="text-2xl font-bold text-black mt-6">
                KSh {product.price.toLocaleString()}
              </p>
            )}

            <div className="border-t border-black/10 my-8" />

            <div className="bg-gray-50 border border-black/10 rounded-2xl p-5">
              <h3 className="font-semibold text-black">
                Made with care
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed mt-2">
                Each piece is handcrafted with attention to detail.
                Every creation has its own unique character.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              <button
                onClick={addToOrder}
                className="border border-black/10 text-black py-4 rounded-xl flex items-center justify-center gap-3 font-semibold hover:bg-black hover:text-white transition"
              >
                <ShoppingCart size={20} />
                Add to Order
              </button>

              <button
                onClick={orderNow}
                className="bg-black text-white py-4 rounded-xl flex items-center justify-center gap-3 font-semibold hover:bg-green transition"
              >
                <ShoppingCart size={20} />
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