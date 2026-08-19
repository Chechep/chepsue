import { Brush, Sparkles, Award, Heart, Palette, Star } from "lucide-react";

export default function Hero() {
  const values = [
    { icon: Heart, title: "Made With Love", text: "Every piece is thoughtfully handmade with care and attention to detail." },
    { icon: Palette, title: "Creative Designs", text: "Unique creations inspired by imagination, culture and artistic expression." },
    { icon: Star, title: "Premium Quality", text: "Beautiful materials and careful craftsmanship go into every piece." },
  ];

  return (
    <section id="home" className="bg-white pt-32 pb-24">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* HERO */}
        <div className="min-h-[78vh] flex flex-col items-center justify-center text-center">

          <div className="max-w-4xl mx-auto">

            <h1
              className="text-6xl sm:text-7xl lg:text-8xl text-black leading-[0.9] tracking-[-0.03em] font-medium"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Art that tells
              <span className="block italic text-green mt-3">
                your story.
              </span>
            </h1>

            <p
              className="text-gray-600 mt-8 text-base sm:text-lg leading-8 max-w-2xl mx-auto"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Discover handcrafted art and decor created with
              imagination, patience and purpose. Every piece is made
              to bring character and meaning into your space.
            </p>

            {/* FEATURES */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12 pt-8 border-t border-black/10">

              <div className="group flex flex-col items-center">
                <Brush size={21} className="text-green transition-transform duration-300 group-hover:scale-110" />
                <p className="text-black font-semibold mt-3 text-sm">Custom</p>
                <p className="text-gray-500 text-xs mt-1">Made for you</p>
              </div>

              <div className="group flex flex-col items-center">
                <Award size={21} className="text-green transition-transform duration-300 group-hover:scale-110" />
                <p className="text-black font-semibold mt-3 text-sm">Quality</p>
                <p className="text-gray-500 text-xs mt-1">Crafted with care</p>
              </div>

              <div className="group flex flex-col items-center">
                <Sparkles size={21} className="text-green transition-transform duration-300 group-hover:scale-110" />
                <p className="text-black font-semibold mt-3 text-sm">Unique</p>
                <p className="text-gray-500 text-xs mt-1">One of a kind</p>
              </div>

            </div>

          </div>

          {/* HERO IMAGE */}
          <div className="relative w-full max-w-4xl mx-auto mt-16">

            <div className="absolute -top-8 -right-8 w-28 h-28 border border-green/20 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-black/10 rounded-full" />

            <div className="relative h-[450px] sm:h-[550px] lg:h-[650px] rounded-[40px] overflow-hidden bg-gray-100 shadow-2xl">

              <img
                src="/Hero-art.png"
                alt="Handcrafted artwork by Chepsue Arts"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            </div>

          </div>

        </div>

        {/* ABOUT */}
        <div className="mt-32 lg:mt-40 pt-16 border-t border-black/10 text-center">

          <div className="max-w-4xl mx-auto">

            <span
              className="text-xs tracking-[0.3em] uppercase text-gray-400 font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Our Philosophy
            </span>

            <h2
              className="text-5xl sm:text-6xl lg:text-7xl text-black mt-5 leading-[0.9] font-medium"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Creativity
              <span className="block italic text-green mt-2">
                you can feel.
              </span>
            </h2>

            <p
              className="text-gray-600 text-lg leading-8 max-w-2xl mx-auto mt-8"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Chepsue Arts creates unique handcrafted pieces that
              combine creativity, craftsmanship and personal
              expression. From abstract line art and wall decor
              to beading, crochet, macrame and custom creations,
              every piece is made to feel special.
            </p>

          </div>

          {/* VALUES */}
          <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-16">

            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group p-7 lg:p-8 rounded-3xl border border-black/10 bg-gray-50/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-green/20 text-center"
                >

                  <div className="w-12 h-12 rounded-2xl bg-green/10 flex items-center justify-center mx-auto">
                    <Icon
                      size={23}
                      className="text-green transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <h3
                    className="text-2xl text-black mt-6 font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {value.title}
                  </h3>

                  <p
                    className="text-gray-600 leading-relaxed mt-3"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
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