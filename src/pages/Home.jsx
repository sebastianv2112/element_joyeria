import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import heroVideo from '../assets/videos/hero.mp4'
import products, { formatPrice } from '../data/products.js'
import { worldCupProducts } from '../data/products.js'

const rotatingPhrases = ['Elegancia Atemporal', 'Diseño Esencial', 'Hecho para Ti']

const featuredProducts = products.filter((p) => p.featured)

// ─── Section 2 wrapper ─────────────────────────────────────────────────────
function BrandStatement() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-24 md:py-32 bg-gray-950 text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="text-2xl md:text-4xl font-light max-w-3xl mx-auto leading-snug text-white">
          Cada pieza cuenta una historia. La tuya.
        </p>
        <div className="w-16 h-px bg-white/30 mx-auto my-8" />
        <p className="text-gray-500 text-sm tracking-wide max-w-md mx-auto">
          Brazaletes diseñados para quienes entienden que los detalles definen el estilo.
        </p>
      </motion.div>
    </section>
  )
}

// ─── Section 3 product card ─────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
    >
      <Link to={`/producto/${product.slug}`} className="block group">
        <div className="aspect-[3/4] overflow-hidden bg-gray-800">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="pt-3 pb-1">
          <p className="text-sm font-light text-white">{product.name}</p>
          <p className="text-sm text-gray-500 mt-0.5">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  )
}

function WorldCupCard({ product, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      className="min-w-[280px] md:min-w-[320px] snap-start"
    >
      <Link to={`/producto/${product.slug}`} className="block group">
        <div className="aspect-[3/4] overflow-hidden bg-gray-800 relative">
          <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
            <span className="text-[10px] tracking-wider uppercase bg-white text-black px-2 py-1 font-medium">
              {product.countryCode}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <p className="absolute bottom-3 left-3 z-10 text-white text-xs tracking-widest uppercase font-light">
            {product.country}
          </p>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="pt-3 pb-1">
          <p className="text-sm font-light text-white">{product.name}</p>
          <p className="text-sm text-gray-500 mt-0.5">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  )
}

function WorldCupSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section ref={ref} className="py-20 md:py-28 bg-gray-950 overflow-hidden">
      <div className="px-6 md:px-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-white/40" />
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-light">
              Edición Limitada
            </p>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-none">
            World Cup
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white/30 leading-none mt-1">
            2026
          </h2>
          <p className="text-sm text-gray-500 tracking-wide mt-6 max-w-md">
            Seis selecciones. Seis brazaletes. Lleva la pasión de tu equipo con la elegancia de Element.
          </p>
        </motion.div>
      </div>

      <div className="pl-6 md:pl-12">
        <div className="flex gap-3 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-6 scrollbar-none pr-6 touch-pan-x">
          {worldCupProducts.map((product, index) => (
            <WorldCupCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 mt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-white/10" />
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/30">
            Desliza para explorar
          </p>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/30"
          >
            →
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Home ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main>
      {/* ── Section 1: Hero ──────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Video background */}
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-4xl md:text-8xl lg:text-9xl font-light tracking-[0.2em] md:tracking-[0.3em] text-white uppercase"
          >
            ELEMENT
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.25 }}
            className="mt-4 text-lg md:text-xl tracking-[0.2em] font-light text-white/80"
          >
            Joyería con Alma
          </motion.p>

          {/* Rotating phrase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
            className="mt-6 h-8 overflow-hidden flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-sm md:text-base tracking-[0.25em] font-light text-white/60 uppercase"
              >
                {rotatingPhrases[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiChevronDown className="text-white/60 w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Section 2: Brand Statement ───────────────────────────────────── */}
      <BrandStatement />

      {/* ── Section 3: World Cup Edition ────────────────────────────────── */}
      <WorldCupSection />

      {/* ── Section 4: Featured Products ────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gray-900 px-6 md:px-12">
        <p className="text-sm tracking-[0.2em] uppercase text-white mb-10">
          Lo Más Buscado
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* ── Section 5: Full-width Banner ─────────────────────────────────── */}
      <section
        className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1600&q=80)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center gap-8 px-6">
          <h2 className="text-3xl md:text-5xl font-light tracking-[0.15em] text-white">
            Colección Completa
          </h2>
          <Link
            to="/coleccion"
            className="border border-white text-white px-8 py-3 text-sm tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Ver Todo
          </Link>
        </div>
      </section>
    </main>
  )
}
