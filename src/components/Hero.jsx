import {
    ArrowRight,
    Brush,
    Sparkles,
    Award,
    Heart,
    Palette,
    Star,
  } from "lucide-react";
  
  export default function Hero() {
    const values = [
      {
        icon: Heart,
        title: "Made With Love",
        text: "Every piece is thoughtfully handmade with care and attention to detail.",
      },
      {
        icon: Palette,
        title: "Creative Designs",
        text: "Unique creations inspired by imagination, culture and artistic expression.",
      },
      {
        icon: Star,
        title: "Premium Quality",
        text: "Beautiful materials and careful craftsmanship go into every piece.",
      },
    ];
  
    return (
      <section
        id="home"
        className="bg-white pt-32 pb-24"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
  
          {/* ================= HERO ================= */}
  
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center min-h-[75vh]">
  
            {/* Left */}
            <div className="max-w-2xl">
  
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mt-7 leading-[1.05] tracking-tight">
                Art made by hand.
                <span className="block text-green mt-2">
                  Made to be remembered.
                </span>
              </h1>
  
              <p className="text-gray-600 mt-7 text-lg leading-relaxed max-w-xl">
                Discover beautiful handcrafted decor, abstract art,
                beading, crochet, macrame and custom pieces created
                with care, creativity and passion.
              </p>
  
              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-black/10">
  
                <div className="group">
                  <Brush
                    size={22}
                    className="text-green transition-transform duration-300 group-hover:scale-110"
                  />
  
                  <p className="text-black font-semibold mt-3 text-sm">
                    Custom Designs
                  </p>
  
                  <p className="text-gray-500 text-xs mt-1">
                    Made for you
                  </p>
                </div>
  
                <div className="group">
                  <Award
                    size={22}
                    className="text-green transition-transform duration-300 group-hover:scale-110"
                  />
  
                  <p className="text-black font-semibold mt-3 text-sm">
                    Quality Craft
                  </p>
  
                  <p className="text-gray-500 text-xs mt-1">
                    Crafted with care
                  </p>
                </div>
  
                <div className="group">
                  <Sparkles
                    size={22}
                    className="text-green transition-transform duration-300 group-hover:scale-110"
                  />
  
                  <p className="text-black font-semibold mt-3 text-sm">
                    Handmade
                  </p>
  
                  <p className="text-gray-500 text-xs mt-1">
                    One of a kind
                  </p>
                </div>
  
              </div>
            </div>
  
            {/* Right Image */}
            <div className="relative">
  
              <div className="absolute -top-5 -right-5 w-24 h-24 border border-green/20 rounded-full" />
  
              <div className="absolute -bottom-5 -left-5 w-20 h-20 border border-black/10 rounded-full" />
  
              <div className="relative h-[420px] sm:h-[500px] lg:h-[600px] rounded-[32px] overflow-hidden bg-gray-100 shadow-xl">
  
                <img
                  src="/Hero-art.png"
                  alt="Handcrafted artwork by Chepsue Arts"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
  
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
  
                <div className="absolute bottom-6 left-6">
                  <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg">
  
                    <span className="w-2 h-2 bg-green rounded-full" />
  
                    <span className="text-sm font-medium text-black">
                      Crafted by Chepsue Arts
                    </span>
  
                  </div>
                </div>
  
              </div>
            </div>
  
          </div>
  
  
          {/* ================= ABOUT ================= */}
  
          <div className="mt-28 lg:mt-36 pt-16 border-t border-black/10">
  
            <div className="max-w-3xl">
  
              <span className="inline-flex items-center px-4 py-2 rounded-full border border-black/10 bg-black/[0.02] text-sm font-medium text-gray-700">
                Our Story
              </span>
  
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mt-6 tracking-tight">
                Creativity you can
                <span className="text-green"> feel.</span>
              </h2>
  
              <p className="text-gray-600 text-lg leading-relaxed mt-6">
                Chepsue Arts creates unique handcrafted pieces that
                combine creativity, craftsmanship and personal
                expression. From abstract line art and wall decor
                to beading, crochet, macrame and custom creations,
                every piece is made to feel special.
              </p>
  
            </div>
  
  
            {/* Values */}
            <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-14">
  
              {values.map((value) => {
                const Icon = value.icon;
  
                return (
                  <div
                    key={value.title}
                    className="group p-7 lg:p-8 rounded-3xl border border-black/10 bg-gray-50/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-green/20"
                  >
  
                    <div className="w-12 h-12 rounded-2xl bg-green/10 flex items-center justify-center">
  
                      <Icon
                        size={23}
                        className="text-green transition-transform duration-300 group-hover:scale-110"
                      />
  
                    </div>
  
                    <h3 className="text-xl font-bold text-black mt-6">
                      {value.title}
                    </h3>
  
                    <p className="text-gray-600 leading-relaxed mt-3">
                      {value.text}
                    </p>
  
                  </div>
                );
              })}
  
            </div>
  
  
            {/* Bottom */}
            <div className="mt-14 pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-5">
  
              <p className="text-gray-500 text-sm">
                Handmade. Creative. Personal.
              </p>
  
              <a
                href="#products"
                className="text-black font-semibold text-sm flex items-center gap-2 transition-transform duration-300 hover:translate-x-1"
              >
                Explore our creations
                <span className="text-green">→</span>
              </a>
  
            </div>
  
          </div>
  
        </div>
      </section>
    );
  }