import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MapPin,
  Package,
  Phone,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import { Link } from "react-router-dom";

const whatsappNumber = "254783800900";

export default function Order() {
  const [orderItems, setOrderItems] = useState(() => {
    return JSON.parse(localStorage.getItem("chepsueOrders") || "[]");
  });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateItems = (items) => {
    setOrderItems(items);

    localStorage.setItem(
      "chepsueOrders",
      JSON.stringify(items)
    );

    // Notify other components in the same tab
    window.dispatchEvent(new Event("chepsueOrdersUpdated"));
  };

  const increaseQuantity = (id) => {
    updateItems(
      orderItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number(item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    updateItems(
      orderItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Number(item.quantity || 1) - 1
              ),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    updateItems(
      orderItems.filter((item) => item.id !== id)
    );
  };

  const updateItem = (id, field, value) => {
    updateItems(
      orderItems.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createMessage = () => `
CHEPSUE ARTS ORDER

CUSTOMER DETAILS
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || "Not provided"}
Location: ${formData.location}

ORDER
${orderItems
  .map(
    (item, index) => `
${index + 1}. ${item.name}
Quantity: ${item.quantity}
Size: ${item.size || "Not specified"}
Color: ${item.color || "Not specified"}
Price: ${
      item.price
        ? `KSh ${item.price.toLocaleString()}`
        : "Price to confirm"
    }
`
  )
  .join("\n")}

ADDITIONAL DETAILS
${formData.message || "None"}

Please confirm availability, final price and delivery details.
`;

  const orderOnWhatsApp = () => {
    if (!orderItems.length) {
      return alert(
        "Please add at least one product to your order."
      );
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.location
    ) {
      return alert(
        "Please complete your name, phone number and delivery location."
      );
    }

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        createMessage()
      )}`,
      "_blank"
    );

    setSubmitted(true);
  };

  const submitOrder = (e) => {
    e.preventDefault();

    if (!orderItems.length) {
      return alert(
        "Please add at least one product to your order."
      );
    }

    const savedOrders = JSON.parse(
      localStorage.getItem("chepsueOrderHistory") || "[]"
    );

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      customer: formData,
      items: orderItems,
    };

    localStorage.setItem(
      "chepsueOrderHistory",
      JSON.stringify([
        newOrder,
        ...savedOrders,
      ])
    );

    setSubmitted(true);
  };

  const totalItems = orderItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  const totalPrice = orderItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  if (submitted) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20 flex items-center justify-center px-6">

        <div className="max-w-lg w-full bg-white border border-black/10 rounded-[32px] p-10 text-center shadow-xl">

          <div className="w-20 h-20 bg-green/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green" />
          </div>

          <h1
            className="text-4xl text-black mt-6 font-semibold"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Order Ready!
          </h1>

          <p className="text-gray-600 mt-4 leading-7">
            Your order details have been prepared.
            We'll confirm availability, pricing and
            delivery details with you.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">

            <Link
              to="/products"
              className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              <ArrowLeft size={17} />
              Products
            </Link>

            <button
              onClick={() => setSubmitted(false)}
              className="flex-1 border border-black/10 px-6 py-3 rounded-xl hover:bg-gray-50 transition"
            >
              Back to Order
            </button>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-24 pb-24">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* BACK */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition"
        >
          <ArrowLeft size={17} />
          Back to Products
        </Link>

        {/* HEADER */}
        <div className="mt-2">
          <h1
            className="text-5xl md:text-6xl text-black mt-5 font-medium leading-[0.95]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Complete Your
            <span className="block italic text-green mt-2">
              Order.
            </span>
          </h1>

          <p className="text-gray-600 mt-5 max-w-2xl leading-7">
            Review your pieces, choose your options and place your order.
          </p>

        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 mt-2">

          {/* LEFT */}
          <div className="space-y-6">

            {/* ORDER LIST */}
            <section className="bg-white border border-black/10 rounded-[28px] p-6 md:p-8">

              <div className="flex items-center justify-between">

                <h2
                  className="text-2xl text-black font-semibold"
                  style={{
                    fontFamily:
                      "'Cormorant Garamond', serif",
                  }}
                >
                  Your Order List
                </h2>

                {totalItems > 0 && (
                  <span className="text-sm text-gray-500">
                    {totalItems}{" "}
                    {totalItems === 1
                      ? "item"
                      : "items"}
                  </span>
                )}

              </div>

              {!orderItems.length ? (
                <div className="text-center py-16">

                  <Package
                    className="mx-auto text-gray-300"
                    size={45}
                  />

                  <h3 className="font-semibold text-black mt-5">
                    Your order list is empty
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    Add products from our collection.
                  </p>

                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
                  >
                    Browse Products
                    <ArrowLeft
                      size={16}
                      className="rotate-180"
                    />
                  </Link>

                </div>
              ) : (
                <div className="space-y-5 mt-2">

                  {orderItems.map((item) => (
                    <article
                      key={item.id}
                      className="border border-black/10 rounded-2xl p-4 hover:border-black/20 transition"
                    >

                      <div className="flex gap-4">

                        {/* IMAGE */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl shrink-0"
                        />

                        <div className="flex-1 min-w-0">

                          <div className="flex justify-between gap-2">

                            <div>

                              <h3 className="font-bold text-black">
                                {item.name}
                              </h3>

                              <p className="text-sm text-gray-500 mt-1">
                                {item.category}
                              </p>

                            </div>

                            <button
                              onClick={() =>
                                removeItem(item.id)
                              }
                              aria-label="Remove product"
                              className="text-gray-400 hover:text-red-500 transition shrink-0"
                            >
                              <Trash2 size={18} />
                            </button>

                          </div>

                          {item.price && (
                            <p className="font-semibold mt-3">
                              KSh.{" "}
                              {item.price.toLocaleString()}
                            </p>
                          )}

                          <div className="grid sm:grid-cols-3 gap-3 mt-2">

                            <input
                              value={item.size || ""}
                              onChange={(e) =>
                                updateItem(
                                  item.id,
                                  "size",
                                  e.target.value
                                )
                              }
                              placeholder="Size"
                              className="w-full px-3 py-2 rounded-lg border border-black/10 outline-none focus:border-green"
                            />

                            <input
                              value={item.color || ""}
                              onChange={(e) =>
                                updateItem(
                                  item.id,
                                  "color",
                                  e.target.value
                                )
                              }
                              placeholder="Color"
                              className="w-full px-3 py-2 rounded-lg border border-black/10 outline-none focus:border-green"
                            />

                            <div className="flex items-center justify-between border border-black/10 rounded-lg px-2">

                              <button
                                onClick={() =>
                                  decreaseQuantity(
                                    item.id
                                  )
                                }
                                className="p-2 hover:bg-gray-100 rounded-lg"
                              >
                                <Minus size={16} />
                              </button>

                              <span className="font-semibold">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  increaseQuantity(
                                    item.id
                                  )
                                }
                                className="p-2 hover:bg-gray-100 rounded-lg"
                              >
                                <Plus size={16} />
                              </button>

                            </div>

                          </div>

                        </div>

                      </div>

                    </article>
                  ))}

                </div>
              )}

            </section>

            {/* CUSTOMER DETAILS */}
            <form
              onSubmit={submitOrder}
              className="bg-white border border-black/10 rounded-[28px] p-6 md:p-8"
            >

              <h2
                className="text-2xl text-black font-semibold"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                }}
              >
                Customer Details
              </h2>

              <div className="grid md:grid-cols-2 gap-5 mt-4">

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name *"
                  required
                  className="px-4 py-3 rounded-xl border border-black/10 outline-none focus:border-green"
                />

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  required
                  className="px-4 py-3 rounded-xl border border-black/10 outline-none focus:border-green"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email (optional)"
                  className="px-4 py-3 rounded-xl border border-black/10 outline-none focus:border-green"
                />

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Delivery Location *"
                  required
                  className="px-4 py-3 rounded-xl border border-black/10 outline-none focus:border-green"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Additional details..."
                  className="md:col-span-2 px-4 py-3 rounded-xl border border-black/10 outline-none focus:border-green resize-none"
                />

              </div>
              <button
              onClick={orderOnWhatsApp}
              disabled={!orderItems.length}
              className="w-full flex items-center justify-center gap-3 bg-black/5 border border-black/10 text-black rounded-2xl py-4 font-semibold hover:bg-black/10 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >

              <svg
                viewBox="0 0 32 32"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  fill="#25D366"
                  d="M16 5.3A10.7 10.7 0 0 0 6.8 21.4L5.5 26.5l5.2-1.3A10.7 10.7 0 1 0 16 5.3Zm0 19.4c-1.7 0-3.3-.5-4.7-1.4l-.3-.2-3.1.8.8-3-.2-.3a8.7 8.7 0 1 1 7.5 4.1Zm4.8-6.5c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.7-3.2-.3-.5.3-.5.8-1.7.1-.2 0-.4 0-.6 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.4 4.7.8.3 1.4.5 1.9.6.8.3 1.5.2 2.1.1.7-.1 1.7-.7 2-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.3Z"
                />
              </svg>

              Order on WhatsApp

            </button>

            </form>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-6">

            {/* SUMMARY */}
            <div className="bg-black text-white rounded-[28px] p-7">

              <h2
                className="text-2xl font-semibold"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                }}
              >
                Order Summary
              </h2>

              <div className="mt-6 space-y-3">

                <div className="flex justify-between text-gray-300">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="border-t border-white/10 pt-3 flex justify-between font-semibold">

                  <span>Total</span>

                  <span>
                    {orderItems.some(
                      (item) => item.price
                    )
                      ? `KSh. ${totalPrice.toLocaleString()}`
                      : "To confirm"}
                  </span>

                </div>

              </div>

            </div>

            {/* HELP */}
            <div className="bg-gray-50 border border-black/10 rounded-[28px] p-7">

              <h3
                className="text-2xl text-black font-semibold"
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                }}
              >
                Need Help?
              </h3>

              <div className="space-y-4 mt-5">

                <a
                  href="tel:+254783800900"
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-black"
                >
                  <Phone
                    size={18}
                    className="text-green"
                  />
                  +254 783 800 900
                </a>

                <a
                  href="mailto:chepsuearts@gmail.com"
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-black"
                >
                  <Mail
                    size={18}
                    className="text-green"
                  />
                  chepsuearts@gmail.com
                </a>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin
                    size={18}
                    className="text-green"
                  />
                  Kenya
                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}