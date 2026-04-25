'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  specialRequests: string;
  status: string;
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReservations = () => {
      const saved = localStorage.getItem('royal-ember-reservations');
      if (saved) {
        try {
          setReservations(JSON.parse(saved));
        } catch (error) {
          console.error('Failed to load reservations:', error);
        }
      }
      setIsLoading(false);
    };
    loadReservations();
  }, []);

  const updateStatus = (id: string, newStatus: string) => {
    const updated = reservations.map(r => 
      r.id === id ? { ...r, status: newStatus } : r
    );
    setReservations(updated);
    localStorage.setItem('royal-ember-reservations', JSON.stringify(updated));
  };

  if (isLoading) {
    return (
      <div className="p-4 md:p-8">
        <div className="animate-spin h-8 w-8 border-2 border-secondary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-section-title">Reservations</h1>
        <p className="text-body-md text-on-surface-variant">
          {reservations.length} total reservations
        </p>
      </div>

      <Card className="p-4 md:p-6">
        {reservations.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <p className="text-body-lg text-on-surface-variant mb-4">No reservations yet</p>
            <p className="text-body-md text-on-surface-variant">
              Reservations will appear here
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="border-b border-secondary/20">
                <tr>
                  <th className="px-2 md:px-4 py-3 text-label-caps">Guest</th>
                  <th className="px-2 md:px-4 py-3 text-label-caps hidden sm:table-cell">Date</th>
                  <th className="px-2 md:px-4 py-3 text-label-caps hidden sm:table-cell">Time</th>
                  <th className="px-2 md:px-4 py-3 text-label-caps">Guests</th>
                  <th className="px-2 md:px-4 py-3 text-label-caps hidden md:table-cell">Phone</th>
                  <th className="px-2 md:px-4 py-3 text-label-caps">Status</th>
                  <th className="px-2 md:px-4 py-3 text-label-caps">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr key={res.id} className="border-b border-surface-container/50">
                    <td className="px-2 md:px-4 py-3">
                      <p className="text-body-md font-headline-md text-secondary">{res.name}</p>
                      <p className="text-label-caps text-on-surface-variant hidden sm:block">{res.email}</p>
                    </td>
                    <td className="px-2 md:px-4 py-3 text-body-md hidden sm:table-cell">{res.date}</td>
                    <td className="px-2 md:px-4 py-3 text-body-md hidden sm:table-cell">{res.time}</td>
                    <td className="px-2 md:px-4 py-3 text-body-md">{res.guests}</td>
                    <td className="px-2 md:px-4 py-3 text-body-md text-on-surface-variant hidden md:table-cell">{res.phone}</td>
                    <td className="px-2 md:px-4 py-3">
                      <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-label-caps ${
                        res.status === 'confirmed' 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-surface-container text-on-surface-variant'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="px-2 md:px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateStatus(res.id, 'cancelled')}
                        disabled={res.status === 'cancelled'}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}