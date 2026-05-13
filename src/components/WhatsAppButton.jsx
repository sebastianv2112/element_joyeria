import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io5";

const WA_URL =
  "https://wa.me/573058544529?text=Hola%2C%20quiero%20información%20sobre%20sus%20brazaletes";

export default function WhatsAppButton() {
  const { pathname } = useLocation();
  const isProductPage = pathname.includes("/producto/");

  if (isProductPage) return null;

  return (
    <motion.a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg"
      style={{ backgroundColor: "#25D366" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <IoLogoWhatsapp size={28} color="white" />
    </motion.a>
  );
}
