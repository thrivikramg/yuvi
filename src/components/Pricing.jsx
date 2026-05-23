import { useState } from 'react';
import { Moon, Check, Coins, Milestone, MapPin, Route } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('local');

  const tabs = [
    { key: 'local', label: 'Local', icon: MapPin },
    { key: 'outstation', label: 'Outstation', icon: Route },
  ];



  return (
    <section id="pricing" className="py-24 bg-brand-charcoal/20 dark-blue-section relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[10%] left-[-5%] w-96 h-96 rounded-full bg-brand-gold/5 glow-orb blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 rounded-full bg-brand-blue/5 glow-orb blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col space-y-4">
          <span className="text-xs text-brand-yellow font-extrabold tracking-widest uppercase">Transparent Regional Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-white tracking-tight leading-tight">
            Simple & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-gold text-glow-yellow">Transparent Fares</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-gray/90 leading-relaxed">
            No hidden costs. No surprises. Choose from Local, Package, or Outstation rates — all designed for total clarity.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center mb-16">
          <div className="inline-flex p-1 bg-slate-100 dark:bg-brand-charcoal border border-slate-200/50 dark:border-white/5 rounded-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-brand-yellow text-brand-black shadow-[0_4px_12px_rgba(255,212,59,0.15)] dark:bg-brand-charcoal dark:border dark:border-brand-yellow/30 dark:text-brand-yellow dark:shadow-none'
                      : 'text-slate-600 dark:text-brand-silver hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LOCAL TAB */}
        {activeTab === 'local' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card gold-gradient-border p-8 rounded-3xl border border-white/5">
              <div className="text-center mb-6">
                <span className="inline-block text-[9px] uppercase font-bold text-amber-700 dark:text-brand-yellow tracking-wider mb-2 bg-amber-500/10 dark:bg-brand-yellow/5 border border-amber-500/20 dark:border-brand-yellow/15 px-3 py-1 rounded-full">
                  Local Driving
                </span>
                <h3 className="text-2xl font-black text-brand-white mt-2">City & Local Rides</h3>
                <p className="text-xs text-brand-gray/90 mt-1">For trips within Hosur city limits and nearby areas</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="glass-card p-5 rounded-2xl border border-white/5 text-center">
                  <span className="text-[10px] text-brand-gray uppercase font-bold tracking-wider block mb-1">Base Fare</span>
                  <span className="text-3xl font-black text-brand-white text-glow-yellow">₹150</span>
                  <span className="text-[10px] text-brand-silver font-semibold block mt-1">First 4 KM included</span>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-white/5 text-center">
                  <span className="text-[10px] text-brand-gray uppercase font-bold tracking-wider block mb-1">Extra Per KM</span>
                  <span className="text-3xl font-black text-brand-white text-glow-yellow">₹20</span>
                  <span className="text-[10px] text-brand-silver font-semibold block mt-1">After first 4 KM</span>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-white/5 text-center">
                  <span className="text-[10px] text-brand-gray uppercase font-bold tracking-wider block mb-1">Minimum Distance</span>
                  <span className="text-3xl font-black text-brand-white text-glow-yellow">4 KM</span>
                  <span className="text-[10px] text-brand-silver font-semibold block mt-1">Base fare applies</span>
                </div>
              </div>

              <div className="flex flex-col space-y-2 text-center">
                <ul className="flex flex-wrap justify-center gap-3 text-[11px] text-brand-silver font-semibold">
                  <li className="flex items-center space-x-1.5">
                    <div className="w-4 h-4 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>24/7 Availability</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <div className="w-4 h-4 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>No Surge Pricing</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <div className="w-4 h-4 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>Professional Drivers</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4">
                <a
                  href="#contact"
                  className="w-full flex items-center justify-center py-3.5 rounded-2xl bg-gradient-to-r from-brand-yellow to-brand-gold text-brand-black font-extrabold text-sm tracking-wide shadow-[0_4px_12px_rgba(255,212,59,0.2)] hover:shadow-[0_4px_20px_rgba(255,212,59,0.4)] transition-all cursor-pointer"
                >
                  Book a Local Ride
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* OUTSTATION TAB */}
        {activeTab === 'outstation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="glass-card gold-gradient-border p-8 rounded-3xl border border-white/5">
              <div className="text-center mb-6">
                <span className="inline-block text-[9px] uppercase font-bold text-amber-700 dark:text-brand-yellow tracking-wider mb-2 bg-amber-500/10 dark:bg-brand-yellow/5 border border-amber-500/20 dark:border-brand-yellow/15 px-3 py-1 rounded-full">
                  Outstation Travel
                </span>
                <h3 className="text-2xl font-black text-brand-white mt-2">Long Distance Rides</h3>
                <p className="text-xs text-brand-gray/90 mt-1">For intercity trips and outstation journeys from Hosur</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="glass-card p-5 rounded-2xl border border-white/5 text-center">
                  <span className="text-[10px] text-brand-gray uppercase font-bold tracking-wider block mb-1">Per KM Rate</span>
                  <span className="text-3xl font-black text-brand-white text-glow-yellow">₹10</span>
                  <span className="text-[10px] text-brand-silver font-semibold block mt-1">Flat rate per kilometer</span>
                </div>
                <div className="glass-card p-5 rounded-2xl border border-white/5 text-center">
                  <span className="text-[10px] text-brand-gray uppercase font-bold tracking-wider block mb-1">Minimum Billing</span>
                  <span className="text-3xl font-black text-brand-white text-glow-yellow">300 KM</span>
                  <span className="text-[10px] text-brand-silver font-semibold block mt-1">₹3,000 minimum fare</span>
                </div>
              </div>

              <div className="flex flex-col space-y-2 text-center">
                <ul className="flex flex-wrap justify-center gap-3 text-[11px] text-brand-silver font-semibold">
                  <li className="flex items-center space-x-1.5">
                    <div className="w-4 h-4 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>Tolls & parking extra</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <div className="w-4 h-4 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>Driver allowance included</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <div className="w-4 h-4 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>Clean AC fleet</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4">
                <a
                  href="#contact"
                  className="w-full flex items-center justify-center py-3.5 rounded-2xl bg-gradient-to-r from-brand-yellow to-brand-gold text-brand-black font-extrabold text-sm tracking-wide shadow-[0_4px_12px_rgba(255,212,59,0.2)] hover:shadow-[0_4px_20px_rgba(255,212,59,0.4)] transition-all cursor-pointer"
                >
                  Book Outstation Ride
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Additional Terms Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-16">
          {/* Toll info */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/5 flex space-x-4 items-start shadow-md">
            <div className="p-3 bg-brand-yellow/5 border border-brand-yellow/10 rounded-xl text-brand-yellow flex-shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-white uppercase tracking-wider">Toll Gates & Parking</h4>
              <p className="text-xs text-brand-gray/95 mt-1 leading-relaxed font-semibold">
                Toll fees, parking fees, and interstate permit entry taxes are charged extra at actuals and are settled directly by the customer.
              </p>
            </div>
          </div>

          {/* Night charge details */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/5 flex space-x-4 items-start shadow-md">
            <div className="p-3 bg-brand-yellow/5 border border-brand-yellow/10 rounded-xl text-brand-yellow flex-shrink-0">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-white uppercase tracking-wider">Driver Night Allowance</h4>
              <p className="text-xs text-brand-gray/95 mt-1 leading-relaxed font-semibold">
                An additional driver night allowance applies for journeys scheduled between 10:00 PM and 6:00 AM.
              </p>
            </div>
          </div>

          {/* Outstation minimums */}
          <div className="glass-card glass-card-hover p-6 rounded-2xl border border-white/5 flex space-x-4 items-start shadow-md">
            <div className="p-3 bg-brand-yellow/5 border border-brand-yellow/10 rounded-xl text-brand-yellow flex-shrink-0">
              <Milestone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-white uppercase tracking-wider">Outstation Minimums</h4>
              <p className="text-xs text-brand-gray/95 mt-1 leading-relaxed font-semibold">
                Outstation journeys carry a minimum billing of 300 KM. Fare: ₹10/km.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
