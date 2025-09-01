import React from "react";
import { Link } from "react-router-dom";
import soft from "../assets/images/soft.jpeg";
import webpic from "../assets/images/webpic.jpeg";
import LANpic from "../assets/images/LANpic.jpeg";
import inventory from "../assets/images/inventorypic.jpeg";
import cctv from "../assets/images/cctv.jpeg";
import equip from "../assets/images/equip.jpeg";



export default function Services() {
  const services = [
    {
      title: "Software & MIS Development",
      description:
        "We design and implement custom software and Management Information Systems (MIS) that help organizations automate workflows, improve reporting accuracy, and make data-driven decisions.",
      link: "/Softwareandmis",
      image: soft,
    },
    {
      title: "Website Design & Development",
      description:
        "Our creative team develops responsive, user-friendly, and SEO-optimized websites that align with your brand and deliver exceptional user experiences.",
      link: "/Development",
      image: webpic,
    },
    {
      title: "LAN/WAN & Wireless Broadband",
      description:
        "We offer reliable LAN, WAN, and wireless broadband solutions to ensure secure, high-speed connectivity across offices, campuses, and remote sites.",
      link: "/Lanwan",
      image: LANpic,
    },
    {
      title: "Inventory & Account Management System",
      description:
        "We develop smart inventory and accounting systems that streamline supply chain operations, optimize stock levels, and provide real-time financial insights.",
      link: "/Inventory",
      image: inventory,
    },
    {
      title: "Security & Surveillance",
      description:
        "We provide advanced security and surveillance solutions, including smart CCTV, access control, and remote monitoring systems to protect your assets 24/7.",
      link: "/Security",
      image: cctv,
    },
    {
      title: "Network & IT Equipment",
      description:
        "Our expertise covers the procurement, installation, and support of robust network and IT equipment, ensuring businesses run smoothly and securely.",
      link: "/Equipment",
      image: equip,
    },
  ];

  return (
    <section id="services" className="bg-[#1A1D23] py-20 rounded-tl-[500px]">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center mb-16 px-4">
        <h2 className="text-4xl font-bold text-blue-400">Our Solutions</h2>
        <p className="mt-4 text-lg text-gray-300">
          MBH Technologies delivers innovative IT solutions to empower businesses with
          cutting-edge software, connectivity, security, and management systems.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#222632] rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden transform hover:-translate-y-2 duration-300"
          >
            {service.image && (
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-400">
                {service.title}
              </h3>
              <p className="mt-3 text-gray-300">{service.description}</p>
              <Link
                to={service.link}
                className="inline-block mt-5 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Learn More
              </Link>


            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
