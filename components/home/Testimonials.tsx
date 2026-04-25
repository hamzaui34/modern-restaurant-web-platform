'use client';

import { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef as useRefReact } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Khan',
    role: 'Food Blogger',
    text: 'Royal Ember sets the standard for fine dining in the region. The wagyu steak is absolutely exceptional—cooked to perfection with a richness that melts in your mouth.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Fatima Malik',
    role: 'Regular Guest',
    text: 'The ambiance and service are unmatched. Every visit feels special. The butter chicken is a must-try, and their dessert menu is absolutely divine!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Chef Omar',
    role: 'Executive Chef',
    text: 'True culinary artistry. The attention to detail in every dish is remarkable. A dining experience to remember—truly world-class.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Sarah Al-Farsi',
    role: 'VIP Member',
    text: 'I have dined at the finest restaurants across Dubai and London, but Royal Ember holds its own. The truffle risotto is simply extraordinary.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'James Mitchell',
    role: 'Business Executive',
    text: 'The perfect venue for important dinners. Impressive wine selection, impeccable service, and dishes that never disappoint.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRefReact(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section ref={ref} className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#151518] via-[#1c1c20] to-[#151518]" />
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 30% 50%, rgba(233, 195, 73, 0.1) 0%, transparent 50%)',
        }}
      />
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse 50% 30% at 70% 60%, rgba(233, 195, 73, 0.06) 0%, transparent 50%)',
        }}
      />
      
      <div className="relative z-10 container-max px-margin-mobile md:px-margin-desktop">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="text-label-caps text-secondary mb-4">WHAT GUESTS SAY</p>
          <h2 className="text-section-title">Testimonials</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="glass-card p-6 md:p-8 lg:p-12"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                  <motion.div 
                    className="flex-shrink-0"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-secondary/20"
                      loading="lazy"
                    />
                  </motion.div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i }}
                          className="text-secondary text-lg md:text-xl"
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>
                    <p className="text-body-md md:text-body-lg text-on-surface mb-4 md:mb-6 italic leading-relaxed">
                      &ldquo;{testimonials[currentIndex].text}&rdquo;
                    </p>
                    <div>
                      <p className="text-body-md font-semibold text-on-surface">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-label-caps text-secondary">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-3 md:gap-4 mt-6 md:mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-secondary/30 flex items-center justify-center text-secondary hover:bg-secondary hover:text-surface transition-colors"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`rounded-full transition-all ${
                      index === currentIndex 
                        ? 'w-6 md:w-8 h-2 bg-secondary' 
                        : 'w-2 h-2 bg-secondary/30 hover:bg-secondary/50'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-secondary/30 flex items-center justify-center text-secondary hover:bg-secondary hover:text-surface transition-colors"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;