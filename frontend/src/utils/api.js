import { getContactSettings } from './contactConfig';

const API_BASE = '/api';

function getAuthToken() {
  return sessionStorage.getItem('admin_token');
}

async function fetchApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`API call failed for ${endpoint}:`, err.message);
    return null;
  }
}

export const api = {
  // Products
  getProducts: (params = '') => fetchApi(`/products${params ? '?' + params : ''}`),
  searchProducts: (query) => fetchApi(`/products?search=${encodeURIComponent(query)}`),
  getProductBySlug: (slug) => fetchApi(`/products/slug/${slug}`),
  getProductById: (id) => fetchApi(`/products/${id}`),
  createProduct: (data) => fetchApi('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
    body: JSON.stringify(data),
  }),
  deleteProduct: (id) => fetchApi(`/products/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
  }),

  // Collections
  getCollections: () => fetchApi('/collections'),

  // Cart
  getCart: (sessionId) => fetchApi(`/cart/${sessionId}`),
  addToCart: (sessionId, item) =>
    fetchApi(`/cart/${sessionId}/items`, {
      method: 'POST',
      body: JSON.stringify(item)
    }),
  updateCartItem: (sessionId, itemId, quantity) =>
    fetchApi(`/cart/${sessionId}/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    }),
  removeCartItem: (sessionId, itemId) =>
    fetchApi(`/cart/${sessionId}/items/${itemId}`, { method: 'DELETE' }),
  clearCart: (sessionId) => fetchApi(`/cart/${sessionId}`, { method: 'DELETE' }),

  // Addons
  getAddons: () => fetchApi('/addons'),

  // Upload (Cloudinary)
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API_BASE}/upload/image`, {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      if (!res.ok) throw new Error(`Upload error: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Image upload failed:', err.message);
      return null;
    }
  },
  uploadImages: async (files) => {
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append('images', f));
      const res = await fetch(`${API_BASE}/upload/images`, {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
      if (!res.ok) throw new Error(`Upload error: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Image upload failed:', err.message);
      return null;
    }
  },

  // Reviews
  getReviews: () => fetchApi('/reviews'),
  getAllReviews: () => fetchApi('/reviews/all', {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
  }),
  submitReview: (data) => fetchApi('/reviews', { method: 'POST', body: JSON.stringify(data) }),
  approveReview: (id) => fetchApi(`/reviews/${id}/approve`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
  }),
  rejectReview: (id) => fetchApi(`/reviews/${id}/reject`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
  }),
  deleteReview: (id) => fetchApi(`/reviews/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
  }),
};

export function getSessionId() {
  let sid = localStorage.getItem('rugs_session_id');
  if (!sid) {
    sid = 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('rugs_session_id', sid);
  }
  return sid;
}

export function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}

export function generateWhatsAppLink(product, variant, size) {
  const { whatsappNumber } = getContactSettings();
  const text = encodeURIComponent(
    `Hi! I'm interested in the ${product.name}\n` +
    `Color: ${variant?.color?.name || 'N/A'}\n` +
    `Size: ${size?.label || 'N/A'}\n` +
    `Price: ₹${size?.price?.toLocaleString('en-IN') || product.basePrice.toLocaleString('en-IN')}\n` +
    `SKU: ${product.sku}\n\n` +
    `Could you help me with more details?`
  );
  return `https://wa.me/${whatsappNumber}?text=${text}`;
}
