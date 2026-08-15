import { ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import products from "../data/product";

export default function Product() {
  const { id } = useParams();

  const product = products.find((item) => item.id === id);

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
            to="/#products"
            className="inline-flex items-center gap-2 mt-8 bg-black text-white px-6 py-3 rounded-full hover:bg-green transition"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Back */}
        <Link
          to="/#products"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition mb-10"
        >
          <ArrowLeft size={17} />
          Back to Collection
        </Link>

        {/* Product */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <div className="relative">

            <div className="absolute -top-5 -right-5 w-24 h-24 border border-green/20 rounded-full" />

            <div className="absolute -bottom-5 -left-5 w-20 h-20 border border-black/10 rounded-full" />

            <div className="relative h-[450px] sm:h-[550px] lg:h-[650px] rounded-[32px] overflow-hidden bg-gray-100">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute top-5 left-5">
                <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-black">
                  {product.category}
                </span>
              </div>

            </div>
          </div>

          {/* Details */}
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

            {/* Divider */}
            <div className="border-t border-black/10 my-8" />

            {/* Handmade message */}
            <div className="bg-gray-50 border border-black/10 rounded-2xl p-5">
              <h3 className="font-semibold text-black">
                Made with care
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed mt-2">
                Each piece is handcrafted with attention to detail.
                Because our creations are handmade, every piece has
                its own unique character.
              </p>
            </div>

            {/* Order */}
            <a
              href={`/order?product=${encodeURIComponent(product.name)}`}
              className="mt-8 w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-3 font-semibold transition-all duration-300 hover:bg-green hover:scale-[1.02]"
            >
              <ShoppingBag size={20} />
              Order This Piece
            </a>

            {/* Contact */}
            <p className="text-center text-sm text-gray-500 mt-4">
              Looking for something different?{" "}
              <a
                href="/#contact"
                className="text-black font-semibold hover:text-green transition"
              >
                Request a custom piece
              </a>
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}