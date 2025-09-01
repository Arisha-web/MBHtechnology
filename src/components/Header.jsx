import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link"; // ✅ new import
import { FaBars, FaTimes } from "react-icons/fa"; 
import logo from "../assets/images/logo.png"; 

const HeaderHero = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* HEADER */}
      <header className="bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex items-center justify-between p-5">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="MBH Tech Logo" className="h-10 w-auto object-contain" />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 font-semibold">
            <Link to="/" className="text-white hover:text-blue-500 transition-colors">
              Home
            </Link>
            <HashLink smooth to="/#aboutus" className="text-white hover:text-blue-500 transition-colors">
              About Us
            </HashLink>

            {/* Dropdown */}
            <div className="group relative">
              <HashLink smooth to="/#services" className="text-white hover:text-blue-500 transition-colors flex items-center cursor-pointer">
                Services
              </HashLink>
              <ul className="absolute hidden group-hover:block bg-white shadow-lg mt-2 w-64 rounded-lg">
                <li><Link to="/Softwareandmis" className="block px-4 py-2 hover:bg-gray-100">Software & MIS Development</Link></li>
                <li><Link to="/Development" className="block px-4 py-2 hover:bg-gray-100">Website Design & Development</Link></li>
                <li><Link to="/Lanwan" className="block px-4 py-2 hover:bg-gray-100">LAN/WAN & Wireless Broadband</Link></li>
                <li><Link to="/Inventory" className="block px-4 py-2 hover:bg-gray-100">Inventory & Account Management System</Link></li>
                <li><Link to="/Security" className="block px-4 py-2 hover:bg-gray-100">Security & Surveillance</Link></li>
                <li><Link to="/Equipment" className="block px-4 py-2 hover:bg-gray-100">Network & IT Equipment</Link></li>
              </ul>
            </div>

            <HashLink smooth to="/#footer" className="text-white hover:text-blue-500 transition-colors">
              Contact Us
            </HashLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-gray-800 p-5 font-semibold">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link to="/" className="block text-white hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <HashLink smooth to="/#aboutus" className="block text-white hover:text-blue-500 transition-colors">
                  About Us
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#services" className="block text-white hover:text-blue-500 transition-colors">
                  Services
                </HashLink>
                <ul className="pl-4 mt-2 space-y-2 text-gray-300">
                  <li><Link to="/Softwareandmis" className="block hover:text-white transition-colors">Software & MIS Development</Link></li>
                  <li><Link to="/Development" className="block hover:text-white transition-colors">Website Design & Development</Link></li>
                  <li><Link to="/Lanwan" className="block hover:text-white transition-colors">LAN/WAN & Wireless Broadband</Link></li>
                  <li><Link to="/Inventory" className="block hover:text-white transition-colors">Inventory & Account Management System</Link></li>
                  <li><Link to="/Security" className="block hover:text-white transition-colors">Security & Surveillance</Link></li>
                  <li><Link to="/Equipment" className="block hover:text-white transition-colors">Network & IT Equipment</Link></li>
                </ul>
              </li>
              <li>
                <HashLink smooth to="/#footer" className="block text-white hover:text-blue-500 transition-colors">
                  Contact Us
                </HashLink>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* HERO SECTION */}
      <section
        className="relative bg-gray-900 h-[700px] text-white pt-32 pb-24 flex flex-col items-center justify-center rounded-br-[800px] animate-slideInLeft"
        id="hero"
      >
        <div className="text-center max-w-3xl">
          <h2 className="text-5xl font-bold text-white mb-4 animate-pulse">
            MBH Technology
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold">
            We Are Committed to Your Information Technology Needs.
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Our Information Technology consultants are always available on-call 24/7.
            Same-Day Appointments Available.
          </p>
        </div>

        <div className="mt-6">
          <HashLink smooth to="/#footer" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300">
            Book an Appointment
          </HashLink>
        </div>
      </section>
    </>
  );
};

export default HeaderHero;
