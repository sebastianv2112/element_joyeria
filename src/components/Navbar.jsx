import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = "text-white";
  const bgClass = scrolled || !isHome
    ? "bg-gray-950/90 backdrop-blur-md border-b border-white/5"
    : "bg-transparent";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${bgClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`text-sm font-light tracking-[0.3em] uppercase transition-colors duration-300 ${textColor}`}
          >
            ELEMENT
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            <li>
              <Link
                to="/"
                className={`text-xs tracking-widest uppercase font-light transition-colors duration-300 hover:opacity-60 ${textColor}`}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/coleccion"
                className={`text-xs tracking-widest uppercase font-light transition-colors duration-300 hover:opacity-60 ${textColor}`}
              >
                Colección
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`md:hidden transition-colors duration-300 ${textColor}`}
            aria-label="Abrir menú"
          >
            <HiMenuAlt4 size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-50 bg-gray-950 flex flex-col items-center justify-center transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-6 text-white"
          aria-label="Cerrar menú"
        >
          <HiX size={28} />
        </button>

        <ul className="flex flex-col items-center gap-10">
          <li>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-light tracking-[0.25em] uppercase text-white hover:opacity-50 transition-opacity"
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/coleccion"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-light tracking-[0.25em] uppercase text-white hover:opacity-50 transition-opacity"
            >
              Colección
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
