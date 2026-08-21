import { Brush, Sparkles, Award, Heart, Palette, Star } from "lucide-react";

export default function Hero() {
  const values = [
    { icon: Heart, title: "Made With Love", text: "Every piece is thoughtfully handmade with care and attention to detail." },
    { icon: Palette, title: "Creative Designs", text: "Unique creations inspired by imagination, culture and artistic expression." },
    { icon: Star, title: "Premium Quality", text: "Beautiful materials and careful craftsmanship go into every piece." },
  ];

  const gallery = [
    { image: "/products/watch-band.jpg", title: "Custom", description: "Handcrafted pieces made especially for you.", icon: Brush },
    { image: "/products/wrist-band.jpg", title: "Elegant", description: "Beautiful handmade details for everyday style.", icon: Sparkles },
    { image: "/products/neck-piece-kenyan-bracelet.jpg", title: "Heritage", description: "Inspired by Kenyan creativity and tradition.", icon: Palette },
    { image: "/products/necklace-345.jpg", title: "Unique", description: "Distinctive designs created to stand apart.", icon: Star },
    { image: "/products/wall-hanging-3599.jpg", title: "Artful", description: "Handmade decor designed to transform your space.", icon: Award },
    { image: "/products/ceiling-hanging-1599.jpg", title: "Statement", description: "Creative pieces that bring character to any room.", icon: Sparkles },
  ];

  const carouselImages = [...gallery, ...gallery];

  return (
    <section id="home" className="bg-white pt-32 pb-24">
      <style>{`
        @keyframes chepsueSlide {
          from { transform: translateX(-50%); }
          to { transform: translateX(0%); }
        }
        .chepsue-carousel {
          animation: chepsueSlide 28s linear infinite;
          width: max-content;
        }
        .chepsue-carousel:hover {
          animation-play-state: paused;
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="min-h-[78vh] flex flex-col items-center justify-center text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl text-black leading-[0.9] tracking-[-0.03em] font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Handcrafted art that tells
              <span className="block italic text-green mt-3">your story.</span>
            </h1>
          </div>

          <div className="w-full max-w-3xl mt-10">
            <p className="text-gray-600 text-base font-extralight sm:text-lg leading-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Discover handcrafted art and decor created with imagination, patience and purpose. Every piece is made to bring character and meaning into your space.
            </p>
          </div>

          <div className="relative w-full overflow-hidden mt-6">
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-15 lg:w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-15 lg:w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <div className="chepsue-carousel flex gap-5">
              {carouselImages.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={`${item.title}-${index}`} className="w-[220px] sm:w-[250px] lg:w-[270px] shrink-0">
                    <div className="group relative h-56 sm:h-64 lg:h-72 rounded-3xl overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                        <div className="flex items-center gap-2">
                          <Icon size={17} className="text-sand/90 shrink-0" />
                          <h3 className="text-white text-xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative w-full mx-auto mt-6">
            <div className="relative min-h-[450px] sm:h-[550px] lg:h-[650px] overflow-hidden flex items-center justify-center">
              <img src="/Hero-art.png"
              alt="Handcrafted artwork by Chepsue Arts"
              className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-2 lg:mt-40 pt-16 border-t border-black/10 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-semibold" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Our Philosophy
            </span>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl text-black mt-5 leading-[0.9] font-medium" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Creativity
              <span className="block italic text-green mt-2">you can feel.</span>
            </h2>

            <p className="text-gray-600 text-lg leading-8 max-w-2xl mx-auto mt-8" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Chepsue Arts creates unique handcrafted pieces that combine creativity, craftsmanship and personal expression. From abstract line art and wall decor to beading, crochet, macrame and custom creations, every piece is made to feel special.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-16">
            {values.map((value) => {
              const ValueIcon = value.icon;

              return (
                <div key={value.title} className="group p-7 lg:p-8 rounded-3xl border border-black/10 bg-gray-50/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-green/20 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-green/10 flex items-center justify-center mx-auto">
                    <ValueIcon size={23} className="text-green transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <h3 className="text-2xl text-black mt-3 font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {value.title}
                  </h3>

                  <p className="text-gray-600 font-thin leading-relaxed mt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {value.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}