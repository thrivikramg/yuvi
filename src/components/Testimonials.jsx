import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Ramesh Kumar',
      role: 'Project Manager, Electronic City Tech Corridor',
      review: 'I regularly book YUVII CABS for transfers from Hosur to Bengaluru Airport (BLR). They are extremely punctual, their pricing is transparent, and the clean interior of their sedans makes the ride very relaxing.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Priya Dharshini',
      role: 'Founder, Hosur Small Scale Industries',
      review: 'Corporate logistics requires extreme reliability. We trust YUVII CABS for all executive transport and client hospitality rides. Their professional driver behavior and clean billing have made them our default partner.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Anand Subramanian',
      role: 'Family Traveler, Hamman Nagar',
      review: 'Booked an Innova SUV for a 3-day round trip from Hosur to Ooty. The driver was very courteous, knew the hill station hairpin curves perfectly, and the rates were exactly as calculated. Excellent experience!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Sarah D Souza',
      role: 'IT Consultant, Mathigiri',
      review: 'As a solo female traveler, safety is my primary concern. YUVII CABS driver verification and real-time support make me feel completely safe even during late-night airport arrivals. Highly recommended for everyone in Hosur!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-brand-charcoal/30 dark-blue-section relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-[10%] right-[5%] w-80 h-80 rounded-full bg-brand-purple/5 glow-orb blur-[120px]" />
      <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-brand-yellow/5 glow-orb blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col space-y-4">
          <span className="text-xs text-brand-yellow font-extrabold tracking-widest uppercase">Client Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Loved By <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-gold text-glow-yellow">Thousand Riders</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-gray/90 leading-relaxed">
            Read stories of business executives, travelers, and local families in Hosur who ride with YUVII CABS daily.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="w-full max-w-5xl mx-auto">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              }
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="pb-16"
          >
            {reviews.map((rev, idx) => (
              <SwiperSlide key={idx} className="h-auto">
                <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/5 h-full flex flex-col justify-between text-left space-y-6 relative group">
                  {/* Quote Icon watermark */}
                  <Quote className="absolute top-6 right-8 w-10 h-10 text-brand-yellow/5 group-hover:text-brand-yellow/10 transition-colors pointer-events-none" />

                  {/* Rating Stars */}
                  <div className="flex space-x-1 text-brand-yellow">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-yellow" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm sm:text-base text-brand-silver leading-relaxed font-semibold">
                    "{rev.review}"
                  </p>

                  {/* Customer Info */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-white/5">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-12 h-12 rounded-full object-cover border border-brand-yellow/20"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-white group-hover:text-brand-yellow transition-colors duration-300">
                        {rev.name}
                      </span>
                      <span className="text-[10px] text-brand-gray uppercase font-extrabold tracking-wider mt-0.5">
                        {rev.role}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
