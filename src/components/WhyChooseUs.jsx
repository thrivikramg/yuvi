import { Clock, Banknote, UserCheck, Plane, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Clock,
      title: '24/7 Service Availability',
      description: 'Ride at any time of night or day. Our call center and driver network are active 24/7 for you in Hosur.',
      glowColor: 'group-hover:border-brand-yellow/30'
    },
    {
      icon: Banknote,
      title: 'Affordable & Flat Pricing',
      description: 'Transparent rates starting at just ₹20/km. Zero surprise charges or surge fees during emergency bookings.',
      glowColor: 'group-hover:border-brand-yellow/30'
    },
    {
      icon: UserCheck,
      title: 'Professional Chauffeurs',
      description: 'Background-verified, licensed drivers with extensive knowledge of local routes and outer-state lanes.',
      glowColor: 'group-hover:border-brand-yellow/30'
    },
    {
      icon: Plane,
      title: 'Airport Pickups & Drops',
      description: 'Reliable transfers to Bengaluru Kempegowda International Airport (BLR) with flight tracking to avoid delays.',
      glowColor: 'group-hover:border-brand-yellow/30'
    },
    {
      icon: Zap,
      title: 'Lightning-Fast Booking',
      description: 'Instantly confirm your ride via phone call, WhatsApp, or our online form with a 10-minute dispatch standard.',
      glowColor: 'group-hover:border-brand-yellow/30'
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Comfortable Rides',
      description: 'Cleaned, air-conditioned premium sedans and SUVs maintained to rigorous sanitization standards.',
      glowColor: 'group-hover:border-brand-yellow/30'
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="why-us" className="py-24 bg-brand-charcoal relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-blue/5 glow-orb blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-purple/5 glow-orb blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col space-y-4">
          <span className="text-xs text-brand-yellow font-extrabold tracking-widest uppercase">The YUVII CABS Standard</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Why We Are The <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-gold text-glow-yellow">Preferred Choice</span> in Hosur
          </h2>
          <p className="text-sm sm:text-base text-brand-gray/90 leading-relaxed">
            We combine high-end technology with local hospitality to offer a seamless, reliable, and premium transportation service that stands out from the competition.
          </p>
        </div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="group glass-card glass-card-hover why-us-card p-8 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col text-left space-y-5 cursor-default"
              >
                {/* Glowing border outline */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-2xl bg-brand-yellow/5 border border-brand-yellow/15 flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-black group-hover:scale-110 shadow-[0_0_15px_rgba(255,212,59,0.15)] group-hover:shadow-[0_0_25px_rgba(255,212,59,0.3)] transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Typography */}
                <div className="flex flex-col space-y-2 relative z-10">
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-brand-yellow transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-brand-gray/90 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
