import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, formatPrice } from '../utils/api';
import { staticProducts } from '../data/products';
import { getCachedSettings, cacheSettings } from '../utils/contactConfig';

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem('admin_token'));
  const [authChecking, setAuthChecking] = useState(true);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState('list'); // 'list' | 'add' | 'settings' | 'reviews'
  const [allReviews, setAllReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', role: '', text: '', rating: 5 });
  const [reviewSaving, setReviewSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null or product object

  // Contact settings state
  const [contactSettings, setContactSettings] = useState(getCachedSettings());
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: '',
    sku: '',
    shortDescription: '',
    longDescription: '',
    basePrice: '',
    originalPrice: '',
    category: '',
    collection: '',
    tags: '',
    material: '',
    weaveType: '',
    origin: '',
    deliveryTimeline: '5-7 business days',
    isFeatured: false,
    isNewArrival: false,
    isBestseller: false,
    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: '',
    imageUrl4: '',
    colorName: '',
    colorHex: '#000000',
    size1Label: '',
    size1Price: '',
    size1Stock: '',
    size2Label: '',
    size2Price: '',
    size2Stock: '',
    size3Label: '',
    size3Price: '',
    size3Stock: '',
    detailsProduct: '',
    detailsCare: '',
    detailsShipping: '',
    detailsDesign: '',
  });

  // Verify existing token on mount
  useEffect(() => {
    const token = sessionStorage.getItem('admin_token');
    if (!token) { setAuthChecking(false); return; }
    fetch('/api/admin/verify', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(() => { setIsAuthenticated(true); setAuthChecking(false); })
      .catch(() => { sessionStorage.removeItem('admin_token'); setIsAuthenticated(false); setAuthChecking(false); });
  }, []);

  // Helper to get auth headers
  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('admin_token')}`,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        sessionStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || 'Invalid username or password.');
      }
    } catch {
      setLoginError('Server unavailable. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_token');
  };

  const loadProducts = async () => {
    setLoading(true);
    const data = await api.getProducts();
    if (data && data.length > 0) {
      const dbSlugs = new Set(data.map(p => p.slug));
      const uniqueStatic = staticProducts.filter(p => !dbSlugs.has(p.slug));
      setProducts([...data, ...uniqueStatic]);
    } else {
      setProducts(staticProducts);
    }
    setLoading(false);
  };

  const loadReviews = async () => {
    setReviewsLoading(true);
    const data = await api.getAllReviews();
    if (data) setAllReviews(data);
    setReviewsLoading(false);
  };

  const handleApproveReview = async (id) => {
    await api.approveReview(id);
    loadReviews();
  };

  const handleRejectReview = async (id) => {
    await api.rejectReview(id);
    loadReviews();
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    await api.deleteReview(id);
    loadReviews();
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.text || !reviewForm.rating) {
      setError('Name, review text, and rating are required.');
      return;
    }
    setReviewSaving(true);
    const result = await api.adminCreateReview(reviewForm);
    setReviewSaving(false);
    if (result && result._id) {
      setSuccess(`Review by "${result.name}" added and approved!`);
      setReviewForm({ name: '', role: '', text: '', rating: 5 });
      loadReviews();
      setTimeout(() => setSuccess(''), 4000);
    } else {
      setError('Failed to add review.');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
      // Load settings from DB
      api.getSettings().then((data) => {
        if (data && data.whatsappNumber) {
          setContactSettings(data);
          cacheSettings(data);
        }
      });
    }
  }, [isAuthenticated]);

  const resetForm = () => {
    setForm({
      name: '', sku: '', shortDescription: '', longDescription: '',
      basePrice: '', originalPrice: '', category: '', collection: '',
      tags: '', material: '', weaveType: '', origin: '',
      deliveryTimeline: '5-7 business days',
      isFeatured: false, isNewArrival: false, isBestseller: false,
      imageUrl1: '', imageUrl2: '', imageUrl3: '', imageUrl4: '',
      colorName: '', colorHex: '#000000',
      size1Label: '', size1Price: '', size1Stock: '',
      size2Label: '', size2Price: '', size2Stock: '',
      size3Label: '', size3Price: '', size3Stock: '',
      detailsProduct: '', detailsCare: '', detailsShipping: '', detailsDesign: '',
    });
    setEditingProduct(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      const results = await api.uploadImages(files);
      if (results && results.length > 0) {
        const urls = results.map(r => r.url);
        setForm(prev => {
          const updated = { ...prev };
          let slot = 1;
          while (slot <= 4 && updated[`imageUrl${slot}`]) slot++;
          urls.forEach(url => {
            if (slot <= 4) {
              updated[`imageUrl${slot}`] = url;
              slot++;
            }
          });
          return updated;
        });
        setSuccess(`${urls.length} image(s) uploaded to Cloudinary!`);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Upload failed. Check Cloudinary credentials in backend .env');
      }
    } catch (err) {
      setError('Image upload failed: ' + err.message);
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.sku || !form.basePrice || !form.category) {
      setError('Name, SKU, Base Price, and Category are required.');
      return;
    }

    setSaving(true);

    const images = [form.imageUrl1, form.imageUrl2, form.imageUrl3, form.imageUrl4].filter(Boolean);

    const sizes = [];
    if (form.size1Label && form.size1Price) {
      sizes.push({ label: form.size1Label, price: Number(form.size1Price), stock: Number(form.size1Stock) || 0, readyToShip: true });
    }
    if (form.size2Label && form.size2Price) {
      sizes.push({ label: form.size2Label, price: Number(form.size2Price), stock: Number(form.size2Stock) || 0, readyToShip: true });
    }
    if (form.size3Label && form.size3Price) {
      sizes.push({ label: form.size3Label, price: Number(form.size3Price), stock: Number(form.size3Stock) || 0, readyToShip: true });
    }

    const productData = {
      name: form.name,
      slug: slugify(form.name),
      sku: form.sku,
      shortDescription: form.shortDescription,
      longDescription: form.longDescription,
      basePrice: Number(form.basePrice),
      originalPrice: Number(form.originalPrice) || Number(form.basePrice),
      category: form.category,
      collection: form.collection || form.category,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      material: form.material,
      weaveType: form.weaveType,
      origin: form.origin,
      deliveryTimeline: form.deliveryTimeline,
      isFeatured: form.isFeatured,
      isNewArrival: form.isNewArrival,
      isBestseller: form.isBestseller,
      images,
      variants: [{
        color: {
          name: form.colorName || 'Default',
          hex: form.colorHex || '#000000',
          images,
        },
        sizes: sizes.length > 0 ? sizes : [{ label: 'Standard', price: Number(form.basePrice), stock: 10, readyToShip: true }],
      }],
      details: {
        productDetails: form.detailsProduct,
        washingCare: form.detailsCare,
        shippingReturns: form.detailsShipping,
        aboutDesign: form.detailsDesign,
      },
    };

    let result;
    if (editingProduct && isDbProduct(editingProduct)) {
      result = await api.updateProduct(editingProduct._id, productData);
    } else {
      result = await api.createProduct(productData);
    }

    if (result && result._id) {
      setSuccess(editingProduct
        ? `"${result.name}" has been updated successfully!`
        : `"${result.name}" has been added successfully! It will now appear on the homepage.`
      );
      resetForm();
      loadProducts();
      setTab('list');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setSuccess(''), 6000);
    } else {
      setError(editingProduct ? 'Failed to update product.' : 'Failed to add product. Make sure the backend is running.');
    }

    setSaving(false);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const result = await api.deleteProduct(id);
    if (result) {
      setSuccess(`"${name}" deleted.`);
      loadProducts();
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Failed to delete. Make sure the backend is running.');
    }
  };

  const isDbProduct = (p) => p._id && /^[a-f0-9]{24}$/i.test(p._id);

  const handleEdit = (product) => {
    const v = product.variants?.[0];
    const sizes = v?.sizes || [];
    setForm({
      name: product.name || '',
      sku: product.sku || '',
      shortDescription: product.shortDescription || '',
      longDescription: product.longDescription || '',
      basePrice: product.basePrice || '',
      originalPrice: product.originalPrice || '',
      category: product.category || '',
      collection: product.collection || '',
      tags: (product.tags || []).join(', '),
      material: product.material || '',
      weaveType: product.weaveType || '',
      origin: product.origin || '',
      deliveryTimeline: product.deliveryTimeline || '5-7 business days',
      isFeatured: product.isFeatured || false,
      isNewArrival: product.isNewArrival || false,
      isBestseller: product.isBestseller || false,
      imageUrl1: product.images?.[0] || '',
      imageUrl2: product.images?.[1] || '',
      imageUrl3: product.images?.[2] || '',
      imageUrl4: product.images?.[3] || '',
      colorName: v?.color?.name || '',
      colorHex: v?.color?.hex || '#000000',
      size1Label: sizes[0]?.label || '', size1Price: sizes[0]?.price || '', size1Stock: sizes[0]?.stock || '',
      size2Label: sizes[1]?.label || '', size2Price: sizes[1]?.price || '', size2Stock: sizes[1]?.stock || '',
      size3Label: sizes[2]?.label || '', size3Price: sizes[2]?.price || '', size3Stock: sizes[2]?.stock || '',
      detailsProduct: product.details?.productDetails || '',
      detailsCare: product.details?.washingCare || '',
      detailsShipping: product.details?.shippingReturns || '',
      detailsDesign: product.details?.aboutDesign || '',
    });
    setEditingProduct(product);
    setTab('add');
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ===== LOGIN GATE =====
  if (!isAuthenticated) {
    return (
      <div className="bg-background-light min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-[#0A2E18] px-8 py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl text-primary">lock</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Admin Login</h1>
              <p className="text-gray-400 text-sm mt-1">Enter your credentials to continue</p>
            </div>
            <form onSubmit={handleLogin} className="px-8 py-8 space-y-5">
              {loginError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                  <span className="material-symbols-outlined text-lg">error</span>
                  {loginError}
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Username</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">person</span>
                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    placeholder="Enter username"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">key</span>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Enter password"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">login</span>
                Sign In
              </button>
            </form>
            <div className="px-8 pb-6 text-center">
              <Link to="/" className="text-sm text-gray-400 hover:text-primary transition-colors">
                &larr; Back to Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== ADMIN PANEL (authenticated) =====
  return (
    <div className="bg-background-light min-h-screen">
      {/* Header */}
      <div className="bg-[#0A2E18] text-white">
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary mb-1">
                <span className="material-symbols-outlined">admin_panel_settings</span>
                <span className="text-xs font-bold uppercase tracking-widest">Admin Panel</span>
              </div>
              <h1 className="text-3xl font-bold">Manage Products</h1>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors">
                <span className="material-symbols-outlined text-lg">logout</span>
                Logout
              </button>
              <Link to="/" className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Store
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-[1280px] mx-auto px-6 pt-6">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => setTab('list')}
            className={`px-5 py-2.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${
              tab === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="material-symbols-outlined text-lg">inventory_2</span>
            All Products ({products.length})
          </button>
          <button
            onClick={() => { setTab('add'); setError(''); setSuccess(''); if (!editingProduct) resetForm(); }}
            className={`px-5 py-2.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${
              tab === 'add' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="material-symbols-outlined text-lg">{editingProduct ? 'edit' : 'add_circle'}</span>
            {editingProduct ? 'Edit Product' : 'Add New Rug'}
          </button>
          <button
            onClick={() => { setTab('reviews'); setError(''); setSuccess(''); loadReviews(); }}
            className={`px-5 py-2.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${
              tab === 'reviews' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="material-symbols-outlined text-lg">reviews</span>
            Reviews
          </button>
          <button
            onClick={() => { setTab('settings'); setError(''); setSuccess(''); setSettingsSaved(false); }}
            className={`px-5 py-2.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${
              tab === 'settings' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="material-symbols-outlined text-lg">settings</span>
            Settings
          </button>
        </div>
      </div>

      {/* Alerts — sticky at top */}
      {(success || error) && (
        <div className="sticky top-0 z-50 max-w-[1280px] mx-auto px-6 pt-4">
          {success && (
            <div className="flex items-center gap-3 bg-green-50 border border-green-300 text-green-800 rounded-xl px-5 py-4 text-sm font-bold shadow-lg animate-pulse">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
              <div>
                <p>{success}</p>
                <p className="text-xs font-normal text-green-600 mt-0.5">You can view it in the product list or on the homepage.</p>
              </div>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-300 text-red-700 rounded-xl px-5 py-4 text-sm font-bold shadow-lg">
              <span className="material-symbols-outlined text-2xl">error</span>
              {error}
            </div>
          )}
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-6 py-6">
        {/* ===== PRODUCT LIST TAB ===== */}
        {tab === 'list' && (
          <div>
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-3 border-gray-200 border-t-primary rounded-full animate-spin" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-5xl text-gray-300 mb-4 block">inventory_2</span>
                <p className="text-gray-500 text-lg">No products yet.</p>
                <button onClick={() => setTab('add')} className="mt-4 text-primary font-bold hover:underline">Add your first rug</button>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Product</th>
                      <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 hidden md:table-cell">Category</th>
                      <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 hidden lg:table-cell">Material</th>
                      <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500">Price</th>
                      <th className="px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((p) => (
                      <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                              <img
                                src={p.images?.[0] || p.variants?.[0]?.color?.images?.[0]}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <Link to={`/product/${p.slug}`} className="font-bold text-slate-900 hover:text-primary transition-colors text-sm">
                                {p.name}
                              </Link>
                              <p className="text-xs text-gray-500 mt-0.5">SKU: {p.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-600 hidden md:table-cell">{p.category}</td>
                        <td className="px-5 py-4 text-sm text-gray-600 hidden lg:table-cell">{p.material}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-primary">{formatPrice(p.basePrice)}</td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/product/${p.slug}`} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors" title="View">
                              <span className="material-symbols-outlined text-lg">visibility</span>
                            </Link>
                            <button
                              onClick={() => handleEdit(p)}
                              className="p-2 rounded-lg hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors"
                              title="Edit"
                            >
                              <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                            <button
                              onClick={() => handleDelete(p._id, p.name)}
                              className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ===== ADD PRODUCT TAB ===== */}
        {tab === 'add' && (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Product Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Royal Persian Silk Rug"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">SKU *</label>
                  <input name="sku" value={form.sku} onChange={handleChange} required placeholder="e.g. RUG-PER-007"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Category *</label>
                  <select name="category" value={form.category} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white">
                    <option value="">Select category</option>
                    <option value="Persian">Persian</option>
                    <option value="Modern">Modern</option>
                    <option value="Bohemian">Bohemian</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Natural">Natural</option>
                    <option value="Vintage">Vintage</option>
                    <option value="Contemporary">Contemporary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Collection</label>
                  <input name="collection" value={form.collection} onChange={handleChange} placeholder="e.g. Persian Heritage"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Tags (comma-separated)</label>
                  <input name="tags" value={form.tags} onChange={handleChange} placeholder="silk, hand-knotted, luxury"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Short Description</label>
                  <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} rows={2} placeholder="Brief product description..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none" />
                </div>
              </div>
            </div>

            {/* Material & Origin */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">texture</span>
                Material & Origin
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Material</label>
                  <input name="material" value={form.material} onChange={handleChange} placeholder="e.g. 100% Pure Silk"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Weave Type</label>
                  <input name="weaveType" value={form.weaveType} onChange={handleChange} placeholder="e.g. Hand-Knotted"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Origin</label>
                  <input name="origin" value={form.origin} onChange={handleChange} placeholder="e.g. Kashmir, India"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">payments</span>
                Pricing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Base Price ($) *</label>
                  <input name="basePrice" type="number" value={form.basePrice} onChange={handleChange} required placeholder="45999"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Original Price ($)</label>
                  <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} placeholder="59999"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Delivery Timeline</label>
                  <input name="deliveryTimeline" value={form.deliveryTimeline} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                </div>
              </div>
              <div className="flex flex-wrap gap-6 mt-5">
                {[
                  { name: 'isFeatured', label: 'Featured' },
                  { name: 'isNewArrival', label: 'New Arrival' },
                  { name: 'isBestseller', label: 'Bestseller' },
                ].map((cb) => (
                  <label key={cb.name} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name={cb.name} checked={form[cb.name]} onChange={handleChange}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <span className="text-sm font-medium text-slate-700">{cb.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Images & Color */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">image</span>
                Images & Color
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Color Name</label>
                  <input name="colorName" value={form.colorName} onChange={handleChange} placeholder="e.g. Royal Ivory"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Color Hex</label>
                  <div className="flex gap-3 items-center">
                    <input name="colorHex" type="color" value={form.colorHex} onChange={handleChange}
                      className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer" />
                    <input name="colorHex" value={form.colorHex} onChange={handleChange}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n}>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Image URL {n}</label>
                    <input name={`imageUrl${n}`} value={form[`imageUrl${n}`]} onChange={handleChange} placeholder="Image URL (or upload below)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                  </div>
                ))}
              </div>

              {/* Image Upload via Cloudinary */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">cloud_upload</span>
                  Upload Images to Cloudinary
                </h3>
                <p className="text-xs text-gray-400 mb-3">Select up to 4 images. They will be uploaded to Cloudinary and URLs will auto-fill above.</p>
                <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all ${uploading ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary hover:bg-primary/5'}`}>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  {uploading ? (
                    <>
                      <span className="material-symbols-outlined text-3xl text-primary animate-spin mb-1">progress_activity</span>
                      <span className="text-sm font-bold text-primary">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-3xl text-gray-400 mb-1">add_photo_alternate</span>
                      <span className="text-sm font-bold text-gray-500">Click to select images</span>
                      <span className="text-xs text-gray-400 mt-0.5">JPG, PNG, WEBP (max 4 images)</span>
                    </>
                  )}
                </label>
                {/* Preview uploaded images */}
                {[form.imageUrl1, form.imageUrl2, form.imageUrl3, form.imageUrl4].some(Boolean) && (
                  <div className="flex gap-3 mt-4 flex-wrap">
                    {[form.imageUrl1, form.imageUrl2, form.imageUrl3, form.imageUrl4].map((url, i) =>
                      url ? (
                        <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                          <img src={url} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setForm(prev => ({ ...prev, [`imageUrl${i + 1}`]: '' }))}
                            className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                          >×</button>
                        </div>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sizes */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">straighten</span>
                Sizes (up to 3)
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Size {n} Label</label>
                      <input name={`size${n}Label`} value={form[`size${n}Label`]} onChange={handleChange} placeholder="e.g. 5×8 ft"
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Price ($)</label>
                      <input name={`size${n}Price`} type="number" value={form[`size${n}Price`]} onChange={handleChange} placeholder="45999"
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Stock</label>
                      <input name={`size${n}Stock`} type="number" value={form[`size${n}Stock`]} onChange={handleChange} placeholder="10"
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">description</span>
                Product Details (for accordions)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Product Details</label>
                  <textarea name="detailsProduct" value={form.detailsProduct} onChange={handleChange} rows={3} placeholder="Material: ...\nWeave: ..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Care Instructions</label>
                  <textarea name="detailsCare" value={form.detailsCare} onChange={handleChange} rows={3} placeholder="Professional dry cleaning..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Shipping & Returns</label>
                  <textarea name="detailsShipping" value={form.detailsShipping} onChange={handleChange} rows={3} placeholder="Free shipping on..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">About This Design</label>
                  <textarea name="detailsDesign" value={form.detailsDesign} onChange={handleChange} rows={3} placeholder="This rug draws inspiration..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none" />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-4 pb-8">
              {editingProduct && (
                <button type="button" onClick={() => { resetForm(); }} className="px-6 py-3 rounded-lg border border-gray-300 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel Edit
                </button>
              )}
              <button type="button" onClick={resetForm} className="px-6 py-3 rounded-lg border border-gray-300 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                Reset Form
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : editingProduct ? (
                  <>
                    <span className="material-symbols-outlined text-lg">save</span>
                    Update Product
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">add_circle</span>
                    Add Product
                  </>
                )}
              </button>
            </div>
          </form>
        )}
        {/* ===== REVIEWS TAB ===== */}
        {tab === 'reviews' && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">reviews</span>
              Manage Customer Reviews
            </h2>

            {/* Add Review Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">add_circle</span>
                Add New Testimonial
              </h3>
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Name *</label>
                    <input
                      type="text"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Role / Title</label>
                    <input
                      type="text"
                      value={reviewForm.role}
                      onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                      placeholder="e.g. Interior Designer"
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Review Text *</label>
                  <textarea
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                    placeholder="Write the testimonial text..."
                    required
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Rating *</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="p-0.5"
                        >
                          <span
                            className="material-symbols-outlined text-2xl text-accent-gold cursor-pointer"
                            style={{ fontVariationSettings: star <= reviewForm.rating ? "'FILL' 1" : "'FILL' 0" }}
                          >star</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <button
                      type="submit"
                      disabled={reviewSaving}
                      className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
                    >
                      {reviewSaving ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Adding...</>
                      ) : (
                        <><span className="material-symbols-outlined text-lg">add</span> Add Review</>
                      )}
                    </button>
                  </div>
                </div>
              </form>
              <p className="text-xs text-gray-400 mt-3">Reviews added here are automatically approved and will appear on the homepage testimonials section.</p>
            </div>

            {reviewsLoading ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-4xl text-gray-300 animate-spin block mb-2">progress_activity</span>
                <p className="text-gray-500">Loading reviews...</p>
              </div>
            ) : allReviews.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <span className="material-symbols-outlined text-5xl text-gray-300 mb-4 block">rate_review</span>
                <p className="text-gray-500 text-lg">No reviews yet.</p>
                <p className="text-gray-400 text-sm mt-1">Reviews submitted by users will appear here for approval.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Stats */}
                <div className="flex gap-4 mb-6">
                  <div className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <div>
                      <p className="text-lg font-bold text-slate-900">{allReviews.filter(r => r.approved).length}</p>
                      <p className="text-xs text-gray-500">Approved</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-500">pending</span>
                    <div>
                      <p className="text-lg font-bold text-slate-900">{allReviews.filter(r => !r.approved).length}</p>
                      <p className="text-xs text-gray-500">Pending</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 px-4 py-3 flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400">format_list_numbered</span>
                    <div>
                      <p className="text-lg font-bold text-slate-900">{allReviews.length}</p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                  </div>
                </div>

                {/* Review cards */}
                {allReviews.map((review) => (
                  <div key={review._id} className={`bg-white rounded-xl border p-5 flex flex-col sm:flex-row gap-4 ${review.approved ? 'border-green-200' : 'border-amber-200'}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${review.approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {review.approved ? 'Approved' : 'Pending'}
                        </span>
                        <div className="flex text-accent-gold">
                          {[1,2,3,4,5].map(s => (
                            <span key={s} className="material-symbols-outlined text-xs" style={{ fontVariationSettings: s <= review.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-800">{review.name} {review.role && <span className="font-normal text-gray-400">— {review.role}</span>}</p>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">"{review.text}"</p>
                      {review.createdAt && <p className="text-[10px] text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>}
                    </div>
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      {!review.approved ? (
                        <button onClick={() => handleApproveReview(review._id)} className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition-colors flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">check</span> Approve
                        </button>
                      ) : (
                        <button onClick={() => handleRejectReview(review._id)} className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">visibility_off</span> Hide
                        </button>
                      )}
                      <button onClick={() => handleDeleteReview(review._id)} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">delete</span> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* ===== SETTINGS TAB ===== */}
        {tab === 'settings' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">settings</span>
                Contact Settings
              </h2>
              <p className="text-sm text-gray-500 mb-6">Update the WhatsApp number and contact email used across the website.</p>

              {settingsSaved && (
                <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 text-primary rounded-lg px-4 py-3 text-sm font-medium mb-6">
                  <span className="material-symbols-outlined">check_circle</span>
                  Settings saved successfully! Changes will reflect across the site.
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">WhatsApp Number</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">chat</span>
                    <input
                      type="text"
                      value={contactSettings.whatsappNumber}
                      onChange={(e) => setContactSettings({ ...contactSettings, whatsappNumber: e.target.value })}
                      placeholder="e.g. 919999999999 (country code + number, no +)"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Enter with country code, no spaces or + sign. Example: 919876543210</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Contact Email</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">mail</span>
                    <input
                      type="email"
                      value={contactSettings.contactEmail}
                      onChange={(e) => setContactSettings({ ...contactSettings, contactEmail: e.target.value })}
                      placeholder="e.g. info@workweavecarpet.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={async () => {
                    setSettingsLoading(true);
                    const result = await api.updateSettings(contactSettings);
                    setSettingsLoading(false);
                    if (result && result.success) {
                      cacheSettings({ whatsappNumber: result.whatsappNumber, contactEmail: result.contactEmail });
                      setSettingsSaved(true);
                      setTimeout(() => setSettingsSaved(false), 4000);
                    }
                  }}
                  className="px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">save</span>
                  Save Settings
                </button>
                <button
                  onClick={async () => {
                    const data = await api.getSettings();
                    if (data) { setContactSettings(data); cacheSettings(data); }
                    setSettingsSaved(false);
                  }}
                  className="px-6 py-3 rounded-lg border border-gray-300 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mt-6">
              <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-gray-400">preview</span>
                Preview Links
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="material-symbols-outlined text-[#25D366]">chat</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">WhatsApp Link</p>
                    <p className="text-sm text-slate-700 truncate">wa.me/{contactSettings.whatsappNumber}</p>
                  </div>
                  <a
                    href={`https://wa.me/${contactSettings.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary font-bold hover:underline"
                  >
                    Test
                  </a>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="material-symbols-outlined text-primary">mail</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Contact Email</p>
                    <p className="text-sm text-slate-700 truncate">{contactSettings.contactEmail}</p>
                  </div>
                  <a
                    href={`mailto:${contactSettings.contactEmail}`}
                    className="text-xs text-primary font-bold hover:underline"
                  >
                    Test
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
