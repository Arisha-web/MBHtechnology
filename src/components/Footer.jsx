import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#1A1D23] text-gray-300 py-12 mt-16" id = "footer">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Column 1: Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-4">MBH Technology</h2>
          <p className="text-sm leading-relaxed">
            We provide creative solutions with modern design and 
            user-friendly development to bring your ideas to life.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#services" className="hover:text-blue-400">Services</a></li>
            <li><a href="#aboutus" className="hover:text-blue-400">About</a></li>
            <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div id="contact">
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <p className="text-sm">Rameez Raja Memon</p>
          <p className="text-sm">Manager Sales & Operations</p>
          <p className="text-sm">📧 <a href="mailto:Ramiz1987@gmail.com" className="hover:text-blue-400">Ramiz1987@gmail.com</a></p>
          <p className="text-sm">📞 <a href="tel:+923145802313" className="hover:text-blue-400">+92 314 5802313</a></p>
          
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} MBH Technology. All Rights Reserved.
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923145802313"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg animate-bounce hover:bg-green-600 transition"
      >
        <FaWhatsapp size={28} />
      </a>
    </footer>
  );
}
