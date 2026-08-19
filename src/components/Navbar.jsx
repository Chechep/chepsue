import { Menu, X, ShoppingCart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import icon from "../assets/icon.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setMenuOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-white/10 backdrop-blur-md border border-black/10 rounded-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center">

        <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform">
          <img src={icon} alt="Chepsue Arts" className="w-8 h-8" />

          <div>
            <h1 className="text-black font-bold text-xl">Chepsue Arts</h1>
            <p className="text-xs text-black">Handmade With Love</p>
          </div>
        </Link>

        <div className="hidden md:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative py-1 text-black font-semibold hover:scale-105 transition-transform ${
                  isActive ? "after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-black" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-4">

          <NavLink
            to="/order"
            aria-label="Order"
            className={({ isActive }) =>
              `relative hover:scale-110 transition-transform ${
                isActive ? "after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[2px] after:bg-black" : ""
              }`
            }
          >
            <ShoppingCart className="w-6 h-6 text-black" />
          </NavLink>

          <div ref={menuRef} className="relative md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className="text-black hover:scale-110 transition-transform"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                        {isActive && <span className="absolute left-2 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-black rounded-full" />}
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