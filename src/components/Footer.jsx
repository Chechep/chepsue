import { ArrowUp, ArrowUpRight } from "lucide-react";
import {
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import icon from "../assets/icon.png";

export default function Footer() {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-white text-black">
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

                <p className="text-xs text-gray-800">
                  Handmade With Love
                </p>
              </div>
            </div>

            <p className="text-gray-800 leading-relaxed mt-5 max-w-sm">
              Unique handcrafted art and decor created with
              creativity, care and passion.
            </p>
          </div>

          {/* Get In Touch */}
          <div className="md:col-start-3 md:justify-self-end">
            <h3 className="font-semibold text-black">
              Get In Touch
            </h3>

            <div className="flex flex-col gap-4 mt-5">

              {/* Phone */}
              <a
                href="tel:+254713428383"
                className="flex items-center gap-3 text-gray-800 hover:text-gray-500 transition"
              >
                <FaPhoneAlt
                  size={17}
                  className="text-green-600"
                />

                +254 713 428 383
              </a>

              {/* Email */}
              <a
                href="mailto:chepsuearts@gmail.com"
                className="flex items-center gap-3 text-gray-800 hover:text-gray-500 transition"
              >
                <FaEnvelope
                  size={18}
                  className="text-red-700"
                />

                chepsuearts@gmail.com
              </a>

              {/* Instagram */}
              <a
                href="#contact"
                className="flex items-center gap-3 text-gray-800 hover:text-gray-500 transition"
              >
                <FaInstagram
                  size={19}
                  className="text-pink-600"
                />

                Instagram

                <ArrowUpRight size={15} />
              </a>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-black/10 mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-5">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Chepsue Arts. All rights reserved.
          </p>

          {/* Back To Top */}
          <button
            onClick={backToTop}
            className="group flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition"
          >
            Back to Top

            <span className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:-translate-y-1">
              <ArrowUp size={17} />
            </span>
          </button>

        </div>

      </div>
    </footer>
  );
}