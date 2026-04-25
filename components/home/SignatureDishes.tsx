'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const SignatureDishes = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

const dishes = [
    {
      id: 1,
      name: 'Wagyu Steak',
      description: 'A5 wagyu beef with truffle butter and seasonal vegetables',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop',
      badge: 'Chefs Choice',
    },
    {
      id: 2,
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with lemon herb butter',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop',
      badge: 'Daily Fresh',
    },
    {
      id: 3,
      name: 'Butter Chicken',
      description: 'Creamy tomato gravy with basmati rice and naan',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=400&fit=crop',
      badge: 'Signature',
    },
  ];

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section ref={ref} className="section relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#181818] to-[#131313]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptLTItNHYyaC0ydi0yaDJ6bTQtOGgydjJoLTJ2LTJ6bS04IDhoMnYyaC0ydi0yek0zMiAzNnYyaC0ydi0yaDJ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjMzLDE5NSw3MywwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />
      
      <div className="relative z-10 container-max px-margin-mobile md:px-margin-desktop">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-label-caps text-secondary mb-4">CULINARY EXCELLENCE</p>
          <h2 className="text-section-title mb-4">Signature Dishes</h2>
          <p className="text-body-md md:text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Handcrafted by our master chefs using the finest ingredients
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {dishes.map((dish) => (
            <motion.div
              key={dish.id}
              variants={item}
              className="glass-card group overflow-hidden cursor-pointer"
            >
              <div className="relative h-48 md:h-64 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <img 
                    src={dish.image} 
                    alt={dish.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <motion.div
                  className="absolute top-3 md:top-4 left-3 md:left-4 px-2 md:px-3 py-1 md:py-1.5 bg-secondary text-surface text-[10px] md:text-xs font-semibold tracking-wider rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  {dish.badge}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-headline-md font-headline-md text-secondary mb-2 group-hover:text-white transition-colors duration-300">
                  {dish.name}
                </h3>
                <p className="text-body-md text-on-surface-variant">{dish.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-8 md:mt-12"
        >
          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 md:px-8 py-2.5 md:py-3 bg-secondary text-surface font-medium rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-secondary/20 transition-all"
            >
              View Full Menu
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SignatureDishes;