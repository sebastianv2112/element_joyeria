import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { FiInfo, FiX, FiShare2, FiMaximize2 } from 'react-icons/fi'
import { formatPrice, getWhatsAppLink } from '../data/products.js'
import { useProduct, useRelatedProducts } from '../hooks/useProducts.js'
import SizeGuide from '../components/SizeGuide.jsx'

const loaderPhrases = [
  'El estilo no se busca, se encuentra',
  'Cada detalle cuenta una historia',
  'Diseñado para quienes notan la diferencia',
  'La elegancia está en lo sutil',
  'Tu próxima pieza te espera',
]

function Loader() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % loaderPhrases.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gray-950">
      <div className="w-8 h-8 border border-white/20 border-t-white animate-spin" />
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="text-sm text-gray-500 tracking-wide text-center px-8"
        >
          {loaderPhrases[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

function RelatedCard({ product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Link to={`/producto/${product.slug}`} className="block group">
        <div className="aspect-[3/4] overflow-hidden bg-gray-800">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="pt-3 pb-1">
          <p className="text-sm font-light text-white group-hover:underline underline-offset-2 transition-all duration-200">
            {product.name}
          </p>
          <p className="text-xs text-gray-500 mt-1">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.div>
  )
}

function BentoGallery({ images, name }) {
  return (
    <div className="grid grid-cols-2 gap-1 md:gap-2">
      <div className="col-span-2 aspect-[4/3] overflow-hidden bg-gray-800">
        <img
          src={images[0]}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>
      {images.slice(1, 4).map((img, i) => (
        <div
          key={i}
          className={`overflow-hidden bg-gray-800 ${
            i === 0 ? 'col-span-1 aspect-square' : i === 1 ? 'col-span-1 aspect-square' : 'col-span-2 aspect-[21/9]'
          }`}
        >
          <img
            src={img}
            alt={`${name} - ${i + 2}`}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      ))}
    </div>
  )
}

function InfoSheet({ product, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        className="bg-gray-950 w-full md:max-w-lg md:rounded-lg border border-white/10 max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-gray-950">
          <h3 className="text-sm tracking-[0.15em] text-white">Detalles del producto</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-2">Descripción</p>
            <p className="text-sm text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-1">Material</p>
              <p className="text-sm text-white">{product.material}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-1">Color</p>
              <p className="text-sm text-white">{product.color}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-1">Tamaño</p>
              <p className="text-sm text-white">{product.size}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-1">Categoría</p>
              <p className="text-sm text-white capitalize">{product.category}</p>
            </div>
          </div>

          {product.country && (
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-1">Edición</p>
              <p className="text-sm text-white">Mundial 2026 — {product.country}</p>
            </div>
          )}

          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-1">Envío</p>
            <p className="text-sm text-gray-300">Envío a todo Colombia</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const { product, loading } = useProduct(slug)
  const { products: relatedProducts } = useRelatedProducts(product?.id)
  const [showInfo, setShowInfo] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [showFixedBar, setShowFixedBar] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, text: product.description, url })
      } catch {}
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  const mobileCta = useRef(null)
  const desktopCta = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    const target = mobileCta.current || desktopCta.current
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowFixedBar(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [slug, product])

  if (loading || !product) {
    if (loading) return <Loader />
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-24 bg-gray-950">
        <p className="text-sm text-gray-500 tracking-wide">Producto no encontrado</p>
        <Link
          to="/coleccion"
          className="text-xs tracking-[0.2em] border-b border-white pb-0.5 hover:opacity-60 transition-opacity text-white"
        >
          Volver a la colección
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-20 bg-gray-950 min-h-screen">
      {/* Breadcrumb */}
      <div className="px-4 md:px-8 py-4">
        <p className="text-xs text-gray-500 tracking-wide">
          <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
          {' / '}
          <Link to="/coleccion" className="hover:text-white transition-colors">Colección</Link>
          {' / '}
          <span className="text-gray-300">{product.name}</span>
        </p>
      </div>

      {/* Mobile: Name + Price at top */}
      <div className="md:hidden px-4 pb-4">
        <h1 className="text-2xl font-light tracking-wide text-white">
          {product.name}
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Desktop layout: two columns */}
      <div className="md:grid md:grid-cols-5 gap-0">
        {/* Left: Bento Gallery (3 cols on desktop) */}
        <div className="md:col-span-3 px-4 md:pl-8 md:pr-4">
          <BentoGallery images={product.images} name={product.name} />
        </div>

        {/* Right: Product info (desktop only) */}
        <div className="hidden md:flex md:col-span-2 p-8 md:p-12 flex-col justify-start sticky top-24 self-start">
          <h1 className="text-3xl font-light tracking-wide text-white">
            {product.name}
          </h1>
          <p className="text-xl text-gray-500 mt-3">
            {formatPrice(product.price)}
          </p>

          <div className="w-12 h-px bg-white/30 my-8" />

          <p className="text-base text-gray-400 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-sm text-gray-500 tracking-wide">Material</span>
              <span className="text-sm text-white">{product.material}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-sm text-gray-500 tracking-wide">Color</span>
              <span className="text-sm text-white">{product.color}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-sm text-gray-500 tracking-wide">Tamaño</span>
              <span className="text-sm text-white">{product.size}</span>
            </div>
            {product.country && (
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-gray-500 tracking-wide">Edición</span>
                <span className="text-sm text-white">Mundial 2026 — {product.country}</span>
              </div>
            )}
          </div>

          {/* Size guide + Share */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setShowSizeGuide(true)}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors tracking-wider"
            >
              <FiMaximize2 size={14} />
              Guía de tallas
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors tracking-wider"
            >
              <FiShare2 size={14} />
              {copied ? 'Enlace copiado' : 'Compartir'}
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="mt-8" ref={desktopCta}>
            <a
              href={getWhatsAppLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-black py-4 text-sm tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors duration-200"
            >
              <IoLogoWhatsapp size={18} />
              Consultar por WhatsApp
            </a>
            <p className="text-[10px] text-gray-400 tracking-wider text-center mt-4">
              Envío a todo Colombia
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: inline CTA */}
      <div className="md:hidden px-4 mt-6" ref={mobileCta}>
        <a
          href={getWhatsAppLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white text-black py-4 text-sm tracking-[0.2em] flex items-center justify-center gap-3"
        >
          <IoLogoWhatsapp size={18} />
          Consultar por WhatsApp
        </a>
      </div>

      {/* Mobile: Share + Size guide */}
      <div className="md:hidden px-4 pt-6 flex gap-4">
        <button
          onClick={() => setShowSizeGuide(true)}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors tracking-wider"
        >
          <FiMaximize2 size={14} />
          Guía de tallas
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors tracking-wider"
        >
          <FiShare2 size={14} />
          {copied ? 'Enlace copiado' : 'Compartir'}
        </button>
      </div>

      {/* Mobile: Product details section */}
      <div className="md:hidden px-4 py-8">
        <div className="w-12 h-px bg-white/30 mb-6" />
        <p className="text-base text-gray-400 leading-relaxed mb-6">{product.description}</p>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-sm text-gray-500 tracking-wide">Material</span>
            <span className="text-sm text-white">{product.material}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-sm text-gray-500 tracking-wide">Color</span>
            <span className="text-sm text-white">{product.color}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <span className="text-sm text-gray-500 tracking-wide">Tamaño</span>
            <span className="text-sm text-white">{product.size}</span>
          </div>
          {product.country && (
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-sm text-gray-500 tracking-wide">Edición</span>
              <span className="text-sm text-white">Mundial 2026 — {product.country}</span>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      <section className="py-16 px-4 md:px-8">
        <p className="text-xs tracking-[0.2em] text-white mb-8">
          También te puede gustar
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {relatedProducts.map((p) => (
            <RelatedCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Mobile Fixed Bottom Bar */}
      {showFixedBar && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gray-950/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex gap-2"
        >
          <a
            href={getWhatsAppLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-white text-black py-3 text-xs tracking-[0.15em] flex items-center justify-center gap-2"
          >
            <IoLogoWhatsapp size={16} />
            Consultar
          </a>
          <button
            onClick={() => setShowInfo(true)}
            className="w-12 flex items-center justify-center border border-white/20 text-white"
          >
            <FiInfo size={18} />
          </button>
        </motion.div>
      )}

      {/* Info Sheet Modal */}
      <AnimatePresence>
        {showInfo && (
          <InfoSheet product={product} onClose={() => setShowInfo(false)} />
        )}
      </AnimatePresence>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <SizeGuide onClose={() => setShowSizeGuide(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
