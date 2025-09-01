import heropic from "../assets/images/hero-img.jpeg";

export default function Aboutus() {
    return (
        <>
            <section className="w-full py-20 bg-gradient-to-br from-gray-900 to-[#243B55]" id="aboutus">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 items-center">

                    {/* Left Column */}
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-400">
                            About Us
                        </h2>

                        <p className="text-lg text-gray-300 leading-relaxed">
                            MBH Technologies launched its network operations to deliver
                            <span className="text-blue-400 font-semibold"> high-performance wireless Internet and Data broadband connectivity </span>
                            for national and international companies, government and non-government organizations,
                            social development institutions, as well as the Health, Oil & Gas, and Public Sectors.
                        </p>

                        <p className="text-lg text-gray-300 leading-relaxed">
                            We provide <span className="text-blue-400 font-semibold">high capacity Point-to-Point and Point-to-Multipoint solutions</span>,
                            enabling both indoor and outdoor wireless connectivity along with advanced
                            CCTV surveillance systems supported by smart beam forming antennas.
                        </p>

                        <p className="text-lg text-gray-300 leading-relaxed">
                            Our product portfolio supports a wide range of broadband applications critical
                            to industries like oil and gas—ensuring enhanced safety, security, and operational efficiency
                            through <span className="text-blue-400 font-semibold">real-time data, IoT, video, and VoIP connectivity</span>
                            from wells, drillers, vehicles, and field offices.
                        </p>

                    </div>

                    {/* Right Column (Image) */}
                    <div className="flex justify-center animate-slideInRight">
                        <img
                            src={heropic} // yahan apna image path dena
                            alt="About MBH"
                            className="w-full max-w-md rounded-xl shadow-lg transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
