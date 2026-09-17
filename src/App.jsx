import { useEffect, useState } from "react";
import {
  ArrowRight, Building2, CheckCircle2, ChevronRight, CircleCheck,
  Database, Flame, Globe2, Headphones, Menu, Network, PhoneCall,
  Radio, Satellite, ShieldCheck, Smartphone, X, Zap
} from "lucide-react";
import "./index.css";

const services = [
  { icon: Database, title: "Data Center Solutions", text: "Structured racks, servers, storage, power and resilient infrastructure for mission-critical operations." },
  { icon: Network, title: "Core Networking", text: "Secure LAN/WAN, routing, switching, fibre and enterprise Wi-Fi designed for reliable performance." },
  { icon: ShieldCheck, title: "CCTV & Security", text: "AI-enabled surveillance, access control, remote monitoring and complete site security solutions." },
  { icon: Radio, title: "Wireless P2P Links", text: "High-capacity point-to-point and point-to-multipoint connectivity for campuses and remote sites." },
  { icon: PhoneCall, title: "IP Telephony & PABX", text: "Panasonic PABX, VoIP, inter-building extensions and professional unified communication systems." },
  { icon: Flame, title: "Fire Alarm Systems", text: "Detection, alarm, installation, testing and commissioning for commercial and institutional facilities." },
  { icon: Satellite, title: "VSAT & Remote Sites", text: "Satellite connectivity and dependable communications for difficult and off-grid locations." },
  { icon: Zap, title: "Electrical & UPS", text: "Power protection, UPS, electrical works, testing and preventive support for technology environments." },
  { icon: Building2, title: "IT Equipment Supply", text: "Genuine computers, printers, networking equipment and deployment support with transparent quotations." },
];

const capabilities = [
  "Professional site survey & system design",
  "Supply, installation, testing & commissioning",
  "Nationwide project coordination across Pakistan",
  "After-sales support & annual maintenance",
];

