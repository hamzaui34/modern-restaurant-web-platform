'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryFilter from '@/components/menu/CategoryFilter';
import MenuGrid from '@/components/menu/MenuGrid';

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

const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: '1',
    name: 'Dynamite Shrimp',
    description: 'Crispy jumbo shrimp tossed in spicy dynamite sauce with sesame seeds',
    price: 14,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&h=400&fit=crop',
    dietary: [],
    popular: true,
  },
  {
    id: '2',
    name: 'Garlic Bread',
    description: 'Toasted ciabatta with roasted garlic butter and fresh herbs',
    price: 8,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=600&h=400&fit=crop',
    dietary: ['Vegetarian'],
  },
  {
    id: '3',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with house-made Caesar dressing and parmesan',
    price: 12,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&h=400&fit=crop',
    dietary: [],
  },

  {
    id: '5',
    name: 'Bruschetta',
    description: 'Grilled bread topped with fresh tomatoes, basil, and balsamic glaze',
    price: 10,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&h=400&fit=crop',
    dietary: ['Vegetarian', 'Vegan'],
  },
  {
    id: '6',
    name: 'Soup of the Day',
    description: 'Chef seasonal soup served with artisan bread',
    price: 9,
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop',
    dietary: ['Vegetarian'],
  },


  // Main Courses
  {
    id: '8',
    name: 'Wagyu Steak',
    description: 'Premium A5 wagyu beef with truffle butter and seasonal vegetables',
    price: 68,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop',
    dietary: ['Gluten-Free'],
    popular: true,
    chefSpecial: true,
  },
  {
    id: '9',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon herb butter and wild rice',
    price: 32,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop',
    dietary: ['Gluten-Free'],
    popular: true,
  },
  {
    id: '10',
    name: 'Chicken Alfredo',
    description: 'Creamy alfredo sauce with grilled chicken and fettuccine',
    price: 22,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop',
    dietary: [],
  },

  {
    id: '12',
    name: 'Lamb Chops',
    description: 'New Zealand lamb chops with mint sauce and roasted potatoes',
    price: 38,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&h=400&fit=crop',
    dietary: ['Gluten-Free'],
  },
  {
    id: '13',
    name: 'Truffle Risotto',
    description: 'Creamy arborio rice with black truffle shavings and parmesan',
    price: 28,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop',
    dietary: ['Vegetarian', 'Gluten-Free'],
    chefSpecial: true,
  },
  {
    id: '14',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice with spiced chicken and raita',
    price: 20,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop',
    dietary: [],
  },
  {
    id: '15',
    name: 'Butter Chicken',
    description: 'Tender chicken in creamy tomato gravy with basmati rice and naan',
    price: 24,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=400&fit=crop',
    dietary: [],
    popular: true,
  },
  {
    id: '16',
    name: 'Grilled Sea Bass',
    description: 'Mediterranean sea bass with olive oil, lemon, and herbs',
    price: 34,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=400&fit=crop',
    dietary: ['Gluten-Free'],
  },
  {
    id: '17',
    name: 'Beef Tenderloin',
    description: '8oz prime beef tenderloin with peppercorn sauce and mashed potatoes',
    price: 42,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&h=400&fit=crop',
    dietary: ['Gluten-Free'],
    chefSpecial: true,
  },
  {
    id: '18',
    name: 'Vegetable Stir Fry',
    description: 'Fresh seasonal vegetables in garlic ginger sauce with steamed rice',
    price: 16,
    category: 'Main Courses',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop',
    dietary: ['Vegetarian', 'Vegan', 'Gluten-Free'],
  },

  // Desserts
  {
    id: '19',
    name: 'Chocolate Lava Cake',
    description: 'Warm dark chocolate cake with molten center and vanilla ice cream',
    price: 14,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&h=400&fit=crop',
    dietary: ['Vegetarian'],
    popular: true,
    chefSpecial: true,
  },
  {
    id: '20',
    name: 'Cheesecake',
    description: 'New York style cheesecake with berry compote and whipped cream',
    price: 12,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&h=400&fit=crop',
    dietary: ['Vegetarian'],
  },
  {
    id: '21',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone',
    price: 13,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop',
    dietary: ['Vegetarian'],
  },

  {
    id: '23',
    name: 'Ice Cream Platter',
    description: 'Three scoops of premium ice cream with chocolate sauce and almonds',
    price: 11,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&h=400&fit=crop',
    dietary: ['Vegetarian'],
  },
  {
    id: '24',
    name: 'Creme Brulee',
    description: 'Classic vanilla custard with caramelized sugar top',
    price: 12,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&h=400&fit=crop',
    dietary: ['Vegetarian', 'Gluten-Free'],
  },
  {
    id: '25',
    name: 'Mango Kulfi',
    description: 'Traditional Indian ice cream with Alphonso mango and pistachios',
    price: 9,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&h=400&fit=crop',
    dietary: ['Vegetarian', 'Gluten-Free'],
  },

  // Drinks
  {
    id: '26',
    name: 'Mojito',
    description: 'White rum, fresh mint, lime juice, and soda water',
    price: 12,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=400&fit=crop',
    dietary: ['Vegan', 'Gluten-Free'],
    popular: true,
  },

  {
    id: '28',
    name: 'Espresso',
    description: 'Rich and bold Italian espresso',
    price: 4,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&h=400&fit=crop',
    dietary: ['Vegan', 'Gluten-Free'],
  },

  {
    id: '32',
    name: 'Red Wine',
    description: 'Premium house red wine, ask server for todays selection',
    price: 10,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop',
    dietary: ['Vegan', 'Gluten-Free'],
  },
  {
    id: '33',
    name: 'Sparkling Water',
    description: 'Imported sparkling mineral water',
    price: 4,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=600&h=400&fit=crop',
    dietary: ['Vegan', 'Gluten-Free'],
  },
  {
    id: '34',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed seasonal oranges',
    price: 7,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&h=400&fit=crop',
    dietary: ['Vegan', 'Gluten-Free'],
  },
];

