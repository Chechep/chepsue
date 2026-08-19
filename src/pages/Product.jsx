import { ArrowLeft, Check, ShoppingBag, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import products from "../data/product";

export default function Product() {
  const { id } = useParams();
  const [toast, setToast] = useState(false);
  const product = products.find((item) => item.id === id);

  const addToOrder = () => {
    const orders = JSON.parse(localStorage.getItem("chepsueOrders") || "[]");
    const existing = orders.find((item) => item.id === product.id);

    if (existing) existing.quantity += 1;
    else orders.push({ ...product, quantity: 1, size: "", color: "" });

    localStorage.setItem("chepsueOrders", JSON.stringify(orders));
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  if (!product) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">Product Not Found</h1>
          <Link to="/products" className="inline-flex items-center gap-2 mt-8 bg-black text-white px-6 py-3 rounded-full">
            <ArrowLeft size={17} /> Back to Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white pt-32 pb-20">
      {toast && (
        <div className="fixed top-24 right-6 z-[60] flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl shadow-xl">
          <Check size={18} className="text-green" />
          Added to order list
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-10">
          <ArrowLeft size={17} /> Back to Collection
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative h-[450px] sm:h-[550px] lg:h-[650px] rounded-[32px] overflow-hidden bg-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />

            <span className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-black">
              {product.category}
            </span>
          </div>

          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-green text-sm font-semibold">
              <Sparkles size={16} /> Handmade by Chepsue Arts
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mt-5 tracking-tight">
              {product.name}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mt-6">{product.description}</p>

            {product.price && (
              <p className="text-2xl font-bold text-black mt-6">
                KSh {product.price.toLocaleString()}
              </p>
            )}

            <div className="border-t border-black/10 my-8" />

            <div className="bg-gray-50 border border-black/10 rounded-2xl p-5">
              <h3 className="font-semibold text-black">Made with care</h3>
              <p className="text-gray-500 text-sm leading-relaxed mt-2">
                Each piece is handcrafted with attention to detail, making every creation unique.
              </p>
            </div>

            <button onClick={addToOrder} className="mt-8 w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-3 font-semibold hover:bg-green hover:scale-[1.02] transition">
              <ShoppingBag size={20} /> Add to Order
            </button>

            <Link to="/order" className="mt-3 w-full border border-black/10 text-black py-4 rounded-xl flex items-center justify-center font-semibold hover:bg-gray-50 transition">
              Go to Order List
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}