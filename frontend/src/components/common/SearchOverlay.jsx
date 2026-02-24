import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api, formatPrice } from '../../utils/api';
import { staticProducts } from '../../data/products';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
    if (!isOpen) { setQuery(''); setResults([]); }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        // Always search static data
        const q = query.toLowerCase();
        const staticResults = staticProducts.filter((p) =>
          p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q) ||
          p.collection?.toLowerCase().includes(q) || p.material?.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q))
        ).map((p) => ({
          ...p,
          images: p.images || p.variants?.[0]?.color?.images || []
        }));

        // Try API too
        const apiResults = await api.searchProducts(query);
        if (apiResults && apiResults.length > 0) {
          // Merge: API results first, then static that aren't duplicates
          const apiIds = new Set(apiResults.map((r) => r._id));
          const merged = [...apiResults, ...staticResults.filter((s) => !apiIds.has(s._id))];
          setResults(merged);
        } else {
          setResults(staticResults);
        }
      } catch {
        const q = query.toLowerCase();
        setResults(staticProducts.filter((p) =>
          p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q) ||
          p.collection?.toLowerCase().includes(q) || p.material?.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q))
        ).map((p) => ({
          ...p,
          images: p.images || p.variants?.[0]?.color?.images || []
        })));
      }
      setLoading(false);
    }, 250);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop — closes on click */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-black/40"
        onClick={onClose}
      />

      {/* Dropdown panel */}
      <div
        ref={panelRef}
        className="fixed top-[64px] sm:top-[80px] left-1/2 -translate-x-1/2 z-[70] w-[96vw] max-w-2xl bg-white rounded-b-xl sm:rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100">
          <span className="material-symbols-outlined text-xl text-primary">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rugs..."
            className="flex-1 text-sm font-medium text-slate-900 placeholder:text-gray-400 outline-none bg-transparent"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          )}
          <button onClick={onClose} className="text-[11px] font-medium text-gray-400 border border-gray-200 rounded px-2 py-1">
            ESC
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Empty state — quick tags */}
          {!query.trim() && (
            <div className="px-5 py-5 text-center">
              <p className="text-gray-400 text-xs mb-3">Quick search</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Persian', 'Silk', 'Wool', 'Bohemian', 'Modern', 'Jute'].map((tag) => (
                  <button key={tag} onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-full bg-gray-50 text-xs font-medium text-gray-600 hover:bg-primary/10 hover:text-primary transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading */}
          {query.trim() && loading && (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-gray-200 border-t-primary rounded-full animate-spin" />
            </div>
          )}

          {/* No results */}
          {query.trim() && !loading && results.length === 0 && (
            <div className="text-center py-8 px-5">
              <p className="text-gray-400 text-sm">No results for "<strong className="text-gray-600">{query}</strong>"</p>
            </div>
          )}

          {/* Results list */}
          {results.length > 0 && (
            <div className="divide-y divide-gray-50">
              <p className="px-5 pt-3 pb-2 text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              {results.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={product.images?.[0] || product.variants?.[0]?.color?.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-slate-900 group-hover:text-primary transition-colors truncate">{product.name}</h4>
                    <p className="text-xs text-gray-400 truncate">{product.material} · {product.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary shrink-0">{formatPrice(product.basePrice)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
