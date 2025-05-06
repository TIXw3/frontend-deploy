import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`${darkMode ? "bg-gray-900" : "bg-gray-800"} text-gray-300`}>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Sobre</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Trabalhe Conosco
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          {/* Para Produtores */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Para Produtores</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  Criar Evento
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Soluções
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Cases de Sucesso
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Preços
                </a>
              </li>
            </ul>
          </div>

          {/* Para Participantes */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Para Participantes
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  Eventos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Maringá, PR - Brasil</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} />
                <a
                  href="mailto:contato@tixup.com"
                  className="hover:text-white transition"
                >
                  ingressos@tixup.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                <a
                  href="tel:+44998655441"
                  className="hover:text-white transition"
                >
                  (44) 99865-5441
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Youtube size={24} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              © {currentYear} TixUp. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
