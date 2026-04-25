'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { useCart } from '@/lib/useCart';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietary: string[];
  popular?: boolean;
  chefSpecial?: boolean;
}

interface MenuGridProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
}

const MenuGrid: React.FC<MenuGridProps> = ({ items, onItemClick }) => {
  const { addItem } = useCart();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAddToCart = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
    >
      {items.map((item, index) => (
        <motion.div key={item.id} variants={itemVariant}>
          <Card
            onClick={() => onItemClick(item)}
            className="cursor-pointer overflow-hidden group relative h-full flex flex-col"
          >
            <div className="relative h-44 sm:h-48 overflow-hidden flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
                {item.popular && (
                  <span className="px-2 py-1 bg-secondary text-surface text-[10px] font-bold tracking-wider rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    POPULAR
                  </span>
                )}
                {item.chefSpecial && (
                  <span className="px-2 py-1 bg-amber-600 text-white text-[10px] font-bold tracking-wider rounded-full flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                    </svg>
                    CHEF&apos;S SPECIAL
                  </span>
                )}
              </div>
              
              <div className="absolute bottom-2 left-2 flex gap-1.5 flex-wrap max-w-[70%]">
                {item.dietary.slice(0, 2).map((diet) => (
                  <span 
                    key={diet} 
                    className="px-2 py-0.5 bg-white/90 backdrop-blur-sm text-surface text-[9px] font-medium rounded-full"
                  >
                    {diet}
                  </span>
                ))}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-base font-semibold text-secondary mb-1.5 group-hover:text-white transition-colors line-clamp-1">
                {item.name}
              </h3>
              <p className="text-xs text-on-surface-variant mb-4 line-clamp-2 leading-relaxed flex-1">
                {item.description}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <p className="text-lg text-secondary font-bold">${item.price}</p>
                <motion.button
                  onClick={(e) => handleAddToCart(e, item)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-md text-xs font-semibold tracking-wide transition-all ${
                    addedItem === item.id
                      ? 'bg-green-500 text-white'
                      : 'bg-secondary text-surface hover:brightness-110 hover:shadow-lg hover:shadow-secondary/30'
                  }`}
                >
                  {addedItem === item.id ? 'Added!' : 'Add'}
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MenuGrid;