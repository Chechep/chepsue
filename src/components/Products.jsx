import { ArrowRight, Check, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import products from "../data/product";

export default function Products() {
  const [toast, setToast] = useState(false);

  const addToOrder = (product) => {
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

  return (
    <section id="products" className="min-h-screen bg-white pt-32 pb-24">
      {toast && (
        <div className="fixed top-24 right-6 z-[60] flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl shadow-xl">
          <Check size={18} className="text-green" />
          Added to order list
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-10">
          {products.map((product) => (
            <article
              key={product.id}
              className="group rounded-3xl overflow-hidden border border-black/20 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-black">
                    {product.category}
                  </span>
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-black">
                      {product.name}
                    </h2>

                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="w-10 h-10 shrink-0 rounded-xl bg-green/10 flex items-center justify-center group-hover:scale-110 transition">
                    <ShoppingCart size={18} className="text-green" />
                  </div>
                </div>

                {product.price && (
                  <p className="text-lg font-bold text-black mt-5">
                    KSh {product.price.toLocaleString()}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <Link
                    to={`/product/${product.id}`}
                    className="border border-black/10 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-black hover:text-white transition"
                  >
                    View <ArrowRight size={16} />
                  </Link>

                  <button
                    onClick={() => addToOrder(product)}
                    className="bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold hover:bg-green transition"
                  >
                    <ShoppingCart size={17} /> Order
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}