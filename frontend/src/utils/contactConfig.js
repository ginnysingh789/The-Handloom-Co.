const DEFAULTS = {
  whatsappNumber: '919999999999',
  contactEmail: 'info@workweavecarpet.com',
};

const STORAGE_KEY = 'wwc_contact_settings';

export function getContactSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...DEFAULTS, ...parsed };
    }
  } catch {
    // ignore parse errors
  }
  return { ...DEFAULTS };
}

export function saveContactSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch {
    return false;
  }
}

export function getWhatsAppLink(message = "Hi! I'm interested in your luxury rugs.") {
  const { whatsappNumber } = getContactSettings();
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function getContactEmail() {
  return getContactSettings().contactEmail;
}
