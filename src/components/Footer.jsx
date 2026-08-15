import {
    ArrowUp,
    Mail,
    Phone,
    ArrowUpRight,
  } from "lucide-react";
  import icon from "../assets/icon.png";
  
  export default function Footer() {
    const backToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  
    return (
      <footer className="bg-black text-white">
  
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2">
  
          {/* Top */}
          <div className="grid md:grid-cols-3 gap-12">
  
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={icon}
                  alt="Chepsue Arts"
                  className="w-9 h-9"
                />
  
                <div>
                  <h2 className="font-bold text-xl">
                    Chepsue Arts
                  </h2>
  
                  <p className="text-xs text-gray-400">
                    Handmade With Love
                  </p>
                </div>
              </div>
  
              <p className="text-gray-400 leading-relaxed mt-5 max-w-sm">
                Unique handcrafted art and decor created with
                creativity, care and passion.
              </p>
            </div>
  
            {/* Navigation */}
            <div>
              <h3 className="font-semibold text-white">
                Explore
              </h3>
  
              <div className="flex flex-col gap-3 mt-5">
                <a
                  href="#home"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </a>
  
                <a
                  href="#products"
                  className="text-gray-400 hover:text-white transition"
                >
                  Products
                </a>
  
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </a>
  
                <a
                  href="#order"
                  className="text-gray-400 hover:text-white transition"
                >
                  Order
                </a>
              </div>
            </div>
  
            {/* Contact */}
            <div>
              <h3 className="font-semibold text-white">
                Get In Touch
              </h3>
  
              <div className="flex flex-col gap-4 mt-5">
  
                <a
                  href="tel:+254713428383"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition"
                >
                  <Phone size={18} />
                  +254 713 428 383
                </a>
  
                <a
                  href="mailto:chepsuearts@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition"
                >
                  <Mail size={18} />
                  chepsuearts@gmail.com
                </a>
  
                <a
                  href="#contact"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition"
                >
                  <span className="text-lg">◎</span>
                  Instagram
                  <ArrowUpRight size={15} />
                </a>
  
              </div>
            </div>
  
          </div>
  
          {/* Divider */}
          <div className="border-t border-white/10 mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-5">
  
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Chepsue Arts. All rights reserved.
            </p>
  
            {/* Back To Top */}
            <button
              onClick={backToTop}
              className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition"
            >
              Back to Top
  
              <span className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:-translate-y-1">
                <ArrowUp size={17} />
              </span>
            </button>
  
          </div>
  
        </div>
  
      </footer>
    );
  }