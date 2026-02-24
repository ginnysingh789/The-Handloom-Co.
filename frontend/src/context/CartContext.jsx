import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, getSessionId } from '../utils/api';

const CartContext = createContext();
const LOCAL_CART_KEY = 'wwc_local_cart';

function getLocalCart() {
  try {
    const stored = localStorage.getItem(LOCAL_CART_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return { items: [], totalAmount: 0 };
}

function saveLocalCart(cart) {
  try { localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart)); } catch { /* ignore */ }
}

function recalcTotal(items) {
  return items.reduce((sum, item) => sum + (item.variant?.price || 0) * item.quantity + (item.addons || []).reduce((a, ad) => a + (ad.price || 0), 0) * item.quantity, 0);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getLocalCart);
  const [cartCount, setCartCount] = useState(() => {
    const c = getLocalCart();
    return c.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const sessionId = getSessionId();

  const syncState = useCallback((cartData) => {
    setCart(cartData);
    setCartCount(cartData.items?.reduce((sum, item) => sum + item.quantity, 0) || 0);
    saveLocalCart(cartData);
  }, []);

  const fetchCart = useCallback(async () => {
    const data = await api.getCart(sessionId);
    if (data && data.items) {
      syncState(data);
    }
    // If API fails, local cart is already loaded from state init
  }, [sessionId, syncState]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, productName, variant, quantity, addons) => {
    // Try API first
    const data = await api.addToCart(sessionId, {
      productId,
      productName,
      variant,
      quantity,
      addons
    });
    if (data && data.items) {
      syncState(data);
      setIsCartOpen(true);
      return data;
    }

    // Fallback: add to local cart
    const localCart = getLocalCart();
    const existingIdx = localCart.items.findIndex(
      (item) => item.productId === productId && item.variant?.color === variant?.color && item.variant?.size === variant?.size
    );

    if (existingIdx >= 0) {
      localCart.items[existingIdx].quantity += quantity;
      localCart.items[existingIdx].lineTotal = (localCart.items[existingIdx].variant?.price || 0) * localCart.items[existingIdx].quantity;
    } else {
      localCart.items.push({
        _id: 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        productId,
        productName,
        variant,
        quantity,
        addons: addons || [],
        lineTotal: (variant?.price || 0) * quantity,
      });
    }
    localCart.totalAmount = recalcTotal(localCart.items);
    syncState(localCart);
    setIsCartOpen(true);
    return localCart;
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) { removeItem(itemId); return; }

    const data = await api.updateCartItem(sessionId, itemId, quantity);
    if (data && data.items) {
      syncState(data);
      return;
    }

    // Fallback: update local
    const localCart = getLocalCart();
    const item = localCart.items.find((i) => i._id === itemId);
    if (item) {
      item.quantity = quantity;
      item.lineTotal = (item.variant?.price || 0) * quantity;
      localCart.totalAmount = recalcTotal(localCart.items);
      syncState(localCart);
    }
  };

  const removeItem = async (itemId) => {
    const data = await api.removeCartItem(sessionId, itemId);
    if (data && data.items !== undefined) {
      syncState(data);
      return;
    }

    // Fallback: remove local
    const localCart = getLocalCart();
    localCart.items = localCart.items.filter((i) => i._id !== itemId);
    localCart.totalAmount = recalcTotal(localCart.items);
    syncState(localCart);
  };

  const clearCart = async () => {
    await api.clearCart(sessionId);
    const empty = { items: [], totalAmount: 0 };
    syncState(empty);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
