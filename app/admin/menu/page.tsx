'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Seared Scallops', description: 'Delicate scallops with lemon beurre blanc', price: 24, category: 'Starters', available: true },
  { id: '2', name: 'Tuna Tartare', description: 'Fresh ahi tuna with avocado', price: 22, category: 'Starters', available: true },
  { id: '3', name: 'Wagyu Ribeye', description: 'Premium aged beef', price: 52, category: 'Main Courses', available: true },
  { id: '4', name: 'Pan-Seared Branzino', description: 'Mediterranean sea bass', price: 38, category: 'Main Courses', available: true },
  { id: '5', name: 'Chocolate Souffle', description: 'Rich dark chocolate', price: 16, category: 'Desserts', available: true },
  { id: '6', name: 'Citrus Panna Cotta', description: 'Silky panna cotta', price: 14, category: 'Desserts', available: true },
  { id: '7', name: 'Craft Old Fashioned', description: 'Bourbon, bitters', price: 14, category: 'Cocktails', available: true },
  { id: '8', name: 'Lavender Martini', description: 'Grey Goose vodka, lavender', price: 16, category: 'Cocktails', available: true },
];

export default function AdminMenuPage() {
  const [items, setItems] = useState(MENU_ITEMS);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Starters', 'Main Courses', 'Desserts', 'Cocktails'];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  const toggleAvailability = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-section-title">Menu Items</h1>
          <p className="text-body-md text-on-surface-variant mt-1">
            {items.length} total items
          </p>
        </div>
        <Button variant="primary" size="sm">
          Add Item
        </Button>
      </div>

      <div className="flex gap-2 md:gap-3 mb-4 md:mb-6 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm transition-all whitespace-nowrap ${
              activeCategory === category
                ? 'bg-secondary text-surface'
                : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <Card className="p-4 md:p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="border-b border-secondary/20">
              <tr>
                <th className="px-2 md:px-4 py-3 text-label-caps">Item</th>
                <th className="px-2 md:px-4 py-3 text-label-caps">Category</th>
                <th className="px-2 md:px-4 py-3 text-label-caps">Price</th>
                <th className="px-2 md:px-4 py-3 text-label-caps">Status</th>
                <th className="px-2 md:px-4 py-3 text-label-caps">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-surface-container/50">
                  <td className="px-2 md:px-4 py-3">
                    <p className="text-body-md font-medium text-secondary">{item.name}</p>
                    <p className="text-xs text-on-surface-variant">{item.description}</p>
                  </td>
                  <td className="px-2 md:px-4 py-3 text-body-md text-on-surface-variant">{item.category}</td>
                  <td className="px-2 md:px-4 py-3 text-body-md font-medium">${item.price}</td>
                  <td className="px-2 md:px-4 py-3">
                    <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                      item.available 
                        ? 'bg-green-900/30 text-green-400' 
                        : 'bg-red-900/30 text-red-400'
                    }`}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className="px-2 md:px-4 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleAvailability(item.id)}
                    >
                      {item.available ? 'Disable' : 'Enable'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}