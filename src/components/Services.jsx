import { Plane, Navigation, Milestone, Briefcase, ChevronRight, CornerUpRight, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      icon: Plane,
      title: 'Airport Taxi Transfers',
      description: 'Staggered pickup and dropoff services between Hosur and Kempegowda International Airport Bengaluru (BLR). We ensure absolute timeliness.',
      accent: 'border-brand-yellow/30',
      badge: 'BLR Airport Dedicated'
    },
    {
      icon: Navigation,
      title: 'Local Taxi Hailing',
      description: 'Point-to-point transfers and hourly rentals within Hosur city. Ride in comfort to your destination in clean, air-conditioned cars.',
      accent: 'border-brand-yellow/30',
      badge: 'Quick Pickup'
    },
    {
      icon: Milestone,
      title: 'Outstation Travel',
      description: 'Travel beyond Hosur with premium long-distance cabs. Clean, inspected sedans and SUVs ready for family trips and weekend excursions.',
      accent: 'border-brand-purple/30',
      badge: 'Inter-City travel'
    },
    {
      icon: Briefcase,
      title: 'Corporate Travel Solutions',
      description: 'Reliable monthly employee transport, executive hospitality cabs, and event fleets with corporate invoice billing models.',
      accent: 'border-brand-emerald/30',
      badge: 'Business Class'
    },
    {
      icon: CornerUpRight,
      title: 'One-Way Cab Bookings',
      description: 'Pay only for the distance you travel! Book one-way trips from Hosur to major cities like Bangalore, Salem, and Chennai.',
      accent: 'border-brand-yellow/30',
      badge: 'Half Fare Saved'
    },
    {
      icon: RefreshCcw,
      title: 'Round Trip Taxi Packages',
      description: 'Book a driver and car for multiple days. Enjoy maximum flexibility, multiple stops, and low waiting costs for returns.',
      accent: 'border-brand-yellow/30',
      badge: 'Multi-Day Touring'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 35 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="services" className="py-24 bg-brand-black relative overflow-hidden">
      {/* Mesh gradients for modern futuristic tech design */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand-yellow/5 glow-orb blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-[20%] left-[-15%] w-[450px] h-[450px] rounded-full bg-brand-purple/5 glow-orb blur-[120px] animate-orb-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col space-y-4">
          <span className="text-xs text-brand-yellow font-extrabold tracking-widest uppercase">Premium Offerings</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Our Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-gold text-glow-yellow">Transit Services</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-gray/90 leading-relaxed">
            From short local commutes to long-distance outstation adventures, choose the transit package that fits your lifestyle perfectly.
          </p>
        </div>

        {/* Services List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group glass-card glass-card-hover services-card p-8 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col justify-between cursor-default"
              >
                {/* Embedded Glowing Sphere background in the card */}
                <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-brand-yellow/5 group-hover:bg-brand-yellow/10 transition-colors duration-500 blur-2xl pointer-events-none" />

                <div className="flex flex-col space-y-5">
                  {/* Top Badge and Icon row */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-brand-yellow/5 border border-brand-yellow/15 flex items-center justify-center text-brand-yellow group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,212,59,0.25)] transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-brand-yellow bg-brand-yellow/5 px-2.5 py-1 rounded-full border border-brand-yellow/15 group-hover:bg-brand-yellow group-hover:text-brand-black transition-all duration-300">
                      {svc.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col space-y-2 text-left">
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-yellow transition-colors duration-300">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-brand-gray/95 font-medium leading-relaxed">
                      {svc.description}
                    </p>
                  </div>
                </div>

                {/* Footer anchor */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-brand-yellow font-bold text-xs">
                  <a
                    href="#contact"
                    onClick={() => {
                      const formEl = document.getElementById('contact');
                      if (formEl) {
                        const messageInput = document.getElementById('booking-message');
                        if (messageInput) {
                          messageInput.value = `Hi, I am interested in booking your ${svc.title} service. Please contact me.`;
                        }
                        formEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="hover:underline flex items-center space-x-1"
                  >
                    <span>Book Service</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
