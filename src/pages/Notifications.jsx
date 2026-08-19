import {
    Bell,
    Package,
    ShoppingBag,
    CheckCircle2,
    Trash2,
    ArrowLeft,
  } from "lucide-react";
  import { Link } from "react-router-dom";
  import { useEffect, useState } from "react";
  
  export default function Notifications() {
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      const loadOrders = () => {
        const savedOrders = JSON.parse(
          localStorage.getItem("chepsueOrderHistory") || "[]"
        );
  
        setOrders(savedOrders);
      };
  
      loadOrders();
  
      window.addEventListener("storage", loadOrders);
  
      return () => {
        window.removeEventListener("storage", loadOrders);
      };
    }, []);
  
    const clearNotifications = () => {
      localStorage.removeItem("chepsueOrderHistory");
      setOrders([]);
    };
  
    return (
      <main className="min-h-screen bg-white pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
  
          {/* Header */}
          <div className="flex items-start justify-between gap-5">
  
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-gray-50 text-sm font-medium">
                <Bell size={16} />
                Notifications
              </div>
  
              <h1 className="text-4xl md:text-5xl font-bold text-black mt-5">
                Your Orders
              </h1>
  
              <p className="text-gray-500 mt-3">
                View your previous orders and order activity.
              </p>
            </div>
  
            {orders.length > 0 && (
              <button
                onClick={clearNotifications}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition"
              >
                <Trash2 size={16} />
                Clear
              </button>
            )}
          </div>
  
          {/* No notifications */}
          {!orders.length ? (
            <div className="mt-12 border border-black/10 rounded-3xl p-12 text-center">
  
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto">
                <Bell size={28} className="text-gray-400" />
              </div>
  
              <h2 className="text-xl font-semibold text-black mt-5">
                No order notifications
              </h2>
  
              <p className="text-gray-500 mt-2">
                Your completed orders will appear here.
              </p>
  
              <Link
                to="/products"
                className="inline-flex items-center gap-2 mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-green transition"
              >
                <ShoppingBag size={17} />
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6 mt-10">
  
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="border border-black/10 rounded-3xl p-6 md:p-8"
                >
  
                  {/* Order header */}
                  <div className="flex items-start justify-between gap-4">
  
                    <div className="flex items-center gap-3">
  
                      <div className="w-11 h-11 rounded-xl bg-green/10 flex items-center justify-center">
                        <CheckCircle2
                          size={22}
                          className="text-green"
                        />
                      </div>
  
                      <div>
                        <h2 className="font-bold text-black">
                          Order Submitted
                        </h2>
  
                        <p className="text-sm text-gray-500 mt-1">
                          {order.date}
                        </p>
                      </div>
  
                    </div>
  
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green/10 text-green">
                      Order Received
                    </span>
  
                  </div>
  
                  {/* Customer */}
                  {order.customer && (
                    <div className="bg-gray-50 rounded-2xl p-5 mt-6">
  
                      <h3 className="font-semibold text-black">
                        Delivery Details
                      </h3>
  
                      <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
  
                        <p className="text-gray-600">
                          <span className="font-medium text-black">
                            Name:
                          </span>{" "}
                          {order.customer.name}
                        </p>
  
                        <p className="text-gray-600">
                          <span className="font-medium text-black">
                            Phone:
                          </span>{" "}
                          {order.customer.phone}
                        </p>
  
                        <p className="text-gray-600">
                          <span className="font-medium text-black">
                            Location:
                          </span>{" "}
                          {order.customer.location}
                        </p>
  
                        {order.customer.email && (
                          <p className="text-gray-600">
                            <span className="font-medium text-black">
                              Email:
                            </span>{" "}
                            {order.customer.email}
                          </p>
                        )}
  
                      </div>
  
                    </div>
                  )}
  
                  {/* Products */}
                  <div className="mt-6">
  
                    <div className="flex items-center gap-2">
                      <Package size={18} />
                      <h3 className="font-semibold text-black">
                        Ordered Products
                      </h3>
                    </div>
  
                    <div className="space-y-3 mt-4">
  
                      {order.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 border border-black/10 rounded-2xl p-3"
                        >
  
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-xl"
                          />
  
                          <div className="flex-1">
  
                            <h4 className="font-semibold text-black">
                              {item.name}
                            </h4>
  
                            <p className="text-sm text-gray-500 mt-1">
                              {item.category}
                            </p>
  
                            <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-2">
  
                              <span>
                                Quantity: {item.quantity}
                              </span>
  
                              {item.size && (
                                <span>
                                  Size: {item.size}
                                </span>
                              )}
  
                              {item.color && (
                                <span>
                                  Color: {item.color}
                                </span>
                              )}
  
                            </div>
  
                          </div>
  
                          {item.price && (
                            <p className="font-semibold text-black">
                              KSh{" "}
                              {(
                                item.price * item.quantity
                              ).toLocaleString()}
                            </p>
                          )}
  
                        </div>
                      ))}
  
                    </div>
                  </div>
  
                  {/* Total */}
                  <div className="border-t border-black/10 mt-6 pt-5 flex justify-between">
  
                    <span className="font-medium text-gray-500">
                      Order Total
                    </span>
  
                    <span className="font-bold text-black">
  
                      {order.items?.some((item) => item.price)
                        ? `KSh ${order.items
                            .reduce(
                              (total, item) =>
                                total +
                                (item.price || 0) *
                                  item.quantity,
                              0
                            )
                            .toLocaleString()}`
                        : "Price to confirm"}
  
                    </span>
  
                  </div>
  
                </article>
              ))}
  
            </div>
          )}
  
          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-8 text-sm text-gray-500 hover:text-black transition"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
  
        </div>
      </main>
    );
  }