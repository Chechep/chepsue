import { ArrowRight, Check, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import products from "../data/product";

export default function Products() {
  const [toast, setToast] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const addToOrder = (product) => {
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

    window.dispatchEvent(
      new Event("chepsueOrdersUpdated")
    );

    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 2000);
  };

  return (
    <section
      id="products"
      className="min-h-screen bg-white pt-20 pb-20"
    >
      {/* SUCCESS TOAST */}
      {toast && (
        <div className="fixed top-24 right-6 z-[60] flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl shadow-xl">
          <Check
            size={18}
            className="text-green"
          />
          <span>Added to order list</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* SEARCH */}
        <div className="max-w-2xl mx-auto mt-10">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search products..."
              className="w-full pl-12 pr-5 py-4 rounded-2xl border border-black/20 bg-white text-black outline-none focus:border-black transition"
            />
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mt-5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "border border-black/20 text-black hover:bg-black hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}
        <div className="mt-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">

              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group rounded-3xl overflow-hidden border border-black/20 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  {/* IMAGE */}
                  <Link
                    to={`/product/${product.id}`}
                    className="block"
                  >
                    <div className="relative h-56 sm:h-72 overflow-hidden bg-gray-100">

                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                    </div>
                  </Link>

                  {/* CONTENT */}
                  <div className="p-4 sm:p-6">

                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-black">
                        {product.name}
                      </h2>

                      <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* CATEGORY */}
                      <p className="text-green text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-3">
                        {product.category}
                      </p>
                    </div>

                    {/* PRICE */}
                    {product.price && (
                      <p className="text-base sm:text-lg font-bold text-black mt-5">
                        KSh.{" "}
                        {product.price.toLocaleString()}
                      </p>
                    )}

                    {/* ACTIONS */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-5">

                      <Link
                        to={`/product/${product.id}`}
                        className="border border-black/30 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium hover:bg-black hover:text-white transition"
                      >
                        View
                        <ArrowRight size={15} />
                      </Link>

                      <button
                        onClick={() =>
                          addToOrder(product)
                        }
                        className="bg-navy/75 text-white py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-semibold hover:bg-green transition"
                      >
                        <ShoppingCart size={16} />
                        Order
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </div>
          ) : (

            /* NO RESULTS */
            <div className="text-center py-20">

              <Search
                size={40}
                className="mx-auto text-gray-300"
              />

              <h3 className="text-xl font-semibold text-black mt-4">
                No products found
              </h3>

              <p className="text-gray-500 mt-2">
                Try a different search or category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-5 bg-black text-white px-5 py-2.5 rounded-xl hover:bg-green transition"
              >
                Clear Filters
              </button>

            </div>

          )}
        </div>

      </div>
    </section>
  );
}