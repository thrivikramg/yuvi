import { ShieldCheck, Award, Star, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const stats = [
    { value: '10,000+', label: 'Trips Completed', icon: Compass },
    { value: '4.9 / 5', label: 'Customer Rating', icon: Star },
    { value: '50+', label: 'Elite Fleet Cars', icon: Award },
    { value: '100%', label: 'Safety Verified', icon: ShieldCheck },
  ];

  return (
    <section id="about" className="py-24 bg-brand-black dark-blue-section relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-blue/5 glow-orb blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-brand-yellow/5 glow-orb blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Stats Counter Panels */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-6 order-2 lg:order-1">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100, delay: idx * 0.1 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.04,
                  boxShadow: "0 20px 40px rgba(255, 212, 59, 0.15)",
                }}
                className="p-8 rounded-3xl border border-slate-200/10 dark:border-white/10 flex flex-col items-center text-center justify-center space-y-3 relative overflow-hidden group hover:border-brand-yellow/30 transition-all duration-500 cursor-default bg-transparent"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-12 h-12 rounded-2xl bg-brand-yellow/5 border border-brand-yellow/15 flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-black shadow-[0_0_12px_rgba(255,212,59,0.15)] group-hover:shadow-[0_0_20px_rgba(255,212,59,0.3)] transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-3xl font-black text-white text-glow-yellow group-hover:scale-105 transition-transform duration-300">{stat.value}</span>
                  <span className="text-xs text-brand-gray uppercase font-semibold tracking-wider">{stat.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Side: Local pride copy and trust bullet points */}
        <div className="lg:col-span-6 flex flex-col space-y-6 text-left order-1 lg:order-2">
          <span className="text-xs text-brand-yellow font-extrabold tracking-widest uppercase">About YUVII CABS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Proudly Serving <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-gold text-glow-yellow">Hosur & Environs</span> Since 2018
          </h2>
          
          <p className="text-sm sm:text-base text-brand-gray/95 leading-relaxed font-medium">
            Based in Hosur, the prominent industrial manufacturing capital of Tamil Nadu bordering Bangalore, we understand the high expectations for fast, reliable, and premium transportation. 
          </p>
          <p className="text-sm text-brand-gray/90 leading-relaxed font-semibold">
            Whether you are a corporate executive visiting manufacturing parks, a resident heading to Bengaluru International Airport (BLR) for a flight, or a tourist booking an outstation tour, we provide the highest standard of cab service with absolute transparency.
          </p>

          {/* Bullet trust list */}
          <div className="flex flex-col space-y-4 pt-2">
            <div className="flex items-start space-x-3 text-left">
              <div className="mt-1 w-5 h-5 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Flight-Matched Airport Pickups</h4>
                <p className="text-xs text-brand-gray/80 mt-0.5 leading-relaxed font-medium">
                  We track your airline arrival times so our taxi is waiting at the BLR arrival deck the exact moment you land.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-left">
              <div className="mt-1 w-5 h-5 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Rigorous Safety Checks</h4>
                <p className="text-xs text-brand-gray/80 mt-0.5 leading-relaxed font-medium">
                  Every vehicle in our fleet undergoes daily cleaning checklists, mechanical inspections, and driver health checkups before deployment.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
