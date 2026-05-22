import { useState, useEffect } from 'react';
import { Phone, MessageSquare, MapPin, Calendar, Clock, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    drop: '',
    date: '',
    time: '',
    vehicle: 'sedan',
    ac_service: 'ac',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // If a quick estimate was clicked from the Hero section, parse the location hash parameters
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#contact')) {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.split('?')[1]);
        const vehicle = params.get('vehicle');
        const distance = params.get('distance');
        const ac = params.get('ac');
        
        if (vehicle) {
          setFormData((prev) => ({
            ...prev,
            vehicle: vehicle,
            ac_service: ac === 'false' ? 'non-ac' : 'ac',
            message: prev.message || `Hi! I estimated a booking on the estimator. Distance: ${distance} KM. Vehicle type: ${vehicle.toUpperCase()}. Service: ${ac === 'false' ? 'Non-A/C' : 'A/C'}.`
          }));
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Trigger on initial mount too
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s-+]/g, '').slice(-10))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }
    
    if (!formData.pickup.trim()) newErrors.pickup = 'Pickup location is required';
    if (!formData.drop.trim()) newErrors.drop = 'Dropoff location is required';
    if (!formData.date) newErrors.date = 'Select pick-up date';
    if (!formData.time) newErrors.time = 'Select pick-up time';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Mock API delay for cinematic luxury feel
    setTimeout(() => {
      const newBooking = {
        id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
        ...formData,
        status: 'Pending',
        timestamp: new Date().toISOString()
      };

      try {
        // Save to localStorage persistently for Admin Dashboard access
        const existingBookings = JSON.parse(localStorage.getItem('yuviicabs_bookings') || '[]');
        localStorage.setItem('yuviicabs_bookings', JSON.stringify([newBooking, ...existingBookings]));
        
        // Dispatch a custom event to notify the AdminDashboard if it's currently rendered
        window.dispatchEvent(new Event('yuviicabs_booking_submitted'));
        
        setSubmitSuccess(true);
        setFormData({
          name: '',
          phone: '',
          pickup: '',
          drop: '',
          date: '',
          time: '',
          vehicle: 'sedan',
          ac_service: 'ac',
          message: ''
        });
      } catch (err) {
        console.error('Error saving booking', err);
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-brand-charcoal/20 dark-blue-section relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-[10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-brand-yellow/5 glow-orb blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-blue/5 glow-orb blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side Column: Booking Form */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          
          <div className="text-left space-y-4">
            <span className="text-xs text-brand-yellow font-extrabold tracking-widest uppercase">Reserve Your Ride</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              24/7 Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-gold text-glow-yellow">Cab Booking</span>
            </h2>
            <p className="text-sm text-brand-gray/90 leading-relaxed font-semibold">
              Fill out the form below to request a ride. Our booking coordinators will review the request and call you back in less than 5 minutes to confirm driver dispatch details.
            </p>
          </div>

          <div className="glass-card gold-gradient-border p-8 rounded-3xl border border-white/5 relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  
                  {/* Name field */}
                  <div className="flex flex-col space-y-1.5 text-left">
                    <label className="text-xs text-brand-silver font-bold uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full bg-brand-charcoal text-white rounded-xl py-3 px-4 text-sm font-semibold border ${errors.name ? 'border-red-500' : 'border-white/5'} focus:border-brand-yellow focus:outline-none transition-colors`}
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-500 font-bold flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col space-y-1.5 text-left">
                    <label className="text-xs text-brand-silver font-bold uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 8792273625"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full bg-brand-charcoal text-white rounded-xl py-3 px-4 text-sm font-semibold border ${errors.phone ? 'border-red-500' : 'border-white/5'} focus:border-brand-yellow focus:outline-none transition-colors`}
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-red-500 font-bold flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Pickup location */}
                  <div className="flex flex-col space-y-1.5 text-left sm:col-span-2 relative">
                    <label className="text-xs text-brand-silver font-bold uppercase tracking-wider">Pickup Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-brand-yellow pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Pickup spot (e.g. Railway Station Road, Hosur)"
                        value={formData.pickup}
                        onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                        className={`w-full bg-brand-charcoal text-white rounded-xl py-3 pl-11 pr-4 text-sm font-semibold border ${errors.pickup ? 'border-red-500' : 'border-white/5'} focus:border-brand-yellow focus:outline-none transition-colors`}
                      />
                    </div>
                    {errors.pickup && (
                      <span className="text-[10px] text-red-500 font-bold flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.pickup}
                      </span>
                    )}
                  </div>

                  {/* Drop Location */}
                  <div className="flex flex-col space-y-1.5 text-left sm:col-span-2 relative">
                    <label className="text-xs text-brand-silver font-bold uppercase tracking-wider">Dropoff Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-brand-yellow pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Dropoff spot (e.g. Bengaluru Airport Terminal 2)"
                        value={formData.drop}
                        onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                        className={`w-full bg-brand-charcoal text-white rounded-xl py-3 pl-11 pr-4 text-sm font-semibold border ${errors.drop ? 'border-red-500' : 'border-white/5'} focus:border-brand-yellow focus:outline-none transition-colors`}
                      />
                    </div>
                    {errors.drop && (
                      <span className="text-[10px] text-red-500 font-bold flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.drop}
                      </span>
                    )}
                  </div>

                  {/* Date selection */}
                  <div className="flex flex-col space-y-1.5 text-left relative">
                    <label className="text-xs text-brand-silver font-bold uppercase tracking-wider">Pickup Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-brand-yellow pointer-events-none" />
                      <input
                        type="date"
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`w-full bg-brand-charcoal text-white rounded-xl py-3 pl-11 pr-4 text-sm font-semibold border ${errors.date ? 'border-red-500' : 'border-white/5'} focus:border-brand-yellow focus:outline-none transition-colors`}
                      />
                    </div>
                    {errors.date && (
                      <span className="text-[10px] text-red-500 font-bold flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.date}
                      </span>
                    )}
                  </div>

                  {/* Time selection */}
                  <div className="flex flex-col space-y-1.5 text-left relative">
                    <label className="text-xs text-brand-silver font-bold uppercase tracking-wider">Pickup Time</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-3.5 w-4 h-4 text-brand-yellow pointer-events-none" />
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className={`w-full bg-brand-charcoal text-white rounded-xl py-3 pl-11 pr-4 text-sm font-semibold border ${errors.time ? 'border-red-500' : 'border-white/5'} focus:border-brand-yellow focus:outline-none transition-colors`}
                      />
                    </div>
                    {errors.time && (
                      <span className="text-[10px] text-red-500 font-bold flex items-center mt-1">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.time}
                      </span>
                    )}
                  </div>

                  {/* Vehicle Class Choice */}
                  <div className="flex flex-col space-y-1.5 text-left sm:col-span-2">
                    <label className="text-xs text-brand-silver font-bold uppercase tracking-wider">Choose Fleet Class</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { val: 'hatchback', label: 'Hatchback', details: '₹20-25/km' },
                        { val: 'sedan', label: 'Sedan', details: '₹22-27/km' },
                        { val: 'suv', label: 'SUV', details: '₹26-32/km' },
                        { val: 'innova', label: 'Innova', details: '₹30-35/km' },
                        { val: 'tempo', label: 'Tempo', details: '₹38-45/km' }
                      ].map((item) => (
                        <label
                          key={item.val}
                          className={`py-2 px-1 rounded-xl border text-center font-bold cursor-pointer flex flex-col justify-center items-center transition-all ${
                            formData.vehicle === item.val
                              ? 'bg-brand-yellow/15 border-brand-yellow text-amber-800 dark:text-brand-yellow shadow-inner'
                              : 'bg-slate-100 dark:bg-brand-charcoal border-slate-200/50 dark:border-white/5 text-slate-700 dark:text-brand-silver hover:bg-slate-200/80 dark:hover:bg-white/5'
                          }`}
                        >
                          <input
                            type="radio"
                            name="vehicle"
                            value={item.val}
                            checked={formData.vehicle === item.val}
                            onChange={() => setFormData({ ...formData, vehicle: item.val })}
                            className="hidden"
                          />
                          <span className="text-[11px] font-black line-clamp-1">{item.label}</span>
                          <span className="text-[9px] text-brand-gray font-semibold line-clamp-1 mt-0.5">{item.details}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* A/C Service Choice */}
                  <div className="flex flex-col space-y-1.5 text-left sm:col-span-2">
                    <label className="text-xs text-brand-silver font-bold uppercase tracking-wider">Service Class</label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { val: 'ac', label: 'Air Conditioned (A/C)' },
                        { val: 'non-ac', label: 'Non-A/C Service' }
                      ].map((item) => (
                        <label
                          key={item.val}
                          className={`py-3 px-4 rounded-xl border text-center font-bold text-xs cursor-pointer flex justify-center items-center space-x-2 transition-all ${
                            formData.ac_service === item.val
                              ? 'bg-brand-yellow/15 border-brand-yellow text-amber-800 dark:text-brand-yellow'
                              : 'bg-slate-100 dark:bg-brand-charcoal border-slate-200/50 dark:border-white/5 text-slate-700 dark:text-brand-silver hover:bg-slate-200/80 dark:hover:bg-white/5'
                          }`}
                        >
                          <input
                            type="radio"
                            name="ac_service"
                            value={item.val}
                            checked={formData.ac_service === item.val}
                            onChange={() => setFormData({ ...formData, ac_service: item.val })}
                            className="hidden"
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col space-y-1.5 text-left sm:col-span-2">
                    <label className="text-xs text-brand-silver font-bold uppercase tracking-wider">Additional Message (Optional)</label>
                    <textarea
                      id="booking-message"
                      rows="3"
                      placeholder="List any extra requirements (e.g. infant baby seat, flight arrival details, extra stop at Electronic City)"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-brand-charcoal text-white rounded-xl py-3 px-4 text-sm font-semibold border border-white/5 focus:border-brand-yellow focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center space-x-2 py-4 rounded-2xl bg-gradient-to-r from-brand-yellow to-brand-gold text-brand-black font-extrabold text-base tracking-wide shadow-[0_0_20px_rgba(255,212,59,0.2)] hover:shadow-[0_0_30px_rgba(255,212,59,0.4)] disabled:opacity-50 transition-all duration-300 cursor-pointer"
                    >
                      <Sparkles className="w-5 h-5 animate-pulse" />
                      <span>{isSubmitting ? 'Securing Driver Slots...' : 'Submit Booking Request'}</span>
                    </button>
                  </div>

                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 flex items-center justify-center text-brand-emerald shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white">Booking Request Received!</h3>
                    <p className="text-sm text-brand-gray/95 font-medium max-w-md">
                      Thank you for choosing YUVII CABS. Your taxi slot request has been logged persistently in our dispatch queue. Our booking coordinator will phone you at <strong className="text-brand-yellow font-bold">your contact number</strong> within 5 minutes to confirm vehicle assignment.
                    </p>
                  </div>

                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-brand-charcoal text-brand-yellow border border-brand-yellow/20 hover:bg-white/5 font-bold text-xs tracking-wide transition-colors cursor-pointer"
                  >
                    Book Another Ride
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Right Side Column: Embedded Maps & Call info */}
        <div className="lg:col-span-5 flex flex-col space-y-8 text-left">
          
          <div className="flex flex-col space-y-4">
            <span className="text-xs text-brand-yellow font-extrabold tracking-widest uppercase">Hub Headquarters</span>
            <h3 className="text-2xl font-bold text-white tracking-tight">Direct Dispatch Desks</h3>
            <p className="text-xs text-brand-gray/95 font-semibold leading-relaxed">
              Prefer instant bookings? Bypass the form and dial our priority dispatch desk directly or drop us a WhatsApp message to book with a human coordinator instantly.
            </p>
          </div>

          {/* Quick CTA panel */}
          <div className="flex flex-col space-y-3">
            {/* Call */}
            <a
              href="tel:+918792273625"
              className="glass-card p-5 rounded-2xl border border-white/5 flex items-center space-x-4 group hover:border-brand-yellow/20 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-brand-yellow/5 border border-brand-yellow/10 text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-black transition-all duration-300">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-brand-gray uppercase font-extrabold tracking-wider">Priority Call Desk</span>
                <span className="text-lg font-black text-white group-hover:text-brand-yellow transition-colors duration-300">+91 87922 73625</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/918792273625?text=Hello! I need to book a cab in Hosur."
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 rounded-2xl border border-white/5 flex items-center space-x-4 group hover:border-brand-emerald/20 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-brand-emerald/5 border border-brand-emerald/10 text-brand-emerald group-hover:bg-brand-emerald group-hover:text-white transition-all duration-300">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-brand-gray uppercase font-extrabold tracking-wider">WhatsApp Dispatcher</span>
                <span className="text-lg font-black text-white group-hover:text-brand-emerald transition-colors duration-300">+91 87922 73625</span>
              </div>
            </a>
          </div>

          {/* Styled Premium Dark Google Map Embed of Hosur City */}
          <div className="glass-card p-2 rounded-3xl border border-white/5 relative overflow-hidden h-72 shadow-2xl group">
            <iframe
              title="YUVII CABS Hosur Hub Map"
              src="https://maps.google.com/maps?q=Railway%20Station%20Road,%20Hamman%20Nagar,%20Hosur,%20Tamil%20Nadu%20635109&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full rounded-2xl filter invert-[90%] hue-rotate-[180deg] contrast-[100%] border-0 opacity-80"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map link overlay */}
            <a 
              href="https://maps.app.goo.gl/gHwiq68N6k8QekBt8"
              target="_blank"
              rel="noopener noreferrer"
              className="map-overlay-button absolute bottom-4 right-4 z-30 inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl font-bold text-[11px] shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all cursor-pointer pointer-events-auto hover:scale-105 active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
