import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6"
      >
        <h1 className="text-7xl md:text-9xl font-light tracking-[0.2em] text-white/10">
          404
        </h1>
        <p className="text-sm text-gray-500 tracking-wide">
          Esta página no existe o fue movida
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            to="/"
            className="border border-white text-white px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-200"
          >
            Inicio
          </Link>
          <Link
            to="/coleccion"
            className="border border-white/20 text-gray-400 px-8 py-3 text-xs tracking-[0.2em] uppercase hover:border-white hover:text-white transition-colors duration-200"
          >
            Ver colección
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
