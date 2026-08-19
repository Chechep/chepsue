import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const whatsappNumber = "254713428383";

export default function Contact() {
  const contactDetails = [
    {
      icon: Phone,
      title: "Phone",
      label: "Speak with us",
      value: "+254 713 428 383",
      href: "tel:+254713428383",
    },
    {
      icon: Mail,
      title: "Email",
      label: "Send us a message",
      value: "chepsuearts@gmail.com",
      href: "mailto:chepsuearts@gmail.com",
    },
    {
      icon: MapPin,
      title: "Location",
      label: "Based in",
      value: "Kenya",
      href: "#",
    },
  ];

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello Chepsue Arts, I would like to start a conversation about your artwork."
    );

    window.open(
      `https://wa.me/${whatsappNumber}?text=${message}`,
      "_blank"
    );
  };

  return (
    <section id="contact" className="min-h-screen bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* HEADER */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-24 items-end">
          <div>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-black mt-6 tracking-tight leading-[0.95]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Let's create
              <span className="block italic text-green mt-2">
                something beautiful.
              </span>
            </h1>
          </div>

          <div>
            <p
              className="text-gray-600 text-lg leading-8"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Whether you're looking for a unique handmade piece,
              placing an order, or bringing a custom idea to life,
              we're here to help.
            </p>
          </div>

        </div>

        {/* CONTACT CARDS */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 mt-20">

          {contactDetails.map((item, index) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                className="group relative overflow-hidden rounded-[24px] sm:rounded-[28px] border border-black/10 bg-white p-4 sm:p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-xl"
              >

                {/* NUMBER */}
                <span
                  className="absolute top-4 right-4 sm:top-7 sm:right-8 text-[10px] sm:text-xs font-semibold text-gray-300"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  0{index + 1}
                </span>

                {/* ICON */}
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-black flex items-center justify-center transition-all duration-300 group-hover:bg-green">
                  <Icon
                    size={18}
                    className="sm:w-[22px] sm:h-[22px] text-white"
                  />
                </div>

                <div className="mt-6 sm:mt-10">

                  <p
                    className="text-[9px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] text-gray-400 font-semibold"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.label}
                  </p>

                  <h2
                    className="text-lg sm:text-2xl font-semibold text-black mt-1 sm:mt-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.title}
                  </h2>

                  <p
                    className="text-gray-600 text-[10px] sm:text-sm mt-2 sm:mt-3 break-words leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.value}
                  </p>

                </div>

                {/* ARROW */}
                <div className="absolute bottom-4 right-4 sm:bottom-7 sm:right-8 w-7 h-7 sm:w-10 sm:h-10 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:border-black">
                  <ArrowUpRight
                    size={14}
                    className="sm:w-[17px] sm:h-[17px] text-black group-hover:text-white transition"
                  />
                </div>

              </a>
            );
          })}

        </div>

        {/* CTA */}
        <div className="relative overflow-hidden mt-6 rounded-[28px] sm:rounded-[32px] bg-black text-white p-7 sm:p-10 lg:p-14">

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">

            <div className="max-w-2xl">

              <span
                className="text-green text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Custom Creations
              </span>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Have something
                <span className="text-green italic"> specific </span>
                in mind?
              </h2>

              <p
                className="text-white/60 mt-4 leading-7 max-w-xl text-sm sm:text-base"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Tell us what you're imagining and let's turn your
                idea into a handmade piece created especially for you.
              </p>

            </div>

            <button
              onClick={openWhatsApp}
              className="shrink-0 inline-flex items-center justify-center gap-3 bg-white text-black px-7 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-green hover:text-white hover:scale-105"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Start a Conversation
              <ArrowUpRight size={18} />
            </button>

          </div>

          {/* DECORATIVE CIRCLES */}
          <div className="absolute -right-20 -bottom-32 w-80 h-80 border border-white/10 rounded-full" />
          <div className="absolute -right-8 -bottom-20 w-56 h-56 border border-green/20 rounded-full" />

        </div>

        {/* FOOTNOTE */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 text-sm text-gray-400"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <p>Handmade with love · Kenya</p>
          <p>We look forward to hearing from you.</p>
        </div>

      </div>
    </section>
  );
}