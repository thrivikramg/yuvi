import { useState, useEffect } from 'react';
import { Phone, Menu, X, ShieldAlert, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ onAdminToggle, theme, setTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'FAQs', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-brand-black/75 backdrop-blur-md border-b border-white/5 shadow-md'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-brand-black font-black text-xl shadow-[0_0_15px_rgba(255,212,59,0.3)] group-hover:scale-105 transition-transform duration-300">
              Y
            </div>
            <div className="flex flex-col text-left">
              <span 
                className="text-lg font-black tracking-tight logo-text-yuvii leading-none"
                style={{ color: theme === 'light' ? '#0B0F19' : '#FFFFFF' }}
              >
                YUVII <span className="text-brand-yellow text-glow-yellow">CABS</span>
              </span>
              <span className="text-[9px] text-brand-silver font-extrabold uppercase tracking-widest mt-0.5 opacity-80">
                Premium Call Taxi • Hosur
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-brand-silver/80 hover:text-brand-yellow transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-yellow after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Switcher Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-2 text-brand-silver/60 hover:text-brand-yellow hover:bg-brand-charcoal/50 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center border border-white/5"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-brand-yellow" /> : <Moon className="w-5 h-5 text-brand-yellow" />}
            </button>

            {/* Admin Key Switch */}
            <button
              onClick={onAdminToggle}
              title="Admin Control Panel"
              className="p-2 text-brand-silver/50 hover:text-brand-yellow hover:bg-brand-charcoal/50 rounded-full transition-all duration-300 cursor-pointer border border-white/5"
            >
              <ShieldAlert className="w-5 h-5" />
            </button>

            {/* Glowing Call Button */}
            <motion.a
              href="tel:+918792273625"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-yellow to-brand-gold text-brand-black font-bold text-sm tracking-tight shadow-[0_0_20px_rgba(255,212,59,0.3)] hover:shadow-[0_0_30px_rgba(255,212,59,0.5)] transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              <span>Call 24/7</span>
            </motion.a>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center space-x-2 md:space-x-3 lg:hidden">
            {/* Theme Switcher Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-brand-silver/60 hover:text-brand-yellow hover:bg-brand-charcoal/30 rounded-full cursor-pointer flex items-center justify-center border border-white/5"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-brand-yellow" /> : <Moon className="w-5 h-5 text-brand-yellow" />}
            </button>

            <button
              onClick={onAdminToggle}
              className="p-2 text-brand-silver/60 hover:text-brand-yellow hover:bg-brand-charcoal/30 rounded-full cursor-pointer flex items-center justify-center border border-white/5"
              title="Admin Panel"
            >
              <ShieldAlert className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 w-11 h-11 bg-white text-slate-800 dark:bg-brand-charcoal/80 dark:text-brand-white rounded-full flex items-center justify-center shadow-sm cursor-pointer border border-slate-200 dark:border-white/5 hover:border-brand-yellow/30 transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[73px] left-0 w-full bg-brand-black/95 backdrop-blur-lg border-b border-white/5 z-40 py-6 px-8 flex flex-col space-y-4 lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-brand-silver/90 hover:text-brand-yellow transition-colors py-2"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 border-t border-white/5 flex flex-col space-y-4">
              <a
                href="tel:+918792273625"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-brand-yellow text-brand-black font-bold shadow-[0_0_15px_rgba(255,212,59,0.2)] animate-pulse-glow"
              >
                <Phone className="w-5 h-5" />
                <span>Call +91 87922 73625</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
