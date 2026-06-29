import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { getCachedSettings, cacheSettings } from '../../utils/contactConfig';

export default function Footer() {
  const [settings, setSettings] = useState(getCachedSettings());

  useEffect(() => {
    api.getSettings().then((data) => {
      if (data && data.whatsappNumber) {
        setSettings(data);
        cacheSettings(data);
      }
    });
  }, []);

  const whatsappNumber = (settings.whatsappNumber || '').replace(/[^0-9]/g, '');
  const contactEmail = settings.contactEmail || '';

  return (
    <footer className="bg-[#051109] text-white pt-12 sm:pt-20 pb-8 sm:pb-10 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-16">
          {/* Brand */}
          <div className="space-y-4 sm:space-y-6 col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="World Weave Carpets" className="h-11 w-11 sm:h-14 sm:w-14 object-contain" />
              <div className="flex flex-col">
                <h2 className="text-lg font-bold tracking-wider leading-none"><span className="text-[#C5A55A]">WORLD WEAVE</span></h2>
                <span className="text-[10px] tracking-[0.25em] uppercase text-primary font-bold">CARPETS</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Crafting the finest hand-knotted rugs for the world's most beautiful homes.
            </p>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/90">About Us</h4>
            <ul className="space-y-3.5 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Customer Reviews</Link></li>
              <li><Link to="/journal" className="hover:text-primary transition-colors">Journal</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/90">Services</h4>
            <ul className="space-y-3.5 text-sm text-white/60">
              <li><Link to="/" className="hover:text-primary transition-colors">Collections</Link></li>
              <li><Link to="/customize" className="hover:text-primary transition-colors">Customize Your Rug</Link></li>
              <li><Link to="/b2b" className="hover:text-primary transition-colors">B2B Program</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/90">Contact Us</h4>
            <ul className="space-y-3.5 text-sm text-white/60">
              <li>
                <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi! I'm visiting your website and would love to know more about your handcrafted rugs and carpets. Could you help me?")}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">chat</span>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${contactEmail}?subject=${encodeURIComponent('Inquiry - World Weave Carpets')}&body=${encodeURIComponent('Hello World Weave Carpets Team,\n\nI am interested in learning more about your handcrafted rugs and carpets.\n\nPlease share details about:\n- Available collections\n- Pricing & customization options\n- Delivery timeline\n\nLooking forward to hearing from you.\n\nThank you.')}`} className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">mail</span>
                  {contactEmail}
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/worldweavecarpets/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/90">Quick Access</h4>
            <ul className="space-y-3.5 text-sm text-white/60">
              <li>
                <Link to="/admin" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} World Weave Carpets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
