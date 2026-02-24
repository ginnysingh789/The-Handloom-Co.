import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWhatsAppLink } from '../utils/contactConfig';
import { api } from '../utils/api';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const defaultReviews = [
  { _id: 'd1', name: 'Priya Sharma', role: 'Interior Designer, Delhi', text: 'The quality of World Weave Carpets is unmatched. The craftsmanship is truly exceptional. Every piece feels like a work of art.', rating: 5 },
  { _id: 'd2', name: 'Rajesh Mehta', role: 'Homeowner, Mumbai', text: 'We ordered a custom Persian-style rug for our living room and it exceeded all expectations. The colors are vibrant and the texture is luxurious.', rating: 5 },
  { _id: 'd3', name: 'Ananya Gupta', role: 'Architect, Bangalore', text: 'Their B2B program is seamless, the pricing is competitive, and the delivery is always on time. A truly professional experience.', rating: 5 },
];

export default function AboutPage() {
  const [reviews, setReviews] = useState(defaultReviews);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', text: '', rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');

  useEffect(() => {
    async function loadReviews() {
      const data = await api.getReviews();
      if (data && data.length > 0) {
        setReviews(data);
        localStorage.setItem('wwc_reviews', JSON.stringify(data));
      } else {
        const cached = localStorage.getItem('wwc_reviews');
        if (cached) {
          try { setReviews(JSON.parse(cached)); } catch {}
        }
      }
    }
    loadReviews();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) return;
    setSubmitting(true);
    setSubmitMsg('');
    const result = await api.submitReview(formData);
    if (result) {
      setSubmitMsg('Thank you! Your review has been submitted and will appear after approval.');
      setFormData({ name: '', role: '', text: '', rating: 5 });
      setTimeout(() => { setShowForm(false); setSubmitMsg(''); }, 3000);
    } else {
      // Fallback: save to localStorage
      const localReviews = JSON.parse(localStorage.getItem('wwc_pending_reviews') || '[]');
      localReviews.push({ ...formData, _id: 'local_' + Date.now(), createdAt: new Date().toISOString(), approved: true });
      localStorage.setItem('wwc_pending_reviews', JSON.stringify(localReviews));
      const allLocal = [...reviews, ...localReviews.filter(r => r.approved)];
      setReviews(allLocal);
      setSubmitMsg('Thank you! Your review has been saved.');
      setFormData({ name: '', role: '', text: '', rating: 5 });
      setTimeout(() => { setShowForm(false); setSubmitMsg(''); }, 3000);
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 md:py-32 bg-[#0A2E18] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955280/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_17.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 text-center">
          <motion.span
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.1 } } }}
            className="text-3xl sm:text-4xl md:text-6xl font-light mb-6"
          >
            About Us
          </motion.h1>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.2 } } }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            A legacy of craftsmanship, quality, and trust — built over decades.
          </motion.p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12 sm:py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="w-full lg:w-1/2"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955279/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_15.jpg"
                  alt="Our workshop"
                  className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">history</span>
                  Our Journey
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 mb-6 leading-tight">
                  From Humble Beginnings to <br />
                  <span className="italic font-serif">Global Excellence</span>
                </h2>
              </motion.div>

              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.15 } } }}
                className="space-y-5 text-slate-600 leading-relaxed"
              >
                <p>
                  We started as a Carpet Manufacturing Company back in the late 90s under the kind guidance of our forefathers. Initially, we started as a single manufacturing unit which was registered as <strong className="text-slate-800">World Weave Carpets</strong>, which manufactured the best quality Rugs in the City. The services were appreciated a lot by our early customers.
                </p>
                <p>
                  World Weave Carpets still holds a strong reputation in the Market because of the Company's great Customer Support System and the Quality which is undoubtedly reliable.
                </p>
                <p>
                  As the company grew, it evolved into what is now known as <strong className="text-slate-800">World Weave Carpets</strong> — aiming to provide all kinds of Rugs with more perfection and a strong database. We continue to build reliance in the Industry with 24/7 Customer Support.
                </p>
                <p>
                  World Weave Carpets has been the most trusted brand in the city because it believes in Values and Ethics of doing Business. We stand by our morals to keep smooth workings and ethics alive.
                </p>
                <p className="font-medium text-slate-800">
                  World Weave Carpets now expands to do business globally and assures the best quality products and support to all its Customers.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-[#e8f5e9] via-[#f1f8f2] to-[#e8f5e9]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 mb-4">What We Stand For</h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { icon: 'verified', title: 'Quality Assurance', desc: 'Every rug undergoes rigorous quality checks to ensure only the finest products reach your home.' },
              { icon: 'handshake', title: 'Trust & Ethics', desc: 'We believe in transparent business practices, fair pricing, and honest customer relationships.' },
              { icon: 'support_agent', title: '24/7 Support', desc: 'Our dedicated customer support team is always available to assist you with any queries.' },
              { icon: 'public', title: 'Global Reach', desc: 'From local roots to global presence — we deliver premium carpets worldwide.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.4, delay: i * 0.1 } } }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-2xl text-primary group-hover:text-white transition-colors">{item.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Badges — like Image 1 */}
      <section className="py-10 sm:py-16 bg-white border-t border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-20">
            {[
              { icon: 'eco', label: 'Sustainable' },
              { icon: 'volunteer_activism', label: 'Handcrafted' },
              { icon: 'texture', label: 'Made with Genuine Fabric' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.4, delay: i * 0.1 } } }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-slate-700">{item.icon}</span>
                </div>
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Story — like Image 1 */}
      <section className="py-12 sm:py-20 md:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-16 items-center">
            {/* Text */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 mb-6">Crafted by Artisan Hands</h2>
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>
                  Every World Weave Carpet creation tells a story of heritage and craftsmanship that spans generations. Our rugs are meticulously handcrafted by skilled artisans in Jaipur, India, using techniques passed down through families for centuries.
                </p>
                <p>
                  We work directly with artisan communities, ensuring fair wages and preserving traditional craftsmanship. Each rug takes 3–6 months to complete, with master weavers tying thousands of individual knots by hand.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 mt-8">
                {[
                  { icon: 'workspace_premium', label: 'Fair Trade Certified' },
                  { icon: 'eco', label: 'Sustainable Practices' },
                  { icon: 'groups', label: 'Community Support' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-slate-600">{item.icon}</span>
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                  </div>
                ))}
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-primary font-bold mt-6 hover:underline decoration-2 underline-offset-4 transition-all">
                Learn more about our artisans
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            {/* Image */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="w-full lg:w-1/2"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955267/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_2.jpg"
                  alt="Artisan weaving"
                  className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Feedback — Dynamic */}
      <section className="py-12 sm:py-20 md:py-28 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-3 block">Testimonials</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 mb-4">What Our Customers Say</h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
            >
              <span className="material-symbols-outlined text-base">rate_review</span>
              {showForm ? 'Close' : 'Write a Review'}
            </button>
          </div>

          {/* Review Submission Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-10"
              >
                <form onSubmit={handleSubmitReview} className="max-w-xl mx-auto bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Share Your Experience</h3>
                  {submitMsg && (
                    <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      {submitMsg}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 mb-1.5 block">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 mb-1.5 block">Your Role / City</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g. Homeowner, Mumbai"
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 block">Rating *</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-0.5 hover:scale-110 transition-transform"
                        >
                          <span
                            className="material-symbols-outlined text-2xl text-accent-gold"
                            style={{ fontVariationSettings: star <= formData.rating ? "'FILL' 1" : "'FILL' 0" }}
                          >star</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="text-xs font-bold text-slate-600 mb-1.5 block">Your Review *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.text}
                      onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                      placeholder="Tell us about your experience with World Weave Carpets..."
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>Submitting...</>
                    ) : (
                      <><span className="material-symbols-outlined text-base">send</span> Submit Review</>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={review._id || i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.4, delay: (i % 6) * 0.08 } } }}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="flex text-accent-gold mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="material-symbols-outlined text-base" style={{ fontVariationSettings: star <= review.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-lg">person</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{review.name}</p>
                    {review.role && <p className="text-xs text-slate-500">{review.role}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {reviews.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <span className="material-symbols-outlined text-4xl mb-2 block">reviews</span>
              <p className="text-sm">No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 bg-[#0A2E18] text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4">Experience the Difference</h2>
          <p className="text-white/60 mb-8">Visit our showroom or explore our collections online to find the perfect carpet for your space.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/" className="btn-primary text-lg px-8 py-3">Explore Collections</a>
            <a
              href={getWhatsAppLink("Hi! I'd like to know more about World Weave Carpet.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 border border-white/20 text-white font-bold uppercase tracking-wider px-8 py-3 rounded-lg hover:bg-white/20 transition-colors text-lg flex items-center gap-2"
            >
              <span className="material-symbols-outlined">chat</span>
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