const sectors = ["Government", "Banking", "Healthcare", "Education", "Oil & Gas", "Retail & Hospitality"];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className={`topbar ${scrolled ? "topbar--scrolled" : ""}`}>
        <a className="brand" href="#home" onClick={closeMenu} aria-label="MBH Technology home">
          <img src="/app/mbh-official-icon-2026.png" alt="MBH Technology" />
          <span><strong>MBH TECHNOLOGY</strong><small>IT & Telecom Solutions</small></span>
        </a>
        <nav className={menuOpen ? "nav nav--open" : "nav"} aria-label="Main navigation">
          <a href="#home" onClick={closeMenu}>Home</a><a href="#services" onClick={closeMenu}>Services</a><a href="#about" onClick={closeMenu}>About</a><a href="/portfolio/" onClick={closeMenu}>Portfolio</a><a href="#apps" onClick={closeMenu}>Service App</a><a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-cta" href="/app/quotation/">Get a Quote <ArrowRight size={16} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid" /><div className="orb orb-one" /><div className="orb orb-two" />
          <div className="hero-copy reveal">
            <div className="eyebrow"><span /> Engineering trust. Connecting Pakistan.</div>
            <h1>Technology infrastructure<br /><em>built for the real world.</em></h1>
            <p>MBH Technology designs, supplies and supports secure IT, telecom and smart infrastructure—from enterprise networks and CCTV to wireless links, data centers and remote sites.</p>
            <div className="hero-actions"><a className="button button-primary" href="/app/quotation/">Request a Quotation <ArrowRight size={18} /></a><a className="button button-ghost" href="#services">Explore Solutions <ChevronRight size={18} /></a></div>
            <div className="trust-row"><div><strong>15+</strong><span>Years Experience</span></div><div><strong>24/7</strong><span>Technical Support</span></div><div><strong>PK</strong><span>Nationwide Service</span></div></div>
          </div>
          <div className="hero-visual reveal reveal-delay">
            <div className="signal signal-one" /><div className="signal signal-two" />
            <div className="brand-emblem"><img src="/app/mbh-official-icon-2026.png" alt="MBH network emblem" /></div>
            <div className="floating-card card-top"><Globe2 /><span><small>Coverage</small>All Pakistan</span></div>
            <div className="floating-card card-bottom"><CircleCheck /><span><small>Service Desk</small>Live & Secure</span></div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="section-heading"><div><span className="section-kicker">What we deliver</span><h2>Integrated technology solutions</h2></div><p>One accountable engineering partner for design, procurement, deployment, testing and long-term support.</p></div>
          <div className="service-grid">{services.map(({ icon: Icon, title, text }, index) => <article className="service-card" key={title}><div className="service-number">0{index + 1}</div><div className="icon-box"><Icon /></div><h3>{title}</h3><p>{text}</p><a href="/app/quotation/">Request solution <ArrowRight size={16} /></a></article>)}</div>
        </section>

        <section className="section about-section" id="about">
          <div className="about-visual"><div className="tech-panel"><div className="panel-label"><span /> MBH NETWORK OPERATIONS</div><div className="network-map"><span className="node n1" /><span className="node n2" /><span className="node n3" /><span className="node n4" /><span className="node n5" /><svg viewBox="0 0 500 300" aria-hidden="true"><path d="M65 75 L225 125 L420 58 M225 125 L135 245 M225 125 L405 235" /></svg></div><div className="panel-status"><span>Systems online</span><strong>99.9%</strong></div></div></div>
          <div className="about-copy"><span className="section-kicker">About MBH Technology</span><h2>Field experience meets modern engineering.</h2><p>We help businesses, institutions and remote operations deploy dependable technology that performs beyond the proposal stage. Every engagement is planned around safety, scalability and practical support.</p><div className="check-list">{capabilities.map(item => <div key={item}><CheckCircle2 />{item}</div>)}</div><a className="text-link" href="#contact">Talk to an engineer <ArrowRight size={18} /></a></div>
        </section>

        <section className="portfolio-section" id="portfolio"><div className="section portfolio-inner"><div className="section-heading light"><div><span className="section-kicker">Experience that matters</span><h2>Trusted across critical sectors</h2></div><p>From secure facilities and campuses to retail networks and remote industrial sites.</p></div><div className="sector-grid">{sectors.map((sector, i) => <div className="sector-card" key={sector}><span>0{i + 1}</span><strong>{sector}</strong></div>)}</div><div className="portfolio-note"><div><Headphones /><span><strong>End-to-end ownership</strong><small>Survey → Design → Supply → Install → Support</small></span></div><a className="button button-silver" href="/portfolio/">View Company Portfolio <ArrowRight size={18} /></a></div></div></section>

        <section className="section app-section" id="apps">
          <div className="app-copy"><span className="section-kicker">MBH Digital Service Desk</span><h2>Your service operation, now online.</h2><p>Customers can submit complaints, request quotations and track jobs. Approved installers receive category-based field opportunities through their dedicated portal.</p><div className="app-actions"><a className="button button-primary" href="/app/"><Smartphone size={18} /> Open Customer App</a><a className="button button-outline" href="/app/installer/"><ShieldCheck size={18} /> Installer Portal</a></div></div>
          <div className="phone-stage"><div className="phone phone-back"><div className="phone-screen"><span>Installer Portal</span><div className="mini-card" /><div className="mini-card" /><div className="mini-card" /></div></div><div className="phone"><div className="phone-screen customer"><img src="/app/mbh-official-icon-2026.png" alt="" /><strong>MBH Service Desk</strong><span>Request. Track. Resolve.</span><div className="app-pill">Customer services online</div></div></div></div>
        </section>

        <section className="contact-section" id="contact"><div className="contact-copy"><span className="section-kicker">Start a conversation</span><h2>Have a site, network or security challenge?</h2><p>Tell us what you need. Our engineering team will help plan the right solution.</p></div><div className="contact-actions"><a className="button button-silver" href="https://wa.me/923145802313" target="_blank" rel="noreferrer">WhatsApp MBH <ArrowRight size={18} /></a><a className="contact-email" href="mailto:Ramiz1987@gmail.com">Ramiz1987@gmail.com</a></div></section>
      </main>

      <footer className="footer"><div className="footer-brand"><img src="/app/mbh-official-icon-2026.png" alt="MBH" /><span><strong>MBH TECHNOLOGY</strong><small>IT & Telecom Solutions · Pakistan</small></span></div><div className="footer-links"><a href="#services">Services</a><a href="/portfolio/">Portfolio</a><a href="/app/">Customer App</a><a href="/app/installer/">Installer Portal</a></div><p>© {new Date().getFullYear()} MBH Technology. All rights reserved.</p></footer>
    </div>
  );
}

export default App;
