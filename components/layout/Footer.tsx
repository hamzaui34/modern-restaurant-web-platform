import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-secondary/10 bg-surface-container/20 mt-20">
      <div className="container-max px-margin-mobile md:px-margin-desktop py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-headline-md font-headline-md text-secondary mb-4">Royal Ember</h3>
            <p className="text-body-md text-on-surface-variant">
              Premium fine dining experience with exceptional service and exquisite cuisine.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-label-caps text-on-surface mb-4">Navigation</h4>
            <div className="flex flex-col gap-2">
              <Link href="/menu" className="text-body-md text-on-surface-variant hover:text-secondary transition-colors">
                Menu
              </Link>
              <Link href="/reservations" className="text-body-md text-on-surface-variant hover:text-secondary transition-colors">
                Reservations
              </Link>
              <Link href="/cart" className="text-body-md text-on-surface-variant hover:text-secondary transition-colors">
                Order Online
              </Link>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-label-caps text-on-surface mb-4">Hours</h4>
            <div className="text-body-md text-on-surface-variant space-y-1">
              <p>Mon - Thu: 5 PM - 11 PM</p>
              <p>Fri - Sat: 5 PM - 12 AM</p>
              <p>Sunday: 5 PM - 10 PM</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-label-caps text-on-surface mb-4">Contact</h4>
            <div className="text-body-md text-on-surface-variant space-y-1">
              <p>📞 03165774335</p>
              <p>📧 hksilence11@gmail.com</p>
              <p>📍 Shahi Bala, Khyber Pakhtunkhwa, Pakistan</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-label-caps text-on-surface-variant">
            © {currentYear} Royal Ember. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-label-caps text-on-surface-variant hover:text-secondary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-label-caps text-on-surface-variant hover:text-secondary transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-label-caps text-on-surface-variant hover:text-secondary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
