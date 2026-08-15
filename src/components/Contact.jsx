import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function Contact() {
  const contactDetails = [
    {
      icon: Phone,
      title: "Call Us",
      value: "+254 713 428 383",
      href: "tel:+254713428383",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "chepsuearts@gmail.com",
      href: "mailto:chepsuearts@gmail.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Kenya",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">

          <span className="inline-flex items-center px-4 py-2 rounded-full border border-black/10 bg-black/[0.02] text-sm font-medium text-gray-700">
            Get In Touch
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mt-6 tracking-tight">
            Let's create something
            <span className="block text-green mt-2">
              beautiful together.
            </span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
            Have a question, want to place an order, or have an idea
            for a custom piece? We'd love to hear from you.
          </p>

        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto mt-16">

          {contactDetails.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                className="group p-7 rounded-3xl border border-black/10 bg-gray-50/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-green/20"
              >
                <div className="flex items-start justify-between">

                  <div className="w-12 h-12 rounded-2xl bg-green/10 flex items-center justify-center">
                    <Icon
                      size={22}
                      className="text-green transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-gray-400 transition-all duration-300 group-hover:text-green group-hover:translate-x-1 group-hover:-translate-y-1"
                  />

                </div>

                <h3 className="text-lg font-bold text-black mt-6">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-2 break-words">
                  {item.value}
                </p>
              </a>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-5">

          <div>
            <p className="text-black font-semibold">
              Ready to bring your idea to life?
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Reach out and let's talk about your next piece.
            </p>
          </div>

          <a
            href="mailto:chepsuearts@gmail.com"
            className="bg-black text-white px-6 py-3.5 rounded-full font-medium transition-all duration-300 hover:bg-green hover:scale-105"
          >
            Start a Conversation
          </a>

        </div>

      </div>
    </section>
  );
}