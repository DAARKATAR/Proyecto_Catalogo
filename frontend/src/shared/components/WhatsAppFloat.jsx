import React from 'react';
import { useLocation } from 'react-router-dom';
import './WhatsAppFloat.css';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  const location = useLocation();
  const url = `https://wa.me/573018265636?text=${encodeURIComponent("¡Hola! Quisiera más información sobre los repuestos y accesorios de su catálogo.")}`;

  // Ocultar en el panel de administrador y login
  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/login')) {
    return null;
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="whatsapp-float">
      <MessageCircle size={32} />
    </a>
  );
};

export default WhatsAppFloat;
