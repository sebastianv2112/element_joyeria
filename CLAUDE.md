# Element Joyería — Convenciones de código

## Stack
- Vite 6 + React + React Router DOM (BrowserRouter con basename `/element_joyeria`)
- Tailwind CSS v4 con @tailwindcss/vite
- Framer Motion para animaciones
- Supabase (PostgreSQL) para datos con fallback a data estática
- Fuente: Oswald (Google Fonts)
- Deploy: GitHub Pages via GitHub Actions

## Tipografía — Tamaños mínimos obligatorios
- **Títulos de producto en grids/cards**: `text-base md:text-lg` (nunca `text-sm`)
- **Precios en grids/cards**: `text-sm` (nunca `text-xs`)
- **Descripciones de producto**: `text-base` (nunca `text-sm` ni `text-xs`)
- **Especificaciones (Material, Color, Tamaño)**: `text-sm` (nunca `text-xs`)
- **Labels de filtros y navegación**: `text-xs` es aceptable
- **Uppercase**: Solo en h1-h6, nav, button, a, label, th, legend (definido en index.css)
- **Párrafos y spans**: Siempre `text-transform: none`

## Imágenes
- Todas las `<img>` deben tener `loading="lazy"`
- Verificar que las URLs de Unsplash estén activas (curl status 200) antes de usar
- Alt text descriptivo siempre

## Supabase
- Schema usa snake_case (`country_code`), componentes usan camelCase (`countryCode`)
- Mapear campos al traer datos de Supabase si es necesario
- Siempre tener fallback a data estática en caso de error

## Componentes — Patrones
- WhatsApp número: `573058544529`
- WhatsApp link: usar `getWhatsAppLink(product)` de `data/products.js`
- Modales: usar bottom sheet con spring animation (InfoSheet pattern)
- CTA fijo mobile: usar IntersectionObserver, solo visible cuando CTA principal sale del viewport

## Antes de commit
- Verificar que no haya imports inexistentes (ej: `FiRuler` no existe en react-icons)
- Verificar URLs de imágenes externas con curl
- Probar en viewport mobile (375px) y desktop (1280px)
- No dejar `console.log` en producción
