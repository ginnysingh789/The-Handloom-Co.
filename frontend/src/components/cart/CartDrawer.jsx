import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/api';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e7f3eb]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                <h2 className="text-lg font-bold text-[#0d1b12]">Your Cart</h2>
                <span className="text-sm text-gray-500">
                  ({cart.items?.length || 0} {cart.items?.length === 1 ? 'item' : 'items'})
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 hover:bg-primary/10 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-gray-600">close</span>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {(!cart.items || cart.items.length === 0) ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">shopping_bag</span>
                  <p className="text-lg font-bold text-gray-500 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-400">Discover our handcrafted carpets</p>
                  <button onClick={() => setIsCartOpen(false)} className="btn-primary mt-6">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item._id} className="flex gap-4 p-3 bg-[#f8fcf9] rounded-lg border border-[#e7f3eb]">
                      <div className="w-20 h-20 bg-[#e7f3eb] rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl text-primary/40">texture</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#0d1b12] truncate">{item.productName}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.variant?.color} · {item.variant?.size}
                        </p>
                        {item.addons?.length > 0 && (
                          <p className="text-xs text-accent-gold mt-0.5">
                            +{item.addons.length} add-on{item.addons.length > 1 ? 's' : ''}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#e7f3eb] rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="p-1.5 hover:bg-primary/10 transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span className="px-3 text-sm font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="p-1.5 hover:bg-primary/10 transition-colors"
                            >
                              <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-[#0d1b12]">
                              {formatPrice(item.lineTotal || item.variant?.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item._id)}
                              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.items?.length > 0 && (
              <div className="border-t border-[#e7f3eb] px-6 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-xl font-bold text-[#0d1b12]">
                    {formatPrice(cart.totalAmount || 0)}
                  </span>
                </div>
                <p className="text-xs text-gray-400">Shipping calculated at checkout</p>
                <button className="w-full h-12 bg-primary hover:bg-green-600 text-white rounded-lg font-bold tracking-wide transition-all">
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full h-10 border border-primary text-primary hover:bg-primary/5 rounded-lg font-bold tracking-wide transition-all text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
