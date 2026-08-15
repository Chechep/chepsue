import { Heart, Palette, Star } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Made With Love",
      text: "Every piece is thoughtfully handmade with patience, care and attention to detail.",
    },
    {
      icon: Palette,
      title: "Creative Designs",
      text: "We turn ideas and inspiration into unique pieces that bring character to every space.",
    },
    {
      icon: Star,
      title: "Premium Quality",
      text: "We focus on quality materials, careful craftsmanship and beautiful finishing.",
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center">

          <span className="inline-flex items-center px-4 py-2 rounded-full border border-black/10 bg-black/[0.02] text-sm font-medium text-gray-700">
            Our Story
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mt-6 tracking-tight">
            Art with{" "}
            <span className="text-green">meaning.</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mt-6">
            Chepsue Arts creates unique handcrafted pieces that
            combine creativity, craftsmanship and personal expression.
            From abstract line art and wall decor to beading, crochet,
            macrame and custom creations, every piece is made to feel
            special.
          </p>

        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 mt-16">

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

        {/* Bottom statement */}
        <div className="mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-5">
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
    </section>
  );
}