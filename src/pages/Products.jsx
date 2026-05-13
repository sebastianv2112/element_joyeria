import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import products, { categories, formatPrice } from '../data/products.js'

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('todos')

  const filtered = useMemo(() => {
    if (activeCategory === 'todos') return products
    return products.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Page Header */}
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.15em] text-white">
          Colección
        </h1>
        <p className="mt-3 text-gray-500 text-sm tracking-wide">
          Brazaletes diseñados con intención
        </p>
      </div>

      {/* Category Filter Bar */}
      <div className="sticky top-16 z-40 bg-gray-950/80 backdrop-blur-md py-4 border-b border-white/5">
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 px-4 md:px-8 lg:px-16 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs tracking-[0.15em] uppercase px-4 py-2 transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-500 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="px-4 md:px-8 lg:px-16 pt-6 pb-2">
        <p className="text-xs text-gray-400 tracking-wide">
          Mostrando {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Product Grid */}
      <div className="px-4 md:px-8 lg:px-16 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
          >
            {filtered.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  to={`/producto/${product.slug}`}
                  className="block group"
                >
                  {/* Image Container */}
                  <div className="aspect-[3/4] overflow-hidden bg-gray-800 relative">
                    {product.new && (
                      <span className="absolute top-2 left-2 z-10 text-[10px] tracking-wider uppercase bg-white text-black px-2 py-1">
                        Nuevo
                      </span>
                    )}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-3">
                    <p className="text-sm font-light text-white group-hover:underline underline-offset-2 transition-all duration-200">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
