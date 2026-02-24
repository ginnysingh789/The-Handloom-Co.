import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const weavingTechniques = [
  {
    title: 'Handknotted Rugs',
    description: 'The oldest weaving method. Knotted-pile carpets have piles made from the cut ends of warp-weft knots. Warp, weft, knots, pile height, and knot density affect a pile carpet. Most hand-knotted carpets are cleaned, making them supple. Hand-knotted rugs are prized for their durability and intricate detail — each knot is tied individually by hand, creating pieces that can last for generations.',
    img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955267/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_2.jpg',
    icon: 'gesture',
  },
  {
    title: 'Flatweave Rugs',
    description: 'Weaving is done by intersecting longitudinal warp threads wrapped on a beam with reeds and Heald shafts. To achieve desired weave designs, shafts are manually synchronized with weft threads. The technique can also weave multi-textured designs into thick hefty rugs. Flatweave rugs are lightweight, reversible, and perfect for high-traffic areas.',
    img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955271/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_44.jpg',
    icon: 'view_agenda',
  },
  {
    title: 'Hand-Woven Rugs',
    description: 'The foundation of a loom rug is a piece of woven cloth created by interlacing threads called warp and weft. The warp is kept taut on the loom, while the weft is drawn through the shed of warp strands using a shuttle. This ancient technique produces rugs with a beautiful, organic texture that machine-made rugs simply cannot replicate.',
    img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955264/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_1.jpg',
    icon: 'grid_on',
  },
  {
    title: 'Kilim Weave Rugs',
    description: 'This Persian term literally means "to spread roughly." Genuine Kilim carpets make the best flooring. Rugs with geometric forms come to life when painted in vivid hues. The unique patterns on kilims make them very pleasing. Kilim rugs are flat-woven tapestries that are both functional and decorative, often featuring bold tribal motifs.',
    img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955274/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_73.jpg',
    icon: 'diamond',
  },
  {
    title: 'Hand Tufted Rugs',
    description: 'Because hand tufted carpet is woven, it allows us to create whatever pattern we like. The method entails inserting a thread into the principal support structure with the use of a tufting gun. This gun cuts through the stretched foundation fabric, creating a pile whose height is controlled by the feeder. The rug\'s strength and resilience is enhanced by a backing made of synthetic latex.',
    img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955276/world-weave-rugs/1771944039726-25070a19-06bc-4ecc-91ed-89efdec00c1aNEW__3.jpg',
    icon: 'precision_manufacturing',
  },
  {
    title: 'Handloom Rugs',
    description: 'Handloom rugs are a type of textile flooring made using traditional hand-operated weaving techniques. They have a rich history and are renowned for their craftsmanship, intricate designs, and durability. Handloom rugs are woven on a manually operated loom, where the weaver meticulously interlaces threads to create the final product — a true testament to human artistry.',
    img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955270/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_31.jpg',
    icon: 'handyman',
  },
];

const articles = [
  {
    category: 'Interior Trends',
    title: 'Minimalism in 2025: Texture over Color',
    excerpt: 'Discover how leading designers are using high-pile rugs to add warmth to minimalist spaces without adding visual clutter. The key is choosing neutral tones with rich tactile surfaces.',
    img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955284/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_22.jpg',
    date: 'Jan 15, 2025',
    readTime: '5 min read',
  },
  {
    category: 'Care Guide',
    title: 'Preserving the Knot: Hand-knotted Rug Care',
    excerpt: 'Essential tips for maintaining the vibrancy and structural integrity of your luxury heirloom pieces for generations. From vacuuming techniques to professional cleaning schedules.',
    img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955286/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_24.jpg',
    date: 'Dec 28, 2024',
    readTime: '7 min read',
  },
  {
    category: 'Craftsmanship',
    title: 'The Art of Natural Dyeing: From Plant to Palette',
    excerpt: 'How our artisans extract vibrant, long-lasting colors from plants, minerals, and insects — a tradition that dates back thousands of years and produces hues no synthetic can match.',
    img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955279/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_15.jpg',
    date: 'Nov 10, 2024',
    readTime: '6 min read',
  },
  {
    category: 'Sustainability',
    title: 'Why Handmade Rugs Are the Sustainable Choice',
    excerpt: 'In an age of fast furniture, handmade rugs stand apart. Zero factory emissions, biodegradable materials, and fair-trade practices make them the eco-conscious choice for modern homes.',
    img: 'https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955288/world-weave-rugs/1771953807107-79263569-01fd-43fe-b5a2-e99904b82046_26.jpg',
    date: 'Oct 5, 2024',
    readTime: '4 min read',
  },
];

export default function JournalPage() {
  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 md:py-32 bg-[#0A2E18] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://res.cloudinary.com/dhyjy3pnz/image/upload/v1771955272/world-weave-rugs/1771942957062-53dbacff-5eb4-4d4c-a081-0bb0c5a3a3e4_68.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
          <motion.span
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
          >
            The Journal
          </motion.span>
          <motion.h1
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.1 } } }}
            className="text-3xl sm:text-4xl md:text-6xl font-light mb-6"
          >
            Stories & Craftsmanship
          </motion.h1>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.6, delay: 0.2 } } }}
            className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Explore the art, heritage, and techniques behind every rug we create.
          </motion.p>
        </div>
      </section>

      {/* Weaving Techniques */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-3 block">Craftsmanship</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-slate-900 mb-4">Weaving Techniques</h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-4"></div>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Every rug tells a story through its weave. Discover the ancient techniques that bring our carpets to life.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {weavingTechniques.map((tech, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.5, delay: 0.1 } } }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 sm:gap-12 items-center`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                      <img src={tech.img} alt={tech.title} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl text-primary">{tech.icon}</span>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">Technique {String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{tech.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{tech.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 sm:py-24 bg-background-light">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-3 block">Latest</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-slate-900 mb-4">From The Journal</h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {articles.map((article, i) => (
              <motion.article
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { duration: 0.4, delay: i * 0.1 } } }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest">{article.category}</span>
                    <span className="text-xs text-gray-400">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-3 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{article.date}</span>
                    <span className="text-xs font-bold text-primary group-hover:underline">Read More →</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <span className="material-symbols-outlined text-4xl text-primary mb-4">auto_stories</span>
          <h3 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4">Want to Learn More?</h3>
          <p className="text-slate-500 mb-8">Visit our showroom to see these techniques in person, or explore our collections to find the perfect piece for your space.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">Explore Collections</Link>
            <Link to="/customize" className="btn-secondary">Design Your Own</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
