'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">
        <section className="hero-gradient relative h-[50vh] min-h-[350px] md:h-[60vh]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1920&h=1080&fit=crop"
              alt="Restaurant interior"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(ellipse 50% 50% at 50% 100%, rgba(233, 195, 73, 0.15) 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="container-max px-margin-mobile md:px-margin-desktop text-center">
              <p className="text-label-caps text-secondary mb-4">OUR STORY</p>
              <h1 className="text-hero text-white mb-4">A Legacy of Excellence</h1>
            </div>
          </div>
        </section>

        <section className="section relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#181818] to-[#131313]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptLTItNHYyaC0ydi0yaDJ6bTQtOGgydjJoLTJ2LTJ6bS04IDhoMnYyaC0ydi0yek0zMiAzNnYyaC0ydi0yaDJ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjMzLDE5NSw3MywwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />
          <div className="relative z-10 container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-label-caps text-secondary mb-4">ESTABLISHED 2018</p>
                <h2 className="text-section-title mb-6">Where Culinary Art Meets Timeless Elegance</h2>
                <div className="space-y-4 text-body-lg text-on-surface-variant">
                  <p>
                    Royal Ember was born from a passion for exceptional dining and a commitment to 
                    creating unforgettable experiences. What started as a vision to bring the elegance 
                    of world-class dining to our community has become a beloved destination for 
                    discerning palates across Khyber Pakhtunkhwa and beyond.
                  </p>
                  <p>
                    Every dish that leaves our kitchen tells a story of carefully sourced ingredients, 
                    time-honored techniques, and an unwavering dedication to perfection. Our team of 
                    expert chefs combines classical traditions with modern innovation, creating unique 
                    flavors that celebrate both local and international cuisine.
                  </p>
                  <p>
                    We believe that great dining is about more than just food—it's about creating 
                    moments that become cherished memories. From our carefully curated wine cellar 
                    to our handcrafted desserts, every detail is designed to delight.
                  </p>
                </div>
              </div>
              <div className="relative order-2 lg:order-1">
                <div className="aspect-[4/5] rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&h=1000&fit=crop"
                    alt="Chef preparing dish"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 w-32 md:w-48 rounded-lg overflow-hidden border-4 border-surface">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop"
                    alt="Gourmet dish"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#151518] via-[#1c1c20] to-[#151518]" />
          <motion.div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(233, 195, 73, 0.1) 0%, transparent 50%)',
            }}
          />
          <div className="relative z-10 container-max px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-label-caps text-secondary mb-4">OUR TEAM</p>
              <h2 className="text-section-title">Meet the Masters</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <Card className="p-4 md:p-6 text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&h=300&fit=crop"
                    alt="Executive Chef"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface mb-2">
                  Chef Hassan Khan
                </h3>
                <p className="text-label-caps text-secondary mb-4">EXECUTIVE CHEF</p>
                <p className="text-body-md text-on-surface-variant">
                  With over 20 years of experience in acclaimed kitchens across Dubai, 
                  London, and Karachi, Chef Hassan brings a world of flavors to Royal Ember.
                </p>
              </Card>
              <Card className="p-4 md:p-6 text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop"
                    alt="Sous Chef"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface mb-2">
                  Chef Aisha Rahman
                </h3>
                <p className="text-label-caps text-secondary mb-4">SOUS CHEF</p>
                <p className="text-body-md text-on-surface-variant">
                  A master of modern technique, Chef Aisha leads our pastry program 
                  and creates the stunning desserts that complete every meal.
                </p>
              </Card>
              <Card className="p-4 md:p-6 text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1566554273541-37a9ca75b3bd?w=300&h=300&fit=crop"
                    alt="Head Sommelier"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-headline-md font-headline-md text-on-surface mb-2">
                  Ali Syed
                </h3>
                <p className="text-label-caps text-secondary mb-4">HEAD SOMMELIER</p>
                <p className="text-body-md text-on-surface-variant">
                  Ali curates our premium wine collection, bringing rare vintages 
                  and perfect pairings to enhance every dining experience.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="section relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#181818] to-[#131313]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptLTItNHYyaC0ydi0yaDJ6bTQtOGgydjJoLTJ2LTJ6bS04IDhoMnYyaC0ydi0yek0zMiAzNnYyaC0ydi0yaDJ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjMzLDE5NSw3MywwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5" />
          <div className="relative z-10 container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=500&fit=crop"
                    alt="Our dining room"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <p className="text-label-caps text-secondary mb-4">THE EXPERIENCE</p>
                <h2 className="text-section-title mb-4 md:mb-6">An Unforgettable Evening Awaits</h2>
                <div className="space-y-3 md:space-y-4 text-body-md md:text-body-lg text-on-surface-variant">
                  <p>
                    Our restaurant seamlessly blends sophisticated elegance with warm hospitality. 
                    From the moment you step through our doors, you&apos;ll be transported to a 
                    world of refined dining.
                  </p>
                  <p>
                    The ambiance strikes the perfect balance—intimate enough for romantic 
                    dinners, yet lively enough for celebrations. Whether you&apos;re joining us 
                    for a special occasion or simply savoring a quiet evening, every moment 
                    at Royal Ember is designed to be memorable.
                  </p>
                  <p>
                    We invite you to experience the art of fine dining. Reserve your table today 
                    and let us create an evening you&apos;ll treasure forever.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}