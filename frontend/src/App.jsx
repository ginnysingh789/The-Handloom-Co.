import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import LandingPage from './pages/LandingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CustomizationPage from './pages/CustomizationPage';
import B2BPage from './pages/B2BPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import JournalPage from './pages/JournalPage';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingActions from './components/common/FloatingActions';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/customize" element={<CustomizationPage />} />
              <Route path="/b2b" element={<B2BPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/journal" element={<JournalPage />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
          <FloatingActions />
        </div>
      </CartProvider>
    </Router>
  );
}
