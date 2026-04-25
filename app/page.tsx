import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import SignatureDishes from '@/components/home/SignatureDishes';
import Testimonials from '@/components/home/Testimonials';
import LocationSection from '@/components/home/LocationSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SignatureDishes />
        <Testimonials />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}
