import { Menu, X, ShoppingCart, Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import icon from "../assets/icon.png";

const ORDERS_KEY = "chepsueOrders";
const NOTIFICATIONS_KEY = "chepsueNotifications";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const menuRef = useRef(null);

  const updateOrderCount = () => {
    try {
      const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");

      const count = orders.reduce(
        (total, item) => total + Number(item.quantity || 1),
        0
      );

      setOrderCount(count);
    } catch {
      setOrderCount(0);
    }
  };

  const updateNotificationCount = () => {
    try {
      const notifications = JSON.parse(
        localStorage.getItem(NOTIFICATIONS_KEY) || "[]"
      );

      const unread = notifications.filter(
        (notification) => !notification.read
      ).length;

      setNotificationCount(unread);
    } catch {
      setNotificationCount(0);
    }
  };

  useEffect(() => {
    const initializeCounts = () => {
      updateOrderCount();
      updateNotificationCount();
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleOrdersUpdated = () => {
      updateOrderCount();
    };

    const handleNotificationsUpdated = () => {
      updateNotificationCount();
    };

    document.addEventListener("mousedown", handleClickOutside);

    window.addEventListener("storage", updateOrderCount);
    window.addEventListener("storage", updateNotificationCount);

    window.addEventListener("chepsueOrdersUpdated", handleOrdersUpdated);
    initializeCounts();
    handleNotificationsUpdated();

    const interval = setInterval(() => {
      updateOrderCount();
      updateNotificationCount();
    }, 500);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      window.removeEventListener("storage", updateOrderCount);
      window.removeEventListener("storage", updateNotificationCount);

      window.removeEventListener("chepsueOrdersUpdated", handleOrdersUpdated);
      window.removeEventListener(
        "chepsueNotificationsUpdated",
        handleNotificationsUpdated
      );

      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-2 left-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-black/10 rounded-xl shadow-sm">
      {/* Luxury Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />

      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />

      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:scale-105 transition-transform"
        >
          <img src={icon} alt="Chepsue Arts" className="w-14 h-14" />

          <div>
            <h1
              className="text-black text-2xl leading-none font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Chepsue Arts
            </h1>

            <p
              className="text-xs text-black/70 italic tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Handmade With Love
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative py-1 text-black font-semibold hover:scale-105 transition-transform ${
                  isActive
                    ? "after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-black"
                    : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="ml-auto flex items-center gap-4">
          {/* NOTIFICATIONS */}
          <NavLink
            to="/notifications"
            aria-label="Notifications"
            className={({ isActive }) =>
              `relative hover:scale-110 transition-transform ${
                isActive
                  ? "after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[2px] after:bg-black"
                  : ""
              }`
            }
          >
            <Bell className="w-6 h-6 text-black" />

            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
          </NavLink>

          {/* CART / ORDER */}
          <NavLink
            to="/order"
            aria-label={`Order${
              orderCount > 0 ? `, ${orderCount} items` : ""
            }`}
            className={({ isActive }) =>
              `relative hover:scale-110 transition-transform ${
                isActive
                  ? "after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[2px] after:bg-black"
                  : ""
              }`
            }
          >
            <ShoppingCart className="w-6 h-6 text-black" />

            {orderCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[19px] h-[19px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {orderCount > 99 ? "99+" : orderCount}
              </span>
            )}
          </NavLink>

          {/* MOBILE MENU */}
          <div ref={menuRef} className="relative md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className="text-black hover:scale-110 transition-transform"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-32 bg-white/95 backdrop-blur-md border border-black/10 rounded-xl shadow-lg py-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `relative block px-4 py-2.5 text-sm font-semibold text-black hover:scale-105 transition-transform ${
                        isActive ? "bg-black/5" : ""
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.name}

                        {isActive && (
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-black rounded-full" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}