const CATEGORIES = ['All', 'Starters', 'Main Courses', 'Desserts', 'Drinks'];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems =
    activeCategory === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleMenuItemClick = (item: MenuItem) => {
    console.log('Clicked item:', item);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 md:py-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#181818] to-[#131313]" />
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(233, 195, 73, 0.15) 0%, transparent 60%)',
            }}
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptLTItNHYyaC0ydi0yaDJ6bTQtOGgydjJoLTJ2LTJ6bS04IDhoMnYyaC0ydi0yek0zMiAzNnYyaC0ydi0yaDJ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjMzLDE5NSw3MywwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />

          <div className="relative z-10 container-max px-margin-mobile md:px-margin-desktop text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-label-caps text-secondary mb-3 md:mb-4"
            >
              CULINARY EXCELLENCE
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-section-title mb-4 md:mb-6"
            >
              Our Menu
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-body-md md:text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed px-4"
            >
              Discover our carefully curated selection of dishes.
              <span className="hidden md:inline"> Chef specialties are marked with a crown icon. </span>
              Our most popular items are highlighted for you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 md:mt-8"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/10 rounded-full text-xs text-secondary">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                {MENU_ITEMS.filter(i => i.popular).length} Popular Items
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/10 rounded-full text-xs text-secondary">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {MENU_ITEMS.filter(i => i.chefSpecial).length} Chef Specials
              </span>
            </motion.div>
          </div>
        </motion.section>

        <section className="section relative pb-24 md:pb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#181818] to-[#131313]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptLTItNHYyaC0ydi0yaDJ6bTQtOGgydjJoLTJ2LTJ6bS04IDhoMnYyaC0ydi0yek0zMiAzNnYyaC0ydi0yaDJ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjMzLDE5NSw3MywwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />
          <div className="relative z-10 container-max">
            <div className="sticky top-16 md:top-20 z-30 bg-surface/95 backdrop-blur-xl py-3 -mx-margin-mobile md:-mx-margin-desktop px-margin-mobile md:px-margin-desktop -mt-4 md:mt-0 mb-6">
              <CategoryFilter
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <MenuGrid
                  items={filteredItems}
                  onItemClick={handleMenuItemClick}
                />
              </motion.div>
            </AnimatePresence>

            {filteredItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-on-surface-variant text-lg">No items found in this category.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}