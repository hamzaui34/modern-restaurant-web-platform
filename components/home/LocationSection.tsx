'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

const LocationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={ref} className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#18181a] to-[#131313]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptLTItNHYyaC0ydi0yaDJ6bTQtOGgydjJoLTJ2LTJ6bS04IDhoMnYyaC0ydi0yek0zMiAzNnYyaC0ydi0yaDJ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjMzLDE5NSw3MywwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />
      
      <div className="relative z-10 container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-label-caps text-secondary mb-4">VISIT US</p>
            <h2 className="text-section-title mb-8">Find Us</h2>

            <div className="space-y-4 mb-8">
              <motion.div 
                className="glass-card p-5 hover:border-secondary/30 transition-colors"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <h3 className="text-label-caps text-secondary mb-2">ADDRESS</h3>
                <p className="text-body-md text-on-surface">Shahi Bala, Khyber Pakhtunkhwa, Pakistan</p>
              </motion.div>

              <motion.div 
                className="glass-card p-5 hover:border-secondary/30 transition-colors"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <h3 className="text-label-caps text-secondary mb-2">HOURS</h3>
                <div className="text-body-md text-on-surface space-y-1">
                  <p>Monday - Thursday: 12 PM - 11 PM</p>
                  <p>Friday - Saturday: 12 PM - 12 AM</p>
                  <p>Sunday: 12 PM - 10 PM</p>
                </div>
              </motion.div>

              <motion.div 
                className="glass-card p-5 hover:border-secondary/30 transition-colors"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <h3 className="text-label-caps text-secondary mb-2">CONTACT</h3>
                <p className="text-body-md text-on-surface">📞 03165774335</p>
                <p className="text-body-md text-on-surface">📧 hksilence11@gmail.com</p>
              </motion.div>
            </div>

            <Link href="/reservations">
              <Button variant="primary" size="lg">Reserve a Table</Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card h-96 overflow-hidden rounded-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108600.4340487131!2d72.5!3d34.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38fd78230c96bb4d%3A0x53c5e21d6a39c1c4!2sKhyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1646812345678!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;