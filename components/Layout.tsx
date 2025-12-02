import React, { useState } from 'react';
import { Menu, X, Instagram, Facebook, Phone, MapPin } from 'lucide-react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: Page.HOME },
    { label: 'About', value: Page.ABOUT },
    { label: 'Services', value: Page.SERVICES },
    { label: 'Testimonials', value: Page.TESTIMONIALS },
    { label: 'Contact', value: Page.CONTACT },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-beige">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-brand-beige/95 backdrop-blur-sm border-b border-brand-gold/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <div 
                onClick={() => handleNavClick(Page.HOME)}
                className="flex flex-col cursor-pointer"
              >
                <span className="font-serif text-xl md:text-2xl font-bold text-brand-brown tracking-wide">
                  Ankur Tripathi
                </span>
                <span className="text-xs md:text-sm text-brand-brownLight tracking-[0.2em] uppercase">
                  Astrology
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`font-sans text-sm tracking-wide uppercase transition-colors duration-300 ${
                    currentPage === item.value
                      ? 'text-brand-brown font-bold border-b-2 border-brand-gold'
                      : 'text-brand-brownLight hover:text-brand-brown'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick(Page.BOOKING)}
                className="bg-brand-brown text-brand-gold px-6 py-2 rounded-full font-sans text-sm font-semibold uppercase tracking-wide hover:bg-brand-brownLight transition-all shadow-md hover:shadow-lg"
              >
                Book Now
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-brown hover:text-brand-brownLight p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-beige border-t border-brand-gold/20 animate-in slide-in-from-top-5 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`block w-full text-left px-3 py-4 text-base font-medium ${
                    currentPage === item.value
                      ? 'bg-brand-gold/20 text-brand-brown'
                      : 'text-brand-brownLight hover:bg-brand-gold/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick(Page.BOOKING)}
                className="w-full mt-4 bg-brand-brown text-brand-gold px-3 py-4 font-bold uppercase tracking-wide"
              >
                Book Consultation
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-brown text-brand-beige pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-brand-gold">Ankur Tripathi</h3>
              <p className="text-brand-beige/80 font-sans leading-relaxed mb-6">
                Bringing clarity, peace, and direction through honest, accurate, and compassionate astrology.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-brand-gold hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
                <a href="#" className="text-brand-gold hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
              </div>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3 font-sans text-brand-beige/80">
                <li><button onClick={() => handleNavClick(Page.SERVICES)} className="hover:text-brand-gold transition-colors">Services</button></li>
                <li><button onClick={() => handleNavClick(Page.ABOUT)} className="hover:text-brand-gold transition-colors">About Us</button></li>
                <li><button onClick={() => handleNavClick(Page.TESTIMONIALS)} className="hover:text-brand-gold transition-colors">Success Stories</button></li>
                <li><button onClick={() => handleNavClick(Page.BOOKING)} className="hover:text-brand-gold transition-colors">Book Consultation</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold mb-6 text-white">Contact</h4>
              <ul className="space-y-4 font-sans text-brand-beige/80">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-gold mt-1" />
                  <span>+91 99771 53576<br/>Available Mon-Sat, 10am - 7pm</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-gold mt-1" />
                  <span>Choubey Colony, Chhatarpur,<br/>Madhya Pradesh, 471001, India</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-brand-gold/20 mt-12 pt-8 text-center text-sm text-brand-beige/60 font-sans">
            <p>&copy; {new Date().getFullYear()} Ankur Tripathi Astrology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;