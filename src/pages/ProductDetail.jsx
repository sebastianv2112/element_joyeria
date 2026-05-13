import { useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IoLogoWhatsapp } from 'react-icons/io5'
import products, { formatPrice, getWhatsAppLink, worldCupProducts } from '../data/products.js'

const allProducts = [...products, ...worldCupProducts]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
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

export default function ProductDetail() {
  const { slug } = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const product = allProducts.find((p) => p.slug === slug)

  const relatedProducts = useMemo(() => {
    if (!product) return []
    const others = allProducts.filter((p) => p.id !== product.id)
    // Shuffle and take 4
    return [...others].sort(() => Math.random() - 0.5).slice(0, 4)
  }, [product])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 pt-24 bg-gray-950">
        <p className="text-sm text-gray-500 tracking-wide">Producto no encontrado</p>
        <Link
          to="/coleccion"
          className="text-xs tracking-[0.2em] uppercase border-b border-white pb-0.5 hover:opacity-60 transition-opacity text-white"
        >
          Volver a la colección
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-24 bg-gray-950 min-h-screen">
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

      {/* Main: two columns */}
      <div className="md:grid md:grid-cols-2 gap-0">
        {/* Left: Image */}
        <div className="aspect-[3/4] md:aspect-auto md:h-[calc(100vh-6rem)] md:sticky md:top-24 bg-gray-800 overflow-hidden">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </div>

        {/* Right: Product info */}
        <motion.div
          className="p-8 md:p-16 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-4xl font-light tracking-wide text-white"
          >
            {product.name}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-500 mt-4"
          >
            {formatPrice(product.price)}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="w-12 h-px bg-white/30 my-8"
          />

          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-400 leading-relaxed"
          >
            {product.description}
          </motion.p>

          {/* Details */}
          <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-2">
            <p className="text-xs text-gray-500 tracking-wide uppercase">
              Material: {product.material}
            </p>
            <p className="text-xs text-gray-500 tracking-wide uppercase">
              Color: {product.color}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-12">
            <motion.a
              href={getWhatsAppLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-white text-black py-4 text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <IoLogoWhatsapp size={18} />
              Consultar por WhatsApp
            </motion.a>
            <p className="text-[10px] text-gray-400 tracking-wider uppercase text-center mt-4">
              Envío a todo Colombia
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Related products */}
      <section className="py-16 px-4 md:px-8">
        <p className="text-xs tracking-[0.2em] uppercase text-white mb-8">
          También te puede gustar
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {relatedProducts.map((p) => (
            <RelatedCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
