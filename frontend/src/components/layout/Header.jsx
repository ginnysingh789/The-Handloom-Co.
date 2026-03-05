import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import SearchOverlay from '../common/SearchOverlay';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Collections' },
    { to: '/customize', label: 'Customize' },
    { to: '/b2b', label: 'B2B' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background-light/95 backdrop-blur-md border-b border-solid border-[#e7f3eb]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <img src="/logo.png" alt="World Weave Carpets" className="h-11 w-11 sm:h-14 sm:w-14 object-contain" />
          <div className="flex flex-col">
            <h1 className="text-base sm:text-xl font-bold tracking-wider leading-none"><span className="text-[#C5A55A]">WORLD WEAVE</span></h1>
            <span className="text-[9px] sm:text-[11px] tracking-[0.25em] uppercase text-primary font-bold">CARPETS</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium hover:text-primary transition-colors duration-300 uppercase tracking-widest ${
                location.pathname === link.to ? 'text-primary' : 'text-[#0d1b12]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/journal"
            className={`text-sm font-medium hover:text-primary transition-colors duration-300 uppercase tracking-widest ${
              location.pathname === '/journal' ? 'text-primary' : 'text-[#0d1b12]'
            }`}
          >
            Journal
          </Link>
          <Link
            to="/about"
            className={`text-sm font-medium hover:text-primary transition-colors duration-300 uppercase tracking-widest ${
              location.pathname === '/about' ? 'text-primary' : 'text-[#0d1b12]'
            }`}
          >
            About
          </Link>
        </nav>

        {/* Utilities */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={() => setSearchOpen(true)} className="p-2 hover:bg-primary/10 rounded-full transition-colors text-slate-700">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button
            className="p-2 hover:bg-primary/10 rounded-full transition-colors text-slate-700 relative"
            onClick={() => setIsCartOpen(true)}
          >
            <span className="material-symbols-outlined">favorite</span>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 size-2 bg-primary rounded-full"
              />
            )}
          </button>
          <button
            className="lg:hidden p-2 hover:bg-primary/10 rounded-full transition-colors text-slate-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-[#e7f3eb]"
          >
            <nav className="px-6 py-4 flex flex-col gap-3 bg-white">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium tracking-widest uppercase py-2 ${
                    location.pathname === link.to ? 'text-primary' : 'text-[#0d1b12]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/journal"
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium tracking-widest uppercase py-2 ${
                  location.pathname === '/journal' ? 'text-primary' : 'text-[#0d1b12]'
                }`}
              >
                Journal
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium tracking-widest uppercase py-2 ${
                  location.pathname === '/about' ? 'text-primary' : 'text-[#0d1b12]'
                }`}
              >
                About
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
