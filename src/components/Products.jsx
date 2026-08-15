import { ArrowRight, ShoppingBag } from "lucide-react";
import products from "../data/product";

export default function Products() {
  return (
    <section
      id="products"
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">

          <span className="inline-flex items-center px-4 py-2 rounded-full border border-black/10 bg-black/[0.02] text-sm font-medium text-gray-700">
            Our Collection
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mt-6 tracking-tight">
            Handmade pieces.
            <span className="block text-green mt-2">
              Made for you.
            </span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
            Explore our collection of handcrafted art and decor,
            or choose a piece and make it part of your story.
          </p>

        </div>

        {/* Products */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">

          {products.map((product) => (
            <article
              key={product.id}
              className="group rounded-3xl overflow-hidden border border-black/10 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Image */}
              <a
                href={`/product/${product.id}`}
                className="block"
              >
                <div className="relative h-72 overflow-hidden bg-gray-100">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Category */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-black">
                      {product.category}
                    </span>
                  </div>

                </div>
              </a>

              {/* Content */}
              <div className="p-6">

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <h3 className="text-xl font-bold text-black">
                      {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="w-10 h-10 shrink-0 rounded-xl bg-green/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <ShoppingBag
                      size={18}
                      className="text-green"
                    />
                  </div>

                </div>

                {/* Button */}
                <a
                  href={`/product/${product.id}`}
                  className="group/button mt-6 w-full border border-black/10 text-black py-3 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300 hover:bg-black hover:text-white"
                >
                  View Product

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover/button:translate-x-1"
                  />
                </a>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}