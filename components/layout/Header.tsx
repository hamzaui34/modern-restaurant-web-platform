'use client';

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import Button from '../ui/Button';
import { useCart } from '@/lib/useCart';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, isLoaded } = useCart();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-xl border-b transition-all duration-300 ${
        scrolled 
          ? 'bg-surface/90 border-secondary/10 py-2' 
          : 'bg-transparent border-transparent py-4'
      }`}
    >
      <nav className="container-max px-margin-mobile md:px-margin-desktop flex items-center justify-between">
        <Link 
          href="/" 
          className="relative text-xl font-semibold text-secondary hover:text-white transition-colors tracking-tight group"
        >
          <span className="relative z-10">Royal Ember</span>
          <motion.span
            className="absolute inset-0 bg-secondary/20 blur-lg rounded-full"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { name: 'Menu', href: '/menu' },
            { name: 'Reservations', href: '/reservations' },
            { name: 'About', href: '/about' },
            { name: 'Contact', href: '/contact' },
          ].map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              className="relative text-xs uppercase tracking-widest text-on-surface/70 hover:text-secondary transition-colors group"
            >
              <span className="relative z-10">{item.name}</span>
              <motion.span
                className="absolute -bottom-1 left-0 h-px bg-secondary"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <motion.span
                className="absolute -bottom-1 left-0 w-2 h-px bg-secondary"
                initial={{ width: 0 }}
                whileHover={{ width: 8 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
              />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/cart" className="relative hidden sm:flex items-center gap-2 text-on-surface/70 hover:text-secondary transition-colors group">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </motion.div>
            <AnimatePresence>
              {isLoaded && itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-secondary text-surface text-[10px] font-bold rounded-full"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          
          <Link href="/staff/login">
            <Button variant="ghost" size="sm" className="hidden md:block text-xs uppercase tracking-wider">
              Staff
            </Button>
          </Link>

          <button
            className="md:hidden text-on-surface hover:text-secondary p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-secondary/10 bg-surface-container/95 backdrop-blur-lg"
          >
            <div className="container-max px-margin-mobile py-6 flex flex-col gap-4">
              {['Menu', 'Reservations', 'About', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  href={item === 'Reservations' ? '/reservations' : item === 'About' ? '/about' : `/${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base text-on-surface hover:text-secondary transition-colors py-2"
                >
                  {item}
                </Link>
              ))}
              <div className="border-t border-secondary/10 my-2" />
              <Link 
                href="/cart" 
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-base text-on-surface py-2"
              >
                <span>Cart</span>
                {isLoaded && itemCount > 0 && (
                  <span className="text-secondary">{itemCount} items</span>
                )}
              </Link>
              <Link href="/staff/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full mt-2">
                  Staff Login
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;