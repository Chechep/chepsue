import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Send,
  User,
} from "lucide-react";

const products = [
  "Wall Decor",
  "Abstract Line Art",
  "Origami Ceiling Art",
  "Loom Beading",
  "Beaded Jewellery",
  "Crochet",
  "Macrame",
  "Custom Artwork",
];

export default function Order() {
  const [searchParams] = useSearchParams();

  const selectedProduct = searchParams.get("product") || "";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    product: selectedProduct,
    quantity: 1,
    size: "",
    color: "",
    location: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /*
      Replace this with your backend/API later.

      For now, the order is prepared and can be sent
      directly to Chepsue Arts through WhatsApp.
    */

    const message = `
CHEPSUE ARTS ORDER

Customer: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}

Product: ${formData.product}
Quantity: ${formData.quantity}
Size: ${formData.size || "Not specified"}
Color: ${formData.color || "Not specified"}

Location: ${formData.location}

Additional details:
${formData.message || "None"}
    `;

    const whatsappNumber = "254713428383";

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-navy via-teal to-navy flex items-center justify-center px-6">
        <div className="max-w-lg w-full bg-white rounded-3xl p-10 text-center shadow-2xl">
          <div className="w-20 h-20 bg-green/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green" />
          </div>

          <h1 className="text-3xl font-bold text-navy mt-6">
            Order Ready!
          </h1>

          <p className="text-gray-600 mt-4">
            Your order details have been prepared. Continue the conversation
            with Chepsue Arts on WhatsApp to confirm your order.
          </p>

          <a
            href="/products"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-green text-white font-medium hover:bg-green/90 transition"
          >
            <ArrowLeft size={18} />
            Back to Products
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f1ea] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-teal hover:text-green transition"
          >
            <ArrowLeft size={18} />
            Back to Home
          </a>

          <div className="mt-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green/10 text-green text-sm font-medium">
              <Package size={16} />
              Custom Order
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-navy mt-4">
              Create Your Order
            </h1>

            <p className="text-gray-600 mt-3 max-w-2xl">
              Tell us what you'd like and we'll get back to you with
              availability, pricing and delivery details.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 md:p-10 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-green/10 flex items-center justify-center">
                <User className="text-green" size={21} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-navy">
                  Your Details
                </h2>

                <p className="text-sm text-gray-500">
                  Tell us how we can reach you.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green focus:ring-2 focus:ring-green/10"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green focus:ring-2 focus:ring-green/10"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green focus:ring-2 focus:ring-green/10"
                />
              </div>

              {/* Product */}
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Select Product
                </label>

                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-green"
                >
                  <option value="">Choose a product</option>

                  {products.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green"
                />
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Size
                </label>

                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="e.g. Small, Medium, Large"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Preferred Color
                </label>

                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="e.g. Beige, Green..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Delivery Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Town / City"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green"
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-navy mb-2">
                  Additional Details
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us anything else about your order..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green resize-none"
                />
              </div>

            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-green hover:bg-green/90 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition"
            >
              <Send size={19} />
              Send Order Request
            </button>
          </form>

          {/* Sidebar */}
          <aside className="space-y-6">

            {/* Selected product */}
            <div className="bg-navy rounded-3xl p-7 text-white">
              <div className="w-12 h-12 rounded-2xl bg-green/20 flex items-center justify-center">
                <Package className="text-green" />
              </div>

              <h3 className="text-xl font-bold mt-5">
                Ordering from Chepsue Arts
              </h3>

              <p className="text-gray-300 mt-3 text-sm leading-6">
                Each piece is handcrafted with attention to detail.
                Submit your request and we'll confirm availability
                and pricing.
              </p>

              {formData.product && (
                <div className="mt-6 p-4 bg-white/10 rounded-2xl">
                  <p className="text-xs text-gray-400">
                    SELECTED PRODUCT
                  </p>

                  <p className="font-semibold text-lg mt-1 text-sand">
                    {formData.product}
                  </p>
                </div>
              )}
            </div>

            {/* Contact */}
            <div className="bg-white rounded-3xl p-7 shadow-lg">
              <h3 className="font-bold text-xl text-navy">
                Need Help?
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Contact Chepsue Arts directly if you need help choosing
                a product or creating a custom piece.
              </p>

              <div className="space-y-4 mt-6">

                <a
                  href="tel:+254713428383"
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center">
                    <Phone size={18} className="text-green" />
                  </div>

                  <span className="text-sm text-gray-700">
                    +254 713 428 383
                  </span>
                </a>

                <a
                  href="mailto:chepsuearts@gmail.com"
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center">
                    <Mail size={18} className="text-green" />
                  </div>

                  <span className="text-sm text-gray-700">
                    chepsuearts@gmail.com
                  </span>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center">
                    <MapPin size={18} className="text-green" />
                  </div>

                  <span className="text-sm text-gray-700">
                    Kenya
                  </span>
                </div>

              </div>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/254713428383"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] text-white rounded-2xl py-4 font-semibold"
            >
              <MessageCircle size={21} />
              Chat on WhatsApp
            </a>

          </aside>
        </div>
      </div>
    </main>
  );
}