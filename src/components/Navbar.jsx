import {
  Menu,
  X,
  ShoppingCart,
  Bell,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Link,
} from "react-router-dom";
import icon from "../assets/icon.png";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [notificationCount, setNotificationCount] =
    useState(0);

  const menuRef = useRef(null);

  const { user } = useAuth();

  const updateOrderCount = () => {
    try {
      const orders = JSON.parse(
        localStorage.getItem("chepsueOrders") || "[]"
      );

      const count = orders.reduce(
        (total, item) =>
          total + Number(item.quantity || 1),
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
        localStorage.getItem(
          "chepsueNotifications"
        ) || "[]"
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
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    window.addEventListener(
      "storage",
      updateOrderCount
    );

    window.addEventListener(
      "chepsueOrdersUpdated",
      updateOrderCount
    );

    window.addEventListener(
      "chepsueNotificationsUpdated",
      updateNotificationCount
    );

    updateOrderCount();
    updateNotificationCount();

    const interval = setInterval(() => {
      updateOrderCount();
      updateNotificationCount();
    }, 500);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      window.removeEventListener(
        "storage",
        updateOrderCount
      );

      window.removeEventListener(
        "chepsueOrdersUpdated",
        updateOrderCount
      );

      window.removeEventListener(
        "chepsueNotificationsUpdated",
        updateNotificationCount
      );

      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  const getInitials = () => {
    const value = user?.displayName || user?.email || "U";

    return value
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-white/10 backdrop-blur-md border border-black/10 rounded-xl shadow-sm">

      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />

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
          <img
            src={icon}
            alt="Chepsue Arts"
            className="w-8 h-8"
          />

          <div>
            <h1
              className="text-black text-2xl leading-none font-semibold"
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              Chepsue Arts
            </h1>

            <p
              className="text-xs text-black/70 italic tracking-wide"
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
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
            className="relative hover:scale-110 transition-transform"
          >
            <Bell className="w-6 h-6 text-black" />

            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {notificationCount > 99
                  ? "99+"
                  : notificationCount}
              </span>
            )}
          </NavLink>

          {/* CART */}
          <NavLink
            to="/order"
            aria-label="Order"
            className="relative hover:scale-110 transition-transform"
          >
            <ShoppingCart className="w-6 h-6 text-black" />

            {orderCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[19px] h-[19px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                {orderCount > 99
                  ? "99+"
                  : orderCount}
              </span>
            )}
          </NavLink>

          {/* USER */}
          <Link
            to={user ? "/profile" : "/login"}
            aria-label={
              user ? "Profile" : "Login"
            }
            className="hover:scale-110 transition-transform"
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "Profile"}
                className="w-7 h-7 rounded-full object-cover border border-black/20"
              />
            ) : user ? (
              <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
                {getInitials()}
              </span>
            ) : (
              <User className="w-6 h-6 text-black" />
            )}
          </Link>

          {/* MOBILE MENU */}
          <div
            ref={menuRef}
            className="relative md:hidden"
          >
            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
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
                    onClick={() =>
                      setMenuOpen(false)
                    }
                    className={({ isActive }) =>
                      `relative block px-4 py-2.5 text-sm font-semibold text-black hover:scale-105 transition-transform ${
                        isActive
                          ? "bg-black/5"
                          : ""
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

                <NavLink
                  to={user ? "/profile" : "/login"}
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="block px-4 py-2.5 text-sm font-semibold border-t border-black/10 mt-1"
                >
                  {user ? "Profile" : "Login"}
                </NavLink>

              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}