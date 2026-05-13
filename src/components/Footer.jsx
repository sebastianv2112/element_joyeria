import { Link } from "react-router-dom";
import { FiInstagram, FiMail, FiTruck, FiShield, FiCreditCard } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/5">
      {/* Trust badges */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <FiTruck size={20} className="text-white/40 shrink-0" />
            <div>
              <p className="text-xs tracking-wider text-white">Envío a todo Colombia</p>
              <p className="text-[11px] text-white/40 mt-0.5">Entrega en 3-5 días hábiles</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FiShield size={20} className="text-white/40 shrink-0" />
            <div>
              <p className="text-xs tracking-wider text-white">Garantía de calidad</p>
              <p className="text-[11px] text-white/40 mt-0.5">Acero inoxidable resistente al agua</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FiCreditCard size={20} className="text-white/40 shrink-0" />
            <div>
              <p className="text-xs tracking-wider text-white">Pago seguro</p>
              <p className="text-[11px] text-white/40 mt-0.5">Transferencia, Nequi o Daviplata</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-light tracking-[0.3em] uppercase">
              ELEMENT
            </span>
            <p className="text-xs text-white/50 font-light tracking-wide leading-relaxed">
              Brazaletes de acero inoxidable diseñados con intención. Elegancia atemporal para quienes notan la diferencia.
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-white/40">
              Navegación
            </span>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/"
                  className="text-sm font-light text-white/80 hover:text-white transition-colors tracking-wide"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/coleccion"
                  className="text-sm font-light text-white/80 hover:text-white transition-colors tracking-wide"
                >
                  Colección
                </Link>
              </li>
              <li>
                <Link
                  to="/coleccion?cat=mundial"
                  className="text-sm font-light text-white/80 hover:text-white transition-colors tracking-wide"
                >
                  Mundial 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 — Info */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-white/40">
              Información
            </span>
            <ul className="flex flex-col gap-3">
              <li className="text-sm font-light text-white/60 tracking-wide">
                Envío: 3-5 días hábiles
              </li>
              <li className="text-sm font-light text-white/60 tracking-wide">
                Cambios dentro de 7 días
              </li>
              <li className="text-sm font-light text-white/60 tracking-wide">
                Atención: Lun-Sáb 9am-6pm
              </li>
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-light tracking-[0.2em] uppercase text-white/40">
              Contacto
            </span>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com/elementjoyeria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-light text-white/80 hover:text-white transition-colors"
              >
                <FiInstagram size={16} />
                <span>@elementjoyeria</span>
              </a>
              <a
                href="https://wa.me/573058544529"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-light text-white/80 hover:text-white transition-colors"
              >
                <IoLogoWhatsapp size={16} />
                <span>+57 305 854 4529</span>
              </a>
              <a
                href="mailto:hola@elementjoyeria.com"
                className="flex items-center gap-3 text-sm font-light text-white/80 hover:text-white transition-colors"
              >
                <FiMail size={16} />
                <span>hola@elementjoyeria.com</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <p className="text-xs text-white/30 font-light tracking-wide">
            © 2025 Element Joyería. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
