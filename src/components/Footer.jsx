import { ArrowUp, } from "lucide-react";
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">

        {/* Top */}
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3">

              <img
                src={icon}
                alt="Chepsue Arts"
                className="w-9 h-9"
              />

              <div>
                <h2 className="font-bold text-xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Chepsue Arts
                </h2>

                <p className="text-xs italic text-gray-800"style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Handmade With Love
                </p>
              </div>
            </div>

            <p className="text-gray-800 leading-relaxed mt-2 max-w-sm"style={{ fontFamily: "'Cormorant Garamond', sans-serif" }}>
              Unique handcrafted art and decor created with creativity, care and passion.
            </p>
          </div>


          {/* Get In Touch */}
          <div className="md:col-start-3 md:justify-self-end">

            <h3 className="font-semibold text-black"style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Get In Touch
            </h3>

            <div className="flex font-extralight flex-col gap-1 mt-3">

              {/* Phone */}
              <a
                href="tel:+254783800900"
                className="flex items-center gap-3 text-gray-800 hover:text-black transition"
              >

                {/* Phone Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-[18px] h-[18px] fill-green-600"
                >
                  <path d="M6.62 10.79a15.46 15.46 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.16 21 3 13.84 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                </svg>
                +254 783 800 900
              </a>


              {/* Gmail */}
              <a
                href="mailto:chepsuearts@gmail.com"
                className="flex items-center gap-3 text-gray-800 hover:text-black transition"
              >

                {/* Google Gmail SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-[19px] h-[19px]"
                >
                  <path
                    fill="#EA4335"
                    d="M5 5a2 2 0 00-2 2v10a2 2 0 002 2h2V9.5L12 13l5-3.5V19h2a2 2 0 002-2V7a2 2 0 00-2-2h-2v1.2L12 9.5 7 6.2V5H5z"
                  />

                  <path
                    fill="#4285F4"
                    d="M3 7v10a2 2 0 002 2h2V9.5L3 7z"
                  />

                  <path
                    fill="#34A853"
                    d="M19 7v10a2 2 0 01-2 2h-2V9.5L19 7z"
                  />

                  <path
                    fill="#FBBC04"
                    d="M3 7l2-2h2v1.2L3 9.5V7zM19 7l-2-2h-2v1.2l4 3.3V7z"
                  />
                </svg>
                chepsuearts@gmail.com
              </a>

              {/* Instagram */}
              <a
                href="instagram.com/chepsuearts"
                className="flex items-center gap-3 text-gray-800 hover:text-black transition"
              >

                {/* Instagram SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-[19px] h-[19px]"
                >
                  <defs>
                    <linearGradient
                      id="instagramGradient"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#F58529" />
                      <stop offset="45%" stopColor="#DD2A7B" />
                      <stop offset="70%" stopColor="#8134AF" />
                      <stop offset="100%" stopColor="#515BD4" />
                    </linearGradient>
                  </defs>

                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    fill="none"
                    stroke="url(#instagramGradient)"
                    strokeWidth="2"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    fill="none"
                    stroke="url(#instagramGradient)"
                    strokeWidth="2"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1.2"
                    fill="url(#instagramGradient)"
                  />
                </svg>
                Instagram
              </a>

            </div>
          </div>

        </div>


        {/* Divider */}
        <div className="border-t border-black/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-5">

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