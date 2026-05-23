import { Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  // Only show desktop floating buttons after scrolling past the fold
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. Pulsing WhatsApp Orb (Desktop only, visible after scrolling past the fold) */}
      <AnimatePresence>
        {isVisible && (
          <motion.a
            key="whatsapp-float-desktop"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            href="https://wa.me/918792273625?text=Hi! I need to book a taxi in Hosur."
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="hidden md:flex fixed bottom-8 right-8 z-40 w-14 h-14 bg-emerald-500 rounded-full items-center justify-center text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all cursor-pointer group"
          >
            {/* Pulsing ring animations behind the orb */}
            <div className="absolute inset-0 bg-emerald-500 rounded-full scale-110 opacity-30 animate-ping pointer-events-none" />
            <MessageSquare className="w-6 h-6 group-hover:scale-115 transition-transform" />
          </motion.a>
        )}
      </AnimatePresence>

      {/* 2. Permanent Sticky Bottom Action Ribbon (Mobile only, visible immediately) */}
      <div
        className="fixed bottom-0 left-0 w-full z-45 bg-white/95 dark:bg-brand-black/90 backdrop-blur-md border-t border-slate-200/60 dark:border-white/10 py-3 px-4 md:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.06)]"
      >
        <div className="flex space-x-3 w-full max-w-lg mx-auto">
          {/* Call Now Button */}
          <a
            href="tel:+918792273625"
            className="flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-full bg-brand-black hover:bg-brand-charcoal text-white font-extrabold text-sm tracking-wide shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-white/10 active:scale-95 transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4 fill-white text-white" />
            <span>Call Now</span>
          </a>

          {/* WhatsApp Button - Vibrant Green */}
          <a
            href="https://wa.me/918792273625?text=Hi! I want to book a taxi in Hosur."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-2 py-3.5 rounded-full bg-[#3bb352] hover:bg-green-600 text-white font-extrabold text-sm tracking-wide shadow-[0_4px_12px_rgba(59,179,82,0.2)] active:scale-95 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white text-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
