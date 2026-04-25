'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ReservationsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    occasion: '',
    specialRequests: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    '9:00 PM', '9:30 PM', '10:00 PM'
  ];

  const occasions = [
    'Birthday', 'Anniversary', 'Business Dinner',
    'Date Night', 'Celebration', 'None'
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    const reservation = {
      ...formData,
      id: `RES-${Date.now().toString(36).toUpperCase()}`,
      status: 'confirmed',
    };

    const saved = JSON.parse(localStorage.getItem('royal-ember-reservations') || '[]');
    saved.push(reservation);
    localStorage.setItem('royal-ember-reservations', JSON.stringify(saved));

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        <section className="relative h-[45vh] min-h-[350px]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=1920&h=1080&fit=crop"
              alt="Elegant dining"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(ellipse 50% 50% at 50% 100%, rgba(255, 180, 80, 0.2) 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10 h-full flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="container-max px-margin-mobile md:px-margin-desktop text-center"
            >
              <p className="text-label-caps text-secondary mb-4">EXCEPTIONAL EXPERIENCES</p>
              <h1 className="text-hero text-white mb-4">Reserve Your Table</h1>
              <p className="text-body-lg text-white/80 max-w-xl mx-auto">
                Join us for an unforgettable evening of fine dining and exceptional service.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section -mt-12 relative z-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#12100a] via-[#1a160d] to-[#0f0d08]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptLTItNHYyaC0ydi0yaDJ6bTQtOGgydjJoLTJ2LTJ6bS04IDhoMnYyaC0ydi0yek0zMiAzNnYyaC0ydi0yaDJ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDE0MCw4MCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />
          <div className="relative z-10 container-max">
            <Card className="p-8 glass-card">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/20 flex items-center justify-center"
                    >
                      <svg
                        className="w-12 h-12 text-secondary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                    <h2 className="text-headline-md text-on-surface mb-3">
                      Reservation Confirmed
                    </h2>
                    <p className="text-body-lg text-on-surface-variant mb-2">
                      We look forward to welcoming you
                    </p>
                    <p className="text-secondary font-semibold mb-6">
                      {formData.date} at {formData.time} • {formData.guests} guests
                    </p>
                    <p className="text-sm text-on-surface-variant mb-8">
                      Confirmation sent to {formData.email}
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button variant="secondary" onClick={() => router.push('/')}>
                        Return Home
                      </Button>
                      <Button variant="primary" onClick={() => router.push('/menu')}>
                        View Menu
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                  >
                    <div className="lg:col-span-2">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="label-base">Name *</label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              className="input-base"
                              placeholder="Your name"
                            />
                            {errors.name && (
                              <p className="text-error text-xs mt-1">{errors.name}</p>
                            )}
                          </div>
                          <div>
                            <label className="label-base">Email *</label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              className="input-base"
                              placeholder="your@email.com"
                            />
                            {errors.email && (
                              <p className="text-error text-xs mt-1">{errors.email}</p>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="label-base">Phone *</label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              className="input-base"
                              placeholder="+92 316 5774335"
                            />
                            {errors.phone && (
                              <p className="text-error text-xs mt-1">{errors.phone}</p>
                            )}
                          </div>
                          <div>
                            <label className="label-base">Date *</label>
                            <input
                              type="date"
                              value={formData.date}
                              onChange={(e) =>
                                setFormData({ ...formData, date: e.target.value })
                              }
                              min={getToday()}
                              className="input-base"
                            />
                            {errors.date && (
                              <p className="text-error text-xs mt-1">{errors.date}</p>
                            )}
                          </div>
                          <div>
                            <label className="label-base">Guests</label>
                            <select
                              value={formData.guests}
                              onChange={(e) =>
                                setFormData({ ...formData, guests: e.target.value })
                              }
                              className="input-base"
                            >
                              {[1,2,3,4,5,6,7,8].map((n) => (
                                <option key={n} value={n}>
                                  {n} {n === 1 ? 'Guest' : 'Guests'}
                                </option>
                              ))}
                              <option value="9+">9+ Guests</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="label-base">Time *</label>
                          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                            {timeSlots.map((time) => (
                              <motion.button
                                key={time}
                                type="button"
                                onClick={() => setFormData({ ...formData, time })}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`py-3 px-2 rounded-lg border text-sm transition-all ${
                                  formData.time === time
                                    ? 'border-secondary bg-secondary/10 text-secondary'
                                    : 'border-secondary/20 hover:border-secondary/50'
                                }`}
                              >
                                {time}
                              </motion.button>
                            ))}
                          </div>
                          {errors.time && (
                            <p className="text-error text-xs mt-2">{errors.time}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="label-base">Occasion</label>
                            <select
                              value={formData.occasion}
                              onChange={(e) =>
                                setFormData({ ...formData, occasion: e.target.value })
                              }
                              className="input-base"
                            >
                              <option value="">Select occasion</option>
                              {occasions.map((occ) => (
                                <option key={occ} value={occ}>{occ}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="label-base">Special Requests</label>
                            <textarea
                              value={formData.specialRequests}
                              onChange={(e) =>
                                setFormData({ ...formData, specialRequests: e.target.value })
                              }
                              className="input-base min-h-[46px] resize-none"
                              placeholder="Dietary restrictions, etc."
                            />
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <Button type="submit" variant="primary" isLoading={isLoading} className="w-full md:w-auto py-3">
                            Confirm Reservation
                          </Button>
                        </motion.div>
                      </form>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-secondary mb-4">
                          Restaurant Hours
                        </h3>
                        <div className="space-y-2 text-sm text-on-surface-variant">
                          <div className="flex justify-between">
                            <span>Monday - Thursday</span>
                            <span>12:00 PM - 11:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Friday - Saturday</span>
                            <span>12:00 PM - 12:00 AM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday</span>
                            <span>12:00 PM - 10:00 PM</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-secondary/10">
                        <h3 className="text-lg font-semibold text-secondary mb-3">
                          Private Events
                        </h3>
                        <p className="text-sm text-on-surface-variant mb-4">
                          Our private dining room accommodates up to 20 guests.
                        </p>
                        <Button
                          variant="ghost"
                          onClick={() => router.push('/contact')}
                          className="w-full text-sm"
                        >
                          Inquire Now
                        </Button>
                      </div>

                      <div className="pt-4 border-t border-secondary/10">
                        <h3 className="text-lg font-semibold text-secondary mb-3">
                          Reservation Policy
                        </h3>
                        <ul className="space-y-2 text-sm text-on-surface-variant">
                          <li className="flex gap-2">
                            <span className="text-secondary">•</span>
                            <span>Reservations held for 15 min</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-secondary">•</span>
                            <span>Cancel within 24 hours</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-secondary">•</span>
                            <span>9+ guests, please call</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}