import { Phone, Mail, MapPin, Clock, ShieldAlert } from 'lucide-react';

export default function Footer({ onAdminToggle }) {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
  ];

  const secondaryLinks = [
    { name: 'About YUVII CABS', href: '#about' },
    { name: 'Client Reviews', href: '#testimonials' },
    { name: 'Travel FAQs', href: '#faq' },
    { name: 'Book Now', href: '#contact' },
  ];

  const keywords = [
    'Taxi in Hosur',
    'Cab service Hosur',
    'Hosur airport taxi',
    'Taxi booking Hosur',
    'Best cab in Hosur',
    'Outstation taxi Hosur'
  ];

  return (
    <footer className="bg-brand-black dark-blue-section border-t border-white/5 pt-16 pb-28 md:pb-12 text-left relative overflow-hidden">
      {/* Radial mesh glowing effect */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-yellow/5 glow-orb blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Column 1: Brand intro & Local Keywords */}
        <div className="lg:col-span-4 flex flex-col space-y-4 text-left">
          <a href="#home" className="flex items-center space-x-2">
            <span className="text-xl font-black text-white logo-text-yuvii">
              YUVII<span className="text-brand-yellow text-glow-yellow">CABS</span>
            </span>
          </a>
          
          <p className="text-xs text-brand-gray/95 font-medium leading-relaxed max-w-sm">
            YUVII CABS is Hosur's premier 24/7 luxury taxi and cab booking service. We specialize in flat-rate airport pickups, reliable outstation travel, and corporate fleet hire. Enjoy safe, air-conditioned, and professional commutes.
          </p>

          {/* Hidden organic SEO keywords wrapper for search crawlers */}
          <div className="pt-2">
            <span className="text-[10px] text-brand-gray/60 uppercase font-bold tracking-wider block mb-1.5">Local Services Matrix</span>
            <div className="flex flex-wrap gap-1.5">
              {keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="text-[10px] text-brand-gray bg-white/5 border border-white/5 px-2 py-0.5 rounded-full font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Navigation</h4>
          <ul className="flex flex-col space-y-2.5 text-xs text-brand-gray font-bold">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-brand-yellow transition-colors duration-200">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Trust Links */}
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Company</h4>
          <ul className="flex flex-col space-y-2.5 text-xs text-brand-gray font-bold">
            {secondaryLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-brand-yellow transition-colors duration-200">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Operations details */}
        <div className="lg:col-span-4 flex flex-col space-y-4 text-left">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest">Headquarters</h4>
          
          <ul className="flex flex-col space-y-3 text-xs text-brand-silver font-medium">
            <li className="flex items-start space-x-2.5">
              <MapPin className="w-4 h-4 text-brand-yellow mt-0.5 flex-shrink-0" />
              <a 
                href="https://maps.app.goo.gl/gHwiq68N6k8QekBt8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-brand-yellow transition-colors"
              >
                Railway Station Road, Hamman Nagar, Hosur, Tamil Nadu 635109
              </a>
            </li>
            
            <li className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-brand-yellow flex-shrink-0" />
              <a href="tel:+918792273625" className="hover:text-brand-yellow transition-colors font-bold">
                +91 87922 73625
              </a>
            </li>

            <li className="flex items-center space-x-2.5">
              <Mail className="w-4 h-4 text-brand-yellow flex-shrink-0" />
              <a href="mailto:bookings@yuviicabs.in" className="hover:text-brand-yellow transition-colors">
                bookings@yuviicabs.in
              </a>
            </li>

            <li className="flex items-center space-x-2.5 text-brand-gray">
              <Clock className="w-4 h-4 text-brand-yellow flex-shrink-0" />
              <span>24 Hours Support (7 Days a Week)</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar & Admin trigger */}
      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-brand-gray font-semibold gap-4">
        <div>
          <span>© {new Date().getFullYear()} YUVII CABS Hosur. All rights reserved.</span>
        </div>

        {/* Admin portal trigger */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onAdminToggle}
            className="flex items-center space-x-1 hover:text-brand-yellow transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin Control Panel</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
