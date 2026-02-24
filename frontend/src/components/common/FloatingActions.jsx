import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppLink } from '../../utils/contactConfig';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [whatsappPulse, setWhatsappPulse] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setWhatsappPulse(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all"
            title="Back to top"
          >
            <span className="material-symbols-outlined text-xl">keyboard_arrow_up</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp floating button */}
      <a
        href={getWhatsAppLink("Hi! I'm interested in your luxury rugs.")}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group"
        title="Chat with us on WhatsApp"
      >
        {whatsappPulse && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        )}
        <div className="relative w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center text-white hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-2xl">chat</span>
        </div>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat with us
        </span>
      </a>
    </div>
  );
}
