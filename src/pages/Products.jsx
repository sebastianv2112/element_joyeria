import { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSliders, FiX } from 'react-icons/fi'
import { categories, filterOptions, formatPrice } from '../data/products.js'
import { useProducts } from '../hooks/useProducts.js'

export default function Products() {
  const { products } = useProducts()
  const [activeCategory, setActiveCategory] = useState('todos')
  const [filters, setFilters] = useState({ size: 'todos', color: 'todos', material: 'todos' })
  const [showFilters, setShowFilters] = useState(false)
  const gridRef = useRef(null)
  const tabBarRef = useRef(null)

  const activeFilterCount = Object.values(filters).filter(v => v !== 'todos').length

  const scrollToTabs = () => {
    if (tabBarRef.current) {
      const navHeight = 64
      const top = tabBarRef.current.getBoundingClientRect().top + window.scrollY - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId)
    scrollToTabs()
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    scrollToTabs()
  }

  const clearFilters = () => {
    setFilters({ size: 'todos', color: 'todos', material: 'todos' })
    scrollToTabs()
  }

  const filtered = useMemo(() => {
    let result = products
    if (activeCategory !== 'todos') {
      result = result.filter((p) => p.category === activeCategory)
    }
    if (filters.size !== 'todos') {
      result = result.filter((p) => p.size === filters.size)
    }
    if (filters.color !== 'todos') {
      result = result.filter((p) => p.color === filters.color)
    }
    if (filters.material !== 'todos') {
      result = result.filter((p) => p.material.includes(filters.material))
    }
    return result
  }, [activeCategory, filters])

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Page Header */}
      <div className="pt-32 pb-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.15em] text-white">
          Colección
        </h1>
        <p className="mt-3 text-gray-500 text-sm tracking-wide">
          Brazaletes diseñados con intención
        </p>
      </div>

      {/* Category Filter Bar */}
      <div ref={tabBarRef} className="sticky top-16 z-40 bg-gray-950/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center">
          <div className="overflow-x-auto scrollbar-none flex-1">
            <div className="flex items-center gap-1 px-4 md:px-8 lg:px-16 py-4 min-w-max">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
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
          <button
            onClick={() => { setShowFilters(!showFilters); scrollToTabs() }}
            className="flex items-center gap-2 px-4 md:px-8 py-4 text-gray-400 hover:text-white transition-colors shrink-0 border-l border-white/5"
          >
            <FiSliders size={16} />
            <span className="text-xs tracking-wider uppercase hidden md:inline">Filtros</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 bg-white text-black text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Expandable Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/5"
            >
              <div className="px-4 md:px-8 lg:px-16 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Size Filter */}
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-3">Tamaño</p>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.size.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => handleFilterChange('size', opt.id)}
                        className={`text-xs px-3 py-1.5 border transition-all duration-200 ${
                          filters.size === opt.id
                            ? 'border-white bg-white text-black'
                            : 'border-white/20 text-gray-400 hover:border-white/50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-3">Color</p>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.color.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => handleFilterChange('color', opt.id)}
                        className={`text-xs px-3 py-1.5 border transition-all duration-200 ${
                          filters.color === opt.id
                            ? 'border-white bg-white text-black'
                            : 'border-white/20 text-gray-400 hover:border-white/50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Filter */}
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-3">Material</p>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.material.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => handleFilterChange('material', opt.id)}
                        className={`text-xs px-3 py-1.5 border transition-all duration-200 ${
                          filters.material === opt.id
                            ? 'border-white bg-white text-black'
                            : 'border-white/20 text-gray-400 hover:border-white/50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {activeFilterCount > 0 && (
                <div className="px-4 md:px-8 lg:px-16 pb-4">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    <FiX size={12} />
                    Limpiar filtros
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      <div className="px-4 md:px-8 lg:px-16 pt-6 pb-2">
        <p className="text-xs text-gray-400 tracking-wide">
          Mostrando {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Product Grid */}
      <div className="px-4 md:px-8 lg:px-16 py-8" ref={gridRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + JSON.stringify(filters)}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
          >
            {filtered.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 text-sm">No se encontraron productos con estos filtros.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-xs tracking-wider uppercase text-white border-b border-white pb-0.5 hover:opacity-60 transition-opacity"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              filtered.map((product, index) => (
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
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
