import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const sizes = [
  { label: 'S', circumference: '15 – 16.5 cm', description: 'Muñeca delgada' },
  { label: 'M', circumference: '16.5 – 18 cm', description: 'Muñeca promedio' },
  { label: 'L', circumference: '18 – 20 cm', description: 'Muñeca ancha' },
]

export default function SizeGuide({ onClose }) {
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
        className="bg-gray-950 w-full md:max-w-md md:rounded-lg border border-white/10 max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-gray-950">
          <h3 className="text-sm tracking-[0.15em] text-white">Guía de tallas</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <p className="text-sm text-gray-400 leading-relaxed">
            Mide la circunferencia de tu muñeca con una cinta métrica o un hilo y una regla.
          </p>

          <div className="flex flex-col gap-1">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 pb-2 border-b border-white/10">
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500">Talla</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500">Circunferencia</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500">Referencia</span>
            </div>
            {sizes.map(s => (
              <div key={s.label} className="grid grid-cols-3 gap-4 py-3 border-b border-white/5">
                <span className="text-sm text-white font-medium">{s.label}</span>
                <span className="text-sm text-gray-300">{s.circumference}</span>
                <span className="text-sm text-gray-500">{s.description}</span>
              </div>
            ))}
          </div>

          {/* Visual */}
          <div className="bg-gray-900 rounded p-4 flex flex-col items-center gap-3">
            <div className="flex items-end gap-3">
              {sizes.map(s => (
                <div key={s.label} className="flex flex-col items-center gap-1">
                  <div
                    className="border border-white/20 rounded-full"
                    style={{
                      width: s.label === 'S' ? 48 : s.label === 'M' ? 56 : 64,
                      height: s.label === 'S' ? 48 : s.label === 'M' ? 56 : 64,
                    }}
                  />
                  <span className="text-xs text-gray-400">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 tracking-wider text-center mt-1">
              Si estás entre dos tallas, elige la más grande
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
