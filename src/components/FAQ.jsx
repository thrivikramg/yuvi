import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What is the taxi fare in Hosur?',
      answer: 'Our rates are fully transparent and distance-based. Hatchbacks are priced at ₹20-25/km (plus ₹300 driver allowance per day), Premium Sedans at ₹22-27/km (plus ₹300 driver allowance), and Executive SUVs at ₹26-32/km (plus ₹300 driver allowance). Tolls, parking fee, and night charges (10 PM to 6 AM) are extra.'
    },
    {
      question: 'Is airport pickup available from Hosur?',
      answer: 'Yes! We specialize in reliable airport transfers between Hosur and Bengaluru Kempegowda International Airport (BLR). The distance is approximately 80km. You can book airport pickups and drops 24/7. We track flight delays to ensure drivers are at arrival on-time.'
    },
    {
      question: 'Are YUVII CABS taxis available 24/7?',
      answer: 'Absolutely. We operate twenty-four hours a day, seven days a week. Whether you have an early morning flight, a midnight emergency, or a late-night corporate trip, you can book online or call us anytime for immediate dispatch.'
    },
    {
      question: 'Do you provide outstation travel from Hosur?',
      answer: 'Yes, we provide outstation round-trips and one-way drops from Hosur to major cities like Bangalore, Chennai, Salem, Coimbatore, Madurai, Pondicherry, and more. One-way bookings enjoy lower rates since you only pay for the distance traveled.'
    },
    {
      question: 'How can I book a taxi with YUVII CABS?',
      answer: 'You can book a taxi instantly by calling our hotline (+91 87922 73625), clicking our WhatsApp button to chat directly, or by filling out the online booking request form located in the Contact section. We will confirm your car within minutes.'
    }
  ];

  const toggleFAQ = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-brand-black relative overflow-hidden">
      {/* Glow ambient spots */}
      <div className="absolute top-[30%] left-[-10%] w-96 h-96 rounded-full bg-brand-blue/5 glow-orb blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand-yellow/5 glow-orb blur-[100px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col space-y-4">
          <span className="text-xs text-brand-yellow font-extrabold tracking-widest uppercase">Support Center</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-gold text-glow-yellow">Questions</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-gray/90 leading-relaxed">
            Find immediate answers regarding pricing estimates, airport pick-ups, outstation travel policies, and passenger safety.
          </p>
        </div>

        {/* Accordions */}
        <div className="flex flex-col space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-3xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-brand-yellow/10"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left transition-colors duration-300 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${isOpen ? 'text-brand-yellow' : 'text-brand-gray'}`} />
                    <span className="text-sm sm:text-base font-bold text-white tracking-tight hover:text-brand-yellow transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1 rounded-full bg-white/5 border border-white/5 text-brand-silver hover:text-brand-yellow"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 sm:px-8 pb-8 pt-0 text-left border-t border-white/5">
                        <p className="text-xs sm:text-sm text-brand-silver/90 leading-relaxed font-semibold mt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
