import { Link } from "react-router-dom";
import { FiInstagram, FiMail } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-light tracking-[0.3em] uppercase">
              ELEMENT
            </span>
            <p className="text-xs text-white/50 font-light tracking-wide leading-relaxed">
              Joyería con alma
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
            </ul>
          </div>

          {/* Col 3 — Contact */}
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
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm font-light text-white/80 hover:text-white transition-colors"
              >
                <IoLogoWhatsapp size={16} />
                <span>WhatsApp</span>
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
            © 2024 Element Joyería. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
