import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Phone, MessageSquare, Trash2, CheckCircle2, XCircle, ArrowLeft, Eye, RefreshCw, KeyRound, Search, Filter, ShieldAlert, LogOut, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard({ onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  
  const [bookings, setBookings] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState(null); // YYYY-MM-DD
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Custom Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Load bookings from localStorage
  const loadBookings = () => {
    try {
      const data = localStorage.getItem('yuviicabs_bookings');
      if (data) {
        setBookings(JSON.parse(data));
      } else {
        // Mock seed data if empty, so the admin has something beautiful to look at initially
        const mockData = [
          {
            id: 'BK-789421',
            name: 'Ramesh Kumar',
            phone: '9876543210',
            pickup: 'Hamman Nagar, Hosur',
            drop: 'Bengaluru Airport Terminal 2',
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
            time: '04:30',
            vehicle: 'sedan',
            message: 'Need child car seat. Flight departure is at 8:30 AM.',
            status: 'Confirmed',
            timestamp: new Date().toISOString()
          },
          {
            id: 'BK-154823',
            name: 'Priya Dharshini',
            phone: '9488412345',
            pickup: 'SIPCOT Phase 2, Hosur',
            drop: 'Electronic City, Bangalore',
            date: new Date().toISOString().split('T')[0], // Today
            time: '09:00',
            vehicle: 'suv',
            message: 'Corporate trip for foreign delegates. Need a highly clean vehicle.',
            status: 'Pending',
            timestamp: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: 'BK-482159',
            name: 'Anand Subramanian',
            phone: '9600930886',
            pickup: 'Railway Station Road, Hosur',
            drop: 'Salem Old Bus Stand',
            date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
            time: '14:00',
            vehicle: 'hatchback',
            message: 'Round trip request. Return on Sunday evening.',
            status: 'Completed',
            timestamp: new Date(Date.now() - 172800000).toISOString()
          }
        ];
        localStorage.setItem('yuviicabs_bookings', JSON.stringify(mockData));
        setBookings(mockData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadBookings();
    
    // Listen to form submit events to auto-refresh database
    const handleRefresh = () => {
      loadBookings();
    };
    window.addEventListener('yuviicabs_booking_submitted', handleRefresh);
    return () => window.removeEventListener('yuviicabs_booking_submitted', handleRefresh);
  }, []);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === '2026') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin('');
      setTimeout(() => setPinError(false), 800);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
    setBookings(updated);
    localStorage.setItem('yuviicabs_bookings', JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete Booking ${id}?`)) {
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
      localStorage.setItem('yuviicabs_bookings', JSON.stringify(updated));
    }
  };

  const handlePurge = () => {
    if (window.confirm('WARNING: Are you sure you want to purge all bookings? This cannot be undone.')) {
      localStorage.setItem('yuviicabs_bookings', JSON.stringify([]));
      setBookings([]);
      setSelectedDateFilter(null);
    }
  };

  // Stats computation
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'Pending').length,
    confirmed: bookings.filter((b) => b.status === 'Confirmed').length,
    completed: bookings.filter((b) => b.status === 'Completed').length,
    cancelled: bookings.filter((b) => b.status === 'Cancelled').length
  };

  // Calendar calculations
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  const handleMonthChange = (direction) => {
    const nextDate = new Date(currentDate);
    nextDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(nextDate);
  };

  const days = getDaysInMonth(currentDate);
  const startDayOffset = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // Filters application
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.drop.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' ? true : b.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesDate = selectedDateFilter ? b.date === selectedDateFilter : true;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Check if a day has bookings
  const hasBookingsOnDate = (dateStr) => {
    return bookings.some((b) => b.date === dateStr);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-brand-blue/15 text-brand-blue border-brand-blue/30';
      case 'Completed':
        return 'bg-brand-emerald/15 text-brand-emerald border-brand-emerald/30';
      case 'Cancelled':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      default:
        return 'bg-brand-yellow/15 text-brand-yellow border-brand-yellow/30';
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-brand-black z-[9999] overflow-y-auto font-sans">
      
      {/* 1. SECURE PIN ENTER GATEWAY */}
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="lockscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center bg-gradient-mesh px-6"
          >
            <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-brand-yellow/5 glow-orb blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-brand-purple/5 glow-orb blur-[120px]" />

            <div className="w-full max-w-md glass-card gold-gradient-border p-8 rounded-3xl border border-white/5 text-center flex flex-col items-center space-y-6 shadow-2xl relative z-10">
              
              <div className="w-16 h-16 rounded-full bg-brand-yellow/5 border border-brand-yellow/20 flex items-center justify-center text-brand-yellow shadow-[0_0_20px_rgba(255,212,59,0.1)]">
                <KeyRound className="w-6 h-6 animate-pulse" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-2xl font-black text-brand-white tracking-tight">Admin Operations Gate</h2>
                <p className="text-xs text-brand-gray/95 font-semibold leading-relaxed">
                  Authentication is required to access the dispatch logs. Enter your administrative passcode.
                </p>
              </div>

              <form onSubmit={handlePinSubmit} className="w-full flex flex-col items-center space-y-4">
                <motion.div
                  animate={pinError ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <input
                    type="password"
                    maxLength={6}
                    placeholder="Enter Security PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className={`w-full tracking-[1.5em] text-center bg-brand-charcoal text-brand-white rounded-2xl py-4 text-xl font-black border focus:outline-none transition-colors ${
                      pinError ? 'border-red-500 text-red-500' : 'border-white/5 focus:border-brand-yellow'
                    }`}
                  />
                </motion.div>

                {pinError && (
                  <span className="text-xs text-red-500 font-extrabold flex items-center">
                    <ShieldAlert className="w-3.5 h-3.5 mr-1" /> Access Denied. Invalid PIN.
                  </span>
                )}

                <div className="grid grid-cols-2 gap-3 w-full pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center justify-center space-x-1.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-brand-silver font-bold text-xs tracking-wide cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Site</span>
                  </button>

                  <button
                    type="submit"
                    className="py-3 rounded-xl bg-brand-yellow hover:bg-brand-gold text-brand-black font-extrabold text-xs tracking-wide cursor-pointer shadow-[0_0_15px_rgba(255,212,59,0.2)] transition-colors"
                  >
                    Authorize Access
                  </button>
                </div>
              </form>

              <span className="text-[10px] text-brand-gray font-medium pt-2">
                System Time: 2026. Security Standard: v4.0.0
              </span>

            </div>
          </motion.div>
        ) : (
          
          /* 2. MAIN ADMIN DASHBOARD DECK */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen bg-brand-black p-6 sm:p-8"
          >
            
            {/* Top Navigation Bar */}
            <div className="max-w-7xl mx-auto flex items-center justify-between pb-6 mb-6 border-b border-white/5">
              <div className="flex items-center space-x-3 text-left">
                <span className="text-xl font-black text-brand-white tracking-tighter">
                  YUVII<span className="text-brand-yellow text-glow-yellow">CABS</span>
                </span>
                <span className="text-[10px] font-black uppercase bg-brand-yellow/10 text-brand-yellow px-2 py-0.5 border border-brand-yellow/20 rounded">
                  Dispatch Deck
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/5 hover:border-red-500/20 text-brand-silver font-bold text-xs tracking-wider transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
                
                <button
                  onClick={onClose}
                  className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-brand-yellow text-brand-black font-extrabold text-xs tracking-wider shadow-[0_0_15px_rgba(255,212,59,0.15)] hover:bg-brand-gold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Exit Panel</span>
                </button>
              </div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: KPI Stats & Interactive Calendar */}
              <div className="lg:col-span-4 flex flex-col space-y-6">
                
                {/* Stats Widget */}
                <div className="glass-card p-6 rounded-3xl border border-white/5 grid grid-cols-2 gap-4">
                  <div className="col-span-2 text-left pb-2 border-b border-white/5">
                  <h3 className="text-sm font-bold text-brand-white uppercase tracking-wider">Metrics Snapshot</h3>
                  </div>

                  <div className="p-3 bg-brand-charcoal rounded-xl border border-white/5 text-left">
                    <span className="text-[10px] text-brand-gray font-bold uppercase">Total Bookings</span>
                    <span className="block text-2xl font-black text-brand-white mt-1">{stats.total}</span>
                  </div>

                  <div className="p-3 bg-brand-charcoal rounded-xl border border-white/5 text-left">
                    <span className="text-[10px] text-brand-yellow font-bold uppercase">Pending</span>
                    <span className="block text-2xl font-black text-brand-yellow mt-1">{stats.pending}</span>
                  </div>

                  <div className="p-3 bg-brand-charcoal rounded-xl border border-white/5 text-left">
                    <span className="text-[10px] text-brand-blue font-bold uppercase">Confirmed</span>
                    <span className="block text-2xl font-black text-brand-blue mt-1">{stats.confirmed}</span>
                  </div>

                  <div className="p-3 bg-brand-charcoal rounded-xl border border-white/5 text-left">
                    <span className="text-[10px] text-brand-emerald font-bold uppercase">Completed</span>
                    <span className="block text-2xl font-black text-brand-emerald mt-1">{stats.completed}</span>
                  </div>
                </div>

                {/* Custom Interactive Dark Calendar */}
                <div className="glass-card gold-gradient-border p-6 rounded-3xl border border-white/5 flex flex-col text-left">
                  
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-brand-yellow" />
                      <h4 className="text-sm font-extrabold text-brand-white uppercase tracking-wider">
                        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </h4>
                    </div>
                    
                    <div className="flex space-x-1.5">
                      <button
                        onClick={() => handleMonthChange(-1)}
                        className="p-1.5 bg-brand-charcoal hover:bg-white/5 rounded-lg border border-white/5 text-brand-silver hover:text-brand-yellow cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMonthChange(1)}
                        className="p-1.5 bg-brand-charcoal hover:bg-white/5 rounded-lg border border-white/5 text-brand-silver hover:text-brand-yellow cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-brand-gray mb-2">
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5">
                    {/* Start Offset spaces */}
                    {Array.from({ length: startDayOffset }).map((_, i) => (
                      <div key={`offset-${i}`} className="aspect-square" />
                    ))}

                    {/* Active Month Days */}
                    {days.map((day) => {
                      const dayStr = day.toISOString().split('T')[0];
                      const isSelected = selectedDateFilter === dayStr;
                      const hasLogs = hasBookingsOnDate(dayStr);
                      const isTodayDate = new Date().toISOString().split('T')[0] === dayStr;

                      return (
                        <button
                          key={dayStr}
                          onClick={() => setSelectedDateFilter(isSelected ? null : dayStr)}
                          className={`aspect-square rounded-lg flex flex-col justify-center items-center relative transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? 'bg-brand-yellow text-brand-black shadow-[0_0_10px_rgba(255,212,59,0.3)] font-black'
                              : isTodayDate
                              ? 'bg-brand-white/10 text-brand-white font-black border border-brand-white/15'
                              : 'bg-brand-charcoal/50 hover:bg-white/5 text-brand-silver border border-brand-white/5'
                          }`}
                        >
                          <span className="text-xs">{day.getDate()}</span>
                          {hasLogs && (
                            <span className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? 'bg-brand-black' : 'bg-brand-yellow animate-ping'}`} />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Date Filter info */}
                  {selectedDateFilter && (
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-brand-silver">
                      <span>Filtering: <strong className="text-brand-yellow">{selectedDateFilter}</strong></span>
                      <button
                        onClick={() => setSelectedDateFilter(null)}
                        className="text-brand-yellow hover:underline cursor-pointer flex items-center space-x-0.5"
                      >
                        <X className="w-3 h-3" />
                        <span>Clear Filter</span>
                      </button>
                    </div>
                  )}

                </div>

                {/* Bulk tools */}
                <div className="glass-card p-6 rounded-3xl border border-white/5 text-left flex flex-col space-y-4">
                  <h4 className="text-xs font-bold text-brand-white uppercase tracking-wider">Database Commands</h4>
                  <p className="text-[11px] text-brand-gray/90 leading-relaxed font-semibold">
                    Submit test bookings on the front contact form to see them update instantly. Clear database elements using the purge tool.
                  </p>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={loadBookings}
                      className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-brand-silver border border-white/5 text-xs font-bold transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reload Logs</span>
                    </button>
                    
                    <button
                      onClick={handlePurge}
                      className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-red-950/20 hover:bg-red-900/40 text-red-400 border border-red-500/20 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Purge Database</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Search bar, Filters & Bookings List */}
              <div className="lg:col-span-8 flex flex-col space-y-6 text-left">
                
                {/* Search & Filter bar row */}
                <div className="glass-card p-6 rounded-3xl border border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  {/* Search input */}
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-4 top-3.5 w-4 h-4 text-brand-gray" />
                    <input
                      type="text"
                      placeholder="Search name, phone, locations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-brand-charcoal text-brand-white rounded-xl py-3 pl-11 pr-4 text-xs font-semibold border border-white/5 focus:border-brand-yellow focus:outline-none"
                    />
                  </div>

                  {/* Status Dropdown filter */}
                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <Filter className="w-4 h-4 text-brand-yellow" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-brand-charcoal text-brand-white text-xs font-bold rounded-xl py-3 px-4 border border-white/5 focus:border-brand-yellow focus:outline-none cursor-pointer"
                    >
                      <option value="all">Filter Status: All</option>
                      <option value="pending">Pending Requests</option>
                      <option value="confirmed">Confirmed Trips</option>
                      <option value="completed">Completed Rides</option>
                      <option value="cancelled">Cancelled Bookings</option>
                    </select>
                  </div>
                </div>

                {/* Dynamic Booking Log Cards */}
                <div className="flex flex-col space-y-4">
                  
                  {filteredBookings.length === 0 ? (
                    <div className="glass-card p-12 rounded-3xl border border-white/5 text-center flex flex-col items-center space-y-4">
                      <ShieldAlert className="w-10 h-10 text-brand-yellow/30" />
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-brand-white">No Booking Logs Found</h4>
                        <p className="text-xs text-brand-gray/95 max-w-sm font-semibold">
                          No booking requests match your current search terms, status filters, or selected date limits.
                        </p>
                      </div>
                      
                      {(selectedDateFilter || searchQuery || statusFilter !== 'all') && (
                        <button
                          onClick={() => {
                            setSelectedDateFilter(null);
                            setSearchQuery('');
                            setStatusFilter('all');
                          }}
                          className="px-5 py-2 rounded-xl bg-brand-charcoal text-brand-yellow text-xs font-bold border border-brand-yellow/20 hover:border-brand-yellow/50 transition-colors"
                        >
                          Clear Active Filters
                        </button>
                      )}
                    </div>
                  ) : (
                    filteredBookings.map((b) => (
                      <motion.div
                        key={b.id}
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-6 rounded-3xl border border-white/5 flex flex-col space-y-4 relative overflow-hidden group hover:border-white/10 transition-colors"
                      >
                        {/* Top ID and Status Row */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-extrabold text-brand-yellow uppercase tracking-wider">{b.id}</span>
                            <span className="text-[10px] text-brand-gray font-semibold">
                              Submitted: {new Date(b.timestamp).toLocaleString()}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] text-brand-white bg-brand-white/5 border border-brand-white/10 px-2 py-0.5 rounded font-black uppercase">
                              {b.vehicle.toUpperCase()}
                            </span>
                            <span className={`text-[10px] font-black uppercase border px-2.5 py-0.5 rounded-full ${getStatusStyle(b.status)}`}>
                              {b.status}
                            </span>
                          </div>
                        </div>

                        {/* Customer Details & Trip description */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-brand-silver">
                          
                          {/* Left Grid: Client info */}
                          <div className="flex flex-col space-y-2">
                            <div>
                              <span className="text-[10px] text-brand-gray uppercase font-bold block mb-0.5">Passenger Name</span>
                              <span className="text-sm font-bold text-brand-white">{b.name}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-brand-gray uppercase font-bold block mb-0.5">Contact Line</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-bold text-brand-white">{b.phone}</span>
                                <a href={`tel:${b.phone}`} className="p-1 rounded bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20 hover:bg-brand-yellow hover:text-brand-black transition-colors" title="Call Customer">
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                                <a href={`https://wa.me/91${b.phone.replace(/[\s-+]/g, '').slice(-10)}?text=Hi%20${encodeURIComponent(b.name)},%20this%20is%20YUVII%20CABS%20confirming%20your%20booking%20${b.id}%20scheduled%20for%20${b.date}%20at%20${b.time}.`} target="_blank" rel="noopener noreferrer" className="p-1 rounded bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20 hover:bg-brand-emerald hover:text-white transition-colors" title="WhatsApp Customer">
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          </div>

                          {/* Right Grid: Locations & Timings */}
                          <div className="flex flex-col space-y-2">
                            <div>
                              <span className="text-[10px] text-brand-gray uppercase font-bold block mb-0.5">Pickup Location</span>
                              <span className="text-xs text-brand-white">{b.pickup}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-brand-gray uppercase font-bold block mb-0.5">Dropoff Destination</span>
                              <span className="text-xs text-brand-white">{b.drop}</span>
                            </div>
                          </div>

                          {/* Timings row */}
                          <div className="md:col-span-2 p-3 bg-brand-charcoal/50 rounded-xl border border-white/5 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className="text-[10px] text-brand-gray uppercase font-bold">Scheduled Travel:</span>
                              <span className="text-xs font-extrabold text-brand-white">{b.date} &nbsp;|&nbsp; {b.time}</span>
                            </div>
                            {b.message && (
                              <span className="text-[10px] text-brand-yellow max-w-xs truncate" title={b.message}>
                                Notes: {b.message}
                              </span>
                            )}
                          </div>

                        </div>

                        {/* Booking Commands Row */}
                        <div className="pt-3 border-t border-white/5 flex flex-wrap gap-2 items-center justify-between">
                          
                          {/* Left command: Delete */}
                          <button
                            onClick={() => handleDelete(b.id)}
                            className="p-2 bg-red-950/20 border border-red-500/20 text-red-400 hover:bg-red-500/15 hover:text-red-300 rounded-xl cursor-pointer transition-colors"
                            title="Delete Booking Request"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {/* Right commands: Status triggers */}
                          <div className="flex items-center space-x-2">
                            {b.status === 'Pending' && (
                              <button
                                onClick={() => handleStatusChange(b.id, 'Confirmed')}
                                className="flex items-center space-x-1 py-1.5 px-3 rounded-xl bg-brand-blue/15 hover:bg-brand-blue hover:text-brand-black text-brand-blue border border-brand-blue/20 hover:border-transparent text-xs font-bold transition-all cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Confirm Trip</span>
                              </button>
                            )}

                            {b.status === 'Confirmed' && (
                              <button
                                onClick={() => handleStatusChange(b.id, 'Completed')}
                                className="flex items-center space-x-1 py-1.5 px-3 rounded-xl bg-brand-emerald/15 hover:bg-brand-emerald hover:text-brand-black text-brand-emerald border border-brand-emerald/20 hover:border-transparent text-xs font-bold transition-all cursor-pointer"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Mark Completed</span>
                              </button>
                            )}

                            {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                              <button
                                onClick={() => handleStatusChange(b.id, 'Cancelled')}
                                className="flex items-center space-x-1 py-1.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/20 hover:border-transparent text-xs font-bold transition-all cursor-pointer"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Cancel Trip</span>
                              </button>
                            )}

                            {b.status === 'Cancelled' && (
                              <button
                                onClick={() => handleStatusChange(b.id, 'Pending')}
                                className="flex items-center space-x-1 py-1.5 px-3 rounded-xl bg-white/5 hover:bg-brand-yellow hover:text-brand-black text-brand-silver border border-white/5 hover:border-transparent text-xs font-bold transition-all cursor-pointer"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>Reset Pending</span>
                              </button>
                            )}
                          </div>

                        </div>

                      </motion.div>
                    ))
                  )}

                </div>

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
