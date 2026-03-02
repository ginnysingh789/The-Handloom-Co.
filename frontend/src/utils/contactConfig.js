const DEFAULTS = {
  whatsappNumber: '919999999999',
  contactEmail: 'info@worldweavecarpets.com',
};

const CACHE_KEY = 'wwc_contact_cache';

// Cache settings locally for instant load, but always prefer API data
export function getCachedSettings() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) return { ...DEFAULTS, ...JSON.parse(cached) };
  } catch { /* ignore */ }
  return { ...DEFAULTS };
}

export function cacheSettings(settings) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(settings));
  } catch { /* ignore */ }
}

function sanitizePhone(num) {
  return (num || '').replace(/[^0-9]/g, '');
}

export function getWhatsAppLink(message = "Hi! I'm interested in your luxury rugs.") {
  const { whatsappNumber } = getCachedSettings();
  return `https://wa.me/${sanitizePhone(whatsappNumber)}?text=${encodeURIComponent(message)}`;
}

export function getContactEmail() {
  return getCachedSettings().contactEmail;
}
