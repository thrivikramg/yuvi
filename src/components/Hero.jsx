import { useState } from 'react';
import { Phone, MessageSquare, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import hatchbackTaxiImg from '../assets/hatchback_taxi.png';
import premiumTaxiImg from '../assets/premium_taxi.png';
import suvTaxiImg from '../assets/suv_taxi.png';
import innovaTaxiImg from '../assets/innova_taxi.png';
import tempoTravellerImg from '../assets/tempo_traveller.png';

export default function Hero() {
  const [selectedVehicle, setSelectedVehicle] = useState('sedan');
  const [distance, setDistance] = useState(10);
  const [direction, setDirection] = useState(1);

  const [tiltStyle, setTiltStyle] = useState({
    transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
    '--glare-x': '50%',
    '--glare-y': '50%'
  });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;
    
    const maxRotate = 10; // Max rotation angle
    const rotateX = -dy * maxRotate;
    const rotateY = dx * maxRotate;
    
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setTiltStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      '--glare-x': `${glareX}%`,
      '--glare-y': `${glareY}%`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
      '--glare-x': '50%',
      '--glare-y': '50%'
    });
  };

  const vehicles = {
    hatchback: { 
      name: 'Hatchback', 
      desc: 'Indica / Vista / Figo',
      image: hatchbackTaxiImg
    },
    sedan: { 
      name: 'Sedan', 
      desc: 'Etios / Dzire / Xcent',
      image: premiumTaxiImg
    },
    suv: { 
      name: 'SUV', 
      desc: 'Ertiga / XUV / SUV',
      image: suvTaxiImg
    },
    innova: { 
      name: 'Innova', 
      desc: 'Toyota Innova',
      image: innovaTaxiImg
    },
    tempo: { 
      name: 'Tempo Traveller', 
      desc: '12+1 Seater Van',
      image: tempoTravellerImg
    }
  };

  // Trip mode pricing
  const [tripMode, setTripMode] = useState('local'); // local | package | outstation
  const [selectedPackage, setSelectedPackage] = useState('4hr');
  const [extraKm, setExtraKm] = useState(0);

  const vehicleKeys = ['hatchback', 'sedan', 'suv', 'innova', 'tempo'];

  const selectVehicleWithDirection = (key) => {
    const newIdx = vehicleKeys.indexOf(key);
    const oldIdx = vehicleKeys.indexOf(selectedVehicle);
    setDirection(newIdx >= oldIdx ? 1 : -1);
    setSelectedVehicle(key);
  };

  const handlePrev = () => {
    const currentIndex = vehicleKeys.indexOf(selectedVehicle);
    const prevIndex = (currentIndex - 1 + vehicleKeys.length) % vehicleKeys.length;
    setDirection(-1);
    setSelectedVehicle(vehicleKeys[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = vehicleKeys.indexOf(selectedVehicle);
    const nextIndex = (currentIndex + 1) % vehicleKeys.length;
    setDirection(1);
    setSelectedVehicle(vehicleKeys[nextIndex]);
  };

  const packages = {
    '2hr': { label: '2 Hr', km: 20, base: 600, extraRate: 12 },
    '4hr': { label: '4 Hr', km: 40, base: 850, extraRate: 12 },
    '5hr': { label: '5 Hr', km: 50, base: 1200, extraRate: 12 },
    '8hr': { label: '8 Hr', km: 100, base: 1700, extraRate: 10 },
  };

  const calculateEstimate = () => {
    if (tripMode === 'local') {
      // Local: 4km base ₹150, extra ₹20/km
      let fare = 150;
      if (distance > 4) {
        fare += (distance - 4) * 20;
      }
      return fare;
    } else if (tripMode === 'package') {
      // Package: base fare + extra km beyond included
      const pkg = packages[selectedPackage];
      return pkg.base + (extraKm * pkg.extraRate);
    } else {
      // Outstation: ₹10/km, minimum 300km
      const billableKm = Math.max(distance, 300);
      return billableKm * 10;
    }
  };

  const renderCarCarousel = (isMobile) => {
    return (
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
        className={`relative w-full h-[240px] sm:h-[280px] flex items-center justify-center overflow-hidden p-4 bg-white rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] tilted-perspective tilted-card cursor-default ${
          isMobile ? 'block lg:hidden mt-6 mb-2' : 'hidden lg:flex'
        }`}
      >
        {/* Ambient Radial glow behind car */}
        <div className="absolute inset-0 w-80 h-40 bg-gradient-to-r from-brand-yellow to-brand-gold blur-[60px] opacity-15 rounded-full mx-auto pointer-events-none" />
        
        <button 
          onClick={handlePrev}
          className="absolute left-3 z-30 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-all cursor-pointer border border-black/5"
          title="Previous Vehicle"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-3 z-30 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white transition-all cursor-pointer border border-black/5"
          title="Next Vehicle"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute top-4 left-4 z-20 flex flex-col text-left">
          <span className="text-[10px] text-black dark:text-black font-extrabold uppercase tracking-wider">Fleet Showcase</span>
          <span className="text-lg font-black text-black dark:text-black leading-tight">{vehicles[selectedVehicle].name}</span>
          <span className="text-[10px] text-slate-700 dark:text-slate-700 font-bold">{vehicles[selectedVehicle].desc}</span>
        </div>

        <div className="w-full h-full flex items-center justify-center pointer-events-none">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={selectedVehicle}
              custom={direction}
              variants={{
                enter: (dir) => ({
                  x: dir > 0 ? 150 : -150,
                  opacity: 0,
                  scale: 0.95
                }),
                center: {
                  x: 0,
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.4, ease: 'easeOut' }
                },
                exit: (dir) => ({
                  x: dir < 0 ? 150 : -150,
                  opacity: 0,
                  scale: 0.95,
                  transition: { duration: 0.3, ease: 'easeIn' }
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              src={vehicles[selectedVehicle].image}
              alt={vehicles[selectedVehicle].name}
              className="w-full h-full object-contain select-none p-2 mt-6"
            />
          </AnimatePresence>
        </div>

        {/* Overlay Phone Badge to match Mockup */}
        <a 
          href="tel:+918792273625"
          className="absolute bottom-3 right-3 z-30 inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#00bfa5] hover:bg-[#00c853] text-white rounded-full font-black text-[11px] shadow-[0_4px_12px_rgba(0,191,165,0.35)] transition-all cursor-pointer pointer-events-auto hover:scale-105 active:scale-95"
        >
          <Phone className="w-3.5 h-3.5 fill-white text-white" />
          <span>+91 87922 73625</span>
        </a>

        {/* Indicator dots */}
        <div className="absolute bottom-3 flex space-x-1.5 z-20">
          {vehicleKeys.map((key) => (
            <button
              key={key}
              onClick={() => selectVehicleWithDirection(key)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                selectedVehicle === key ? 'w-5 bg-slate-800 dark:bg-slate-800' : 'w-1.5 bg-slate-300 dark:bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="home" className="relative min-h-screen bg-brand-black flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-mesh">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-brand-purple/20 glow-orb animate-orb-glow" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-brand-blue/10 glow-orb animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-brand-gold/10 glow-orb animate-orb-glow" />

      {/* Grid Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Cinematic Copy and Badge buttons */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          
          {/* Animated Gold Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="self-start inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
            <span>YUVII CABS Hosur</span>
          </motion.div>

          {/* Heading with increased font size */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-black tracking-tight text-brand-white leading-[1.05] text-left"
          >
            Reliable <span className="text-stroke-yellow text-transparent font-black">Taxi</span> <br />
            <span className="text-stroke-yellow text-transparent font-black">Service in Hosur</span>
          </motion.h1>

          {/* Subtitle with increased font size */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-brand-silver/90 max-w-xl font-semibold leading-relaxed text-left"
          >
            24/7 Local & Outstation Cab Booking. Verified professional drivers, clean fleet, and absolute transparent pricing.
          </motion.p>

          {/* Mobile Display: Render the car image directly below the text on mobile */}
          {renderCarCarousel(true)}

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            {/* Book Now */}
            <a
              href="#contact"
              className="flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-yellow to-brand-gold text-brand-black font-extrabold text-base tracking-tight shadow-[0_0_30px_rgba(255,212,59,0.35)] hover:shadow-[0_0_45px_rgba(255,212,59,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Cab Now</span>
            </a>

            {/* Call Now */}
            <a
              href="tel:+918792273625"
              className="flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 dark:bg-brand-charcoal dark:hover:bg-brand-charcoal/80 dark:text-brand-white dark:border-white/10 dark:hover:border-brand-yellow/30 transition-all duration-300"
            >
              <Phone className="w-5 h-5 text-brand-yellow" />
              <span>Call: +91 87922 73625</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/918792273625?text=Hi! I want to book a taxi in Hosur."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base tracking-tight shadow-[0_4px_14px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.45)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>WhatsApp Chat</span>
            </a>
          </motion.div>

          {/* Quick Trust factors */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center space-x-6 text-brand-silver/60 text-sm pt-4"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
              <span>No Hidden Charges</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
              <span>Top Rated Drivers</span>
            </div>
          </motion.div>

        </div>

        {/* Right Side: 3D Car Graphic and Slider Fare Calculator */}
        <div className="lg:col-span-5 flex flex-col space-y-6 relative">
          
          {/* Desktop Display: Render the car image carousel on desktop only */}
          {renderCarCarousel(false)}

          {/* Real-time Glassmorphism Fare Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="glass-card gold-gradient-border p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 relative z-20 flex flex-col space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-none"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-brand-white tracking-tight">Quick Fare Estimator</h3>
              <span className="text-[10px] bg-amber-500/10 dark:bg-brand-yellow/10 text-amber-700 dark:text-brand-yellow border border-amber-500/20 dark:border-brand-yellow/20 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Hosur Regional</span>
            </div>

            {/* Trip Mode Selector */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { key: 'local', label: 'Local' },
                { key: 'package', label: 'Package' },
                { key: 'outstation', label: 'Outstation' }
              ].map((mode) => (
                <button
                  key={mode.key}
                  onClick={() => {
                    setTripMode(mode.key);
                    if (mode.key === 'local') setDistance(10);
                    if (mode.key === 'outstation') setDistance(300);
                  }}
                  className={`py-2.5 px-1 rounded-xl text-[11px] font-bold transition-all duration-300 cursor-pointer border border-brand-yellow ${
                    tripMode === mode.key
                      ? 'bg-brand-yellow text-brand-black shadow-[0_4px_12px_rgba(255,212,59,0.25)]'
                      : 'bg-white dark:bg-brand-charcoal text-slate-700 dark:text-brand-silver hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Dynamic content based on trip mode */}
            {tripMode === 'local' && (
              <div className="flex flex-col space-y-3">
                {/* Rate info */}
                <div className="flex items-center justify-between bg-white dark:bg-brand-charcoal/40 p-2.5 rounded-2xl border border-slate-200/30 dark:border-white/5">
                  <span className="text-xs font-semibold text-slate-700 dark:text-brand-silver">Base Fare (4 km)</span>
                  <span className="text-sm font-extrabold text-amber-600 dark:text-brand-yellow">₹150</span>
                </div>
                <div className="flex items-center justify-between bg-white dark:bg-brand-charcoal/40 p-2.5 rounded-2xl border border-slate-200/30 dark:border-white/5">
                  <span className="text-xs font-semibold text-slate-700 dark:text-brand-silver">Extra per KM</span>
                  <span className="text-sm font-extrabold text-amber-600 dark:text-brand-yellow">₹20</span>
                </div>
                {/* KM Slider */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-brand-silver">
                    <span>Distance</span>
                    <span className="text-amber-600 dark:text-brand-yellow font-extrabold text-sm">{distance} KM</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-brand-charcoal rounded-lg appearance-none cursor-pointer accent-brand-yellow"
                  />
                  <div className="flex justify-between text-[10px] text-brand-gray">
                    <span>1 km</span>
                    <span>30 km</span>
                    <span>60 km</span>
                  </div>
                </div>
              </div>
            )}

            {tripMode === 'package' && (
              <div className="flex flex-col space-y-3">
                {/* Package selector */}
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(packages).map(([key, pkg]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedPackage(key)}
                      className={`py-2.5 px-2 rounded-xl text-center font-bold cursor-pointer flex flex-col justify-center items-center transition-all border border-brand-yellow ${
                        selectedPackage === key
                          ? 'bg-brand-yellow/15 border-brand-yellow text-amber-800 dark:text-brand-yellow shadow-inner'
                          : 'bg-white dark:bg-brand-charcoal border-slate-200/50 dark:border-white/5 text-slate-700 dark:text-brand-silver hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xs font-black">{pkg.label} / {pkg.km} KM</span>
                      <span className="text-[10px] text-brand-gray font-semibold mt-0.5">₹{pkg.base}</span>
                    </button>
                  ))}
                </div>
                {/* Extra KM input */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-brand-silver">
                    <span>Extra KM beyond {packages[selectedPackage].km} km</span>
                    <span className="text-amber-600 dark:text-brand-yellow font-extrabold text-sm">{extraKm} KM</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={extraKm}
                    onChange={(e) => setExtraKm(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-brand-charcoal rounded-lg appearance-none cursor-pointer accent-brand-yellow"
                  />
                  <div className="flex justify-between text-[10px] text-brand-gray">
                    <span>0 km</span>
                    <span>Extra @ ₹{packages[selectedPackage].extraRate}/km</span>
                    <span>100 km</span>
                  </div>
                </div>
              </div>
            )}

            {tripMode === 'outstation' && (
              <div className="flex flex-col space-y-3">
                {/* Rate info */}
                <div className="flex items-center justify-between bg-white dark:bg-brand-charcoal/40 p-2.5 rounded-2xl border border-slate-200/30 dark:border-white/5">
                  <span className="text-xs font-semibold text-slate-700 dark:text-brand-silver">Rate per KM</span>
                  <span className="text-sm font-extrabold text-amber-600 dark:text-brand-yellow">₹10</span>
                </div>
                <div className="flex items-center justify-between bg-white dark:bg-brand-charcoal/40 p-2.5 rounded-2xl border border-slate-200/30 dark:border-white/5">
                  <span className="text-xs font-semibold text-slate-700 dark:text-brand-silver">Minimum Billing</span>
                  <span className="text-sm font-extrabold text-amber-600 dark:text-brand-yellow">300 KM</span>
                </div>
                {/* KM Slider */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-brand-silver">
                    <span>Total Distance</span>
                    <span className="text-amber-600 dark:text-brand-yellow font-extrabold text-sm">{distance} KM</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="10"
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-brand-charcoal rounded-lg appearance-none cursor-pointer accent-brand-yellow"
                  />
                  <div className="flex justify-between text-[10px] text-brand-gray">
                    <span>100 km</span>
                    <span>500 km</span>
                    <span>1000 km</span>
                  </div>
                </div>
              </div>
            )}

            {/* Fare Result */}
            <div className="pt-3 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between">
              <div className="flex flex-col text-left">
                <span className="text-xs text-brand-gray font-semibold">Estimated Fare</span>
                <span className="text-[9px] text-brand-gray/85">
                  {tripMode === 'outstation' && distance < 300 ? '*Min 300 km billed' : '*Tolls & parking extra'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-brand-white text-glow-yellow">
                  ₹{calculateEstimate()}
                </span>
                <span className="block text-[9px] text-amber-700 dark:text-brand-yellow font-semibold">
                  {tripMode === 'local' && `Base ₹150 + ${Math.max(0, distance - 4)} extra km × ₹20`}
                  {tripMode === 'package' && `${packages[selectedPackage].label} Package + ${extraKm} extra km`}
                  {tripMode === 'outstation' && `${Math.max(distance, 300)} km × ₹10/km`}
                </span>
              </div>
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const formEl = document.getElementById('contact');
                if (formEl) {
                  const messageInput = document.getElementById('booking-message');
                  if (messageInput) {
                    const modeLabel = tripMode === 'local' ? 'Local' : tripMode === 'package' ? `Package (${packages[selectedPackage].label})` : 'Outstation';
                    messageInput.value = `Fare estimate: ${modeLabel}. Distance: ${tripMode === 'package' ? packages[selectedPackage].km + '+' + extraKm : distance} KM. Est. Total: ₹${calculateEstimate()}`;
                  }
                  formEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full flex items-center justify-center space-x-1 py-3 rounded-xl bg-brand-yellow hover:bg-brand-yellow/90 text-brand-black font-extrabold text-xs tracking-wider shadow-[0_4px_12px_rgba(255,212,59,0.15)] dark:bg-brand-charcoal dark:hover:bg-brand-charcoal/80 dark:text-brand-yellow dark:border dark:border-brand-yellow/20 dark:shadow-none dark:hover:border-brand-yellow/45 transition-all cursor-pointer"
            >
              <span>Instant Book This Estimate</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
