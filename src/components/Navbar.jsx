import { Menu, X, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import icon from "../assets/icon.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuRef = useRef(null);

  // Detect active section while scrolling
  useEffect(() => {
    const sections = ["home", "products", "contact", "order"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);

        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= top &&
            scrollPosition < top + height
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Products", id: "products" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-white/10 backdrop-blur-md border border-black/10 rounded-xl">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center">

        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-3 transition-transform duration-200 hover:scale-105"
        >
          <img
            src={icon}
            alt="Chepsue Arts"
            className="w-8 h-8"
          />

          <div>
            <h1 className="text-black font-bold text-xl">
              Chepsue Arts
            </h1>

            <p className="text-xs text-black">
              Handmade With Love
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative py-1 text-black font-semibold transition-transform duration-200 hover:scale-105 ${
                activeSection === link.id
                  ? "after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[2px] after:bg-black"
                  : ""
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-4">

          {/* Order */}
          <a
            href="#order"
            aria-label="Order"
            className={`relative transition-transform duration-200 hover:scale-110 ${
              activeSection === "order"
                ? "after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[2px] after:bg-black"
                : ""
            }`}
          >
            <ShoppingBag className="w-6 h-6 text-black" />
          </a>

          {/* Mobile Menu */}
          <div
            ref={menuRef}
            className="relative md:hidden"
          >
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className="text-black transition-transform duration-200 hover:scale-110"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Mobile Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 top-12 w-32 bg-white/90 backdrop-blur-md border border-black/10 rounded-xl shadow-md py-1">

                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`relative block px-4 py-2.5 text-sm font-semibold text-black transition-transform duration-200 hover:scale-105 ${
                      activeSection === link.id
                        ? "bg-black/5"
                        : ""
                    }`}
                  >
                    {link.name}

                    {activeSection === link.id && (
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-black rounded-full" />
                    )}
                  </a>
                ))}

              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}