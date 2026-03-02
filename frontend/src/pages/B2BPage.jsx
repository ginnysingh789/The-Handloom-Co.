import { Link } from 'react-router-dom';
import { getWhatsAppLink, getContactEmail } from '../utils/contactConfig';

export default function B2BPage() {
  const services = [
    {
      icon: 'local_shipping',
      title: 'Logistics — Reliable, End-to-End',
      desc: 'We manage shipping and logistics so you don\'t have to. From factory packing to international transport, our workflow minimizes risk and keeps timelines predictable.',
      items: [
        'Export-grade packing and palletisation for safe transit',
        'Multiple shipping options: FOB, CIF, or DDP',
        'Consolidation and container optimisation to reduce cost per unit',
        'Real-time shipment updates and tracking on request',
        'Customs documentation handled proactively to avoid delays',
      ],
      benefit: 'Predictable deliveries, reduced damage risk, and fewer surprises at the port.',
    },
    {
      icon: 'photo_camera',
      title: 'Product Photography — Ready-to-Use Assets',
      desc: 'High-quality product imagery that\'s e-commerce and catalogue ready — delivered to your brand specifications.',
      items: [
        'Studio-grade stills (multiple angles), detail close-ups, and scale shots',
        'Lifestyle and flat-lay options available on request',
        'Files delivered in web and print resolutions with structured naming',
        'Optional retouching and color-correction to match your brand palette',
      ],
      benefit: 'Use immediately across product listings, catalogs, or marketing campaigns — saving time and creative resources.',
    },
    {
      icon: 'videocam',
      title: 'Behind-the-Scenes Content — Build Brand Trust',
      desc: 'Show your customers the craft and care behind each piece with curated behind-the-scenes content.',
      items: [
        'Short process videos, craft stills, and workshop imagery',
        'Content packages tailored for social, email, and on-site storytelling',
        'Rights to use the produced content across your marketing channels',
      ],
      benefit: 'Strengthens authenticity and increases perceived value for end customers.',
    },
    {
      icon: 'branding_watermark',
      title: 'Custom Branding — Your Identity, Our Product',
      desc: 'We offer on-product customer branding to help your products carry your identity.',
      items: [
        'Standard branding fee: US$200 per style',
        'Free branding on orders ≥ US$10,000',
        'Options include woven labels, custom tags, or subtle corner-branding',
      ],
      benefit: 'Branded product presence with transparent pricing and volume incentives.',
    },
  ];

  const quickTerms = [
    { label: 'Factory Lead Time', value: '15–90 days from advance payment' },
    { label: 'Branding Fee', value: 'US$200/style (waived for orders ≥ US$10,000)' },
    { label: 'Payment Terms', value: '50% advance / 50% on arrival at port (B/L)' },
    { label: 'Inspections', value: 'Third-party inspection welcome at factory or pre-shipment' },
    { label: 'MOQ & Packaging', value: 'Available per SKU on request' },
  ];

  return (
    <div className="bg-background-light text-slate-900 font-display antialiased">
      {/* Hero */}
      <section className="relative w-full min-h-[70vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background-light z-10"></div>
          <img
            src="https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955288/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_26.jpg"
            alt="Luxury interior with handcrafted rugs"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <span className="text-primary font-medium tracking-widest uppercase text-sm bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full border border-white/20">
            B2B Partnerships
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            B2B Partnerships <br /> <span className="italic font-serif font-light text-white/80">What We Offer</span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-gray-200 max-w-2xl font-light leading-relaxed">
            We partner with businesses to deliver crafted rugs and related services at scale — with care, transparency, and a service level that respects your timelines and brand standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <a href="#services" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-primary/20 uppercase text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">arrow_downward</span>
              Explore Services
            </a>
            <a href="#contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-lg font-bold transition-all uppercase text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">handshake</span>
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* What We Offer — Services */}
      <section id="services" className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 sm:mb-20">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">What We Offer</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Comprehensive services designed for business partners — from logistics to branding.</p>
          </div>
          <div className="space-y-8">
            {services.map((svc, i) => (
              <div key={i} className="bg-background-light rounded-2xl border border-gray-100 p-6 sm:p-10 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-2xl text-primary">{svc.icon}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{svc.title}</h3>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">{svc.desc}</p>
                    <ul className="space-y-2.5">
                      {svc.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <span className="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">check_circle</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:w-72 shrink-0">
                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary text-base">trending_up</span>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Benefit</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{svc.benefit}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Time, QA, Payment */}
      <section className="py-16 sm:py-24 bg-background-light">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 sm:mb-20">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">Business Terms</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Clear, business-friendly terms that balance cashflow and commitment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Lead Time */}
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl text-primary">schedule</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Lead Time & Production</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">Factory lead time: <strong>15–90 days</strong> from receipt of advance payment.</p>
              <div className="bg-primary/5 rounded-lg p-3">
                <p className="text-xs text-slate-600">Clear production window for planning shipments and inventory.</p>
              </div>
            </div>
            {/* QA */}
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl text-primary">verified</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Quality Assurance</h3>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>Open to third-party inspection at factory or pre-shipment</li>
                <li className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>Internal QA: design checks, color matching, dimensional verification</li>
                <li className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>Photographic evidence available prior to shipping</li>
              </ul>
            </div>
            {/* Payment */}
            <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-2xl text-primary">payments</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Payment & Shipping</h3>
              <ul className="space-y-2.5 text-sm text-slate-600">
                <li className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>50% advance to begin production; 50% on arrival at port (B/L)</li>
                <li className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>Flexible structures for long-term partners</li>
                <li className="flex items-start gap-2"><span className="material-symbols-outlined text-primary text-sm mt-0.5">check</span>Shipping terms: FOB / CIF / DDP negotiable</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Terms Snapshot */}
      <section className="py-16 sm:py-24 bg-[#0A2E18] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3">Quick Terms Snapshot</h2>
            <p className="text-gray-300 font-light">For procurement teams — at a glance.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
              {quickTerms.map((term, i) => (
                <div key={i} className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 px-6 py-4 ${i < quickTerms.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <span className="text-sm font-bold text-primary sm:w-48 shrink-0">{term.label}</span>
                  <span className="text-sm text-gray-300">{term.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Why Work With Us</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Craftsmanship Meets <br /><span className="italic font-serif font-light">Business Reliability</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              We combine thoughtful craftsmanship with business-level reliability — clear timelines, consistent quality, and marketing-ready assets that help you sell. We don't just manufacture products; we help you present them to your customers with confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
              {[
                { icon: 'schedule', label: 'Clear Timelines' },
                { icon: 'verified', label: 'Consistent Quality' },
                { icon: 'photo_camera', label: 'Marketing-Ready Assets' },
                { icon: 'support_agent', label: 'Dedicated Support' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="py-16 sm:py-24 bg-background-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 md:p-16 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-3xl text-primary">handshake</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6">Let's Work Together</h2>
            <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
              Ready to explore a partnership? Reach out and we'll get back to you within 48 hours with a tailored proposal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppLink("Hi! I'm interested in the B2B Partnership program. I'd like to discuss services and terms.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-3 text-base"
              >
                <span className="material-symbols-outlined">chat</span>
                WhatsApp Us
              </a>
              <a
                href={`mailto:${getContactEmail()}?subject=B2B Partnership Inquiry`}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-3 text-base"
              >
                <span className="material-symbols-outlined">mail</span>
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
