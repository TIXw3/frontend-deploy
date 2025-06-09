import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Star } from "iconsax-react";
import evento1 from "/src/shared/assets/evento1.jpg";
import evento2 from "/src/shared/assets/evento2.jpg";
import evento3 from "/src/shared/assets/evento3.webp";
import evento4 from "/src/shared/assets/evento4.jpg";

interface EventData {
  id: string;
  nome: string;
  imagem: string;
  date: string;
  price: string;
  city: string;
  organizer: string;
}

interface Feedback {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const allEvents: EventData[] = [
  { id: "1", nome: "Festival de Música", imagem: evento1, date: "15 de Março, 2024", price: "R$ 150,00", city: "São Paulo, SP", organizer: "EventPro Produções" },
  { id: "2", nome: "Peça Teatral", imagem: evento2, date: "22 de Março, 2024", price: "R$ 80,00", city: "Rio de Janeiro, RJ", organizer: "EventPro Produções" },
  { id: "3", nome: "Show de Rock", imagem: evento3, date: "30 de Março, 2024", price: "R$ 200,00", city: "Belo Horizonte, MG", organizer: "EventPro Produções" },
  { id: "4", nome: "Corrida Beneficente", imagem: evento4, date: "5 de Abril, 2024", price: "R$ 50,00", city: "Curitiba, PR", organizer: "EventPro Produções" },
  { id: "5", nome: "Evento 1", imagem: evento1, date: "10 de Abril, 2024", price: "R$ 100,00", city: "Porto Alegre, RS", organizer: "EventPro Produções" },
  { id: "6", nome: "Evento 2", imagem: evento2, date: "12 de Abril, 2024", price: "R$ 120,00", city: "Salvador, BA", organizer: "EventPro Produções" },
  { id: "7", nome: "Evento 3", imagem: evento3, date: "15 de Abril, 2024", price: "R$ 90,00", city: "Fortaleza, CE", organizer: "EventPro Produções" },
  { id: "8", nome: "Evento 4", imagem: evento4, date: "18 de Abril, 2024", price: "R$ 110,00", city: "Recife, PE", organizer: "EventPro Produções" },
  { id: "9", nome: "Evento 5", imagem: evento1, date: "20 de Abril, 2024", price: "R$ 130,00", city: "Brasília, DF", organizer: "EventPro Produções" },
  { id: "10", nome: "Evento 6", imagem: evento2, date: "22 de Abril, 2024", price: "R$ 140,00", city: "Manaus, AM", organizer: "EventPro Produções" },
  { id: "11", nome: "Evento 7", imagem: evento3, date: "25 de Abril, 2024", price: "R$ 95,00", city: "Belém, PA", organizer: "EventPro Produções" },
  { id: "12", nome: "Evento 8", imagem: evento4, date: "28 de Abril, 2024", price: "R$ 115,00", city: "Goiânia, GO", organizer: "EventPro Produções" },
  { id: "13", nome: "Concerto", imagem: evento2, date: "1 de Maio, 2024", price: "R$ 180,00", city: "Campinas, SP", organizer: "EventPro Produções" },
  { id: "14", nome: "DJ Set", imagem: evento4, date: "5 de Maio, 2024", price: "R$ 160,00", city: "São Luís, MA", organizer: "EventPro Produções" },
  { id: "15", nome: "Banda Independente", imagem: evento1, date: "10 de Maio, 2024", price: "R$ 70,00", city: "Natal, RN", organizer: "EventPro Produções" },
  { id: "16", nome: "Drama", imagem: evento3, date: "15 de Maio, 2024", price: "R$ 90,00", city: "Maceió, AL", organizer: "EventPro Produções" },
  { id: "17", nome: "Comédia", imagem: evento4, date: "20 de Maio, 2024", price: "R$ 85,00", city: "Teresina, PI", organizer: "EventPro Produções" },
  { id: "18", nome: "Monólogo", imagem: evento1, date: "25 de Maio, 2024", price: "R$ 75,00", city: "João Pessoa, PB", organizer: "EventPro Produções" },
  { id: "19", nome: "Improviso", imagem: evento2, date: "30 de Maio, 2024", price: "R$ 65,00", city: "Aracaju, SE", organizer: "EventPro Produções" },
  { id: "20", nome: "Futebol", imagem: evento3, date: "1 de Junho, 2024", price: "R$ 40,00", city: "Cuiabá, MT", organizer: "EventPro Produções" },
  { id: "21", nome: "Basquete", imagem: evento2, date: "5 de Junho, 2024", price: "R$ 45,00", city: "São Paulo, SP", organizer: "EventPro Produções" },
  { id: "22", nome: "Vôlei", imagem: evento1, date: "10 de Junho, 2024", price: "R$ 35,00", city: "Rio de Janeiro, RJ", organizer: "EventPro Produções" },
  { id: "23", nome: "Maratona", imagem: evento4, date: "15 de Junho, 2024", price: "R$ 60,00", city: "Belo Horizonte, MG", organizer: "EventPro Produções" },
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `${i + 24}`,
    nome: `Evento ${i + 9}`,
    imagem: [evento1, evento2, evento3, evento4][i % 4],
    date: `10 de ${["Junho", "Julho", "Agosto"][i % 3]}, 2024`,
    price: `R$ ${(50 + (i * 10) % 150).toFixed(2)}`,
    city: ["São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR"][i % 4],
    organizer: "EventPro Produções",
  })),
];

const feedbackData: Feedback[] = [
  {
    id: "1",
    user: "Ana S.",
    rating: 5,
    comment: "Organização impecável no Festival de Música! Tudo bem coordenado e a comunicação foi excelente.",
    date: "20 de Março, 2024",
  },
  {
    id: "2",
    user: "Carlos M.",
    rating: 4,
    comment: "A Peça Teatral foi incrível, mas a entrada demorou um pouco. No geral, ótima experiência!",
    date: "25 de Março, 2024",
  },
  {
    id: "3",
    user: "Mariana L.",
    rating: 5,
    comment: "A Corrida Beneficente foi um sucesso! EventPro sempre entrega eventos memoráveis.",
    date: "10 de Abril, 2024",
  },
  {
    id: "4",
    user: "João P.",
    rating: 4,
    comment: "Show de Rock foi ótimo, mas o som poderia ser melhor ajustado. Ainda assim, recomendo!",
    date: "5 de Abril, 2024",
  },
];

const OrganizerProfile: React.FC = () => {
  useParams<{ organizerId: string }>();
  const organizerEvents = allEvents.filter((event) => event.organizer === "EventPro Produções").slice(0, 6); // Show only 6 events for summary

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900 min-h-screen">
      {/* Organizer Summary */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8 md:mb-12 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
            EP
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              EventPro Produções
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Organizador de Eventos
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mt-1">
              47 eventos organizados
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={i < 4 ? "text-yellow-400 fill-current" : i === 4 ? "text-yellow-400 fill-current opacity-80" : "text-gray-300"}
                  size={20}
                />
              ))}
              <span className="text-gray-800 dark:text-gray-100 text-sm sm:text-base ml-2">
                4.8/5 (120 avaliações)
              </span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base text-center sm:text-left">
          EventPro Produções é especializada em criar experiências inesquecíveis, desde festivais de música até eventos esportivos e teatrais. Com 47 eventos realizados, nossa missão é conectar pessoas através de momentos únicos.
        </p>
      </motion.section>

      {/* User Feedback */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6 sm:mb-8 md:mb-12"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100">
          Avaliações dos Usuários
        </h2>
        <div className="space-y-4 sm:space-y-6">
          {feedbackData.map((feedback) => (
            <motion.div
              key={feedback.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * parseInt(feedback.id) }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-white text-sm font-bold">
                    {feedback.user[0]}
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-100 font-semibold text-sm sm:text-base">
                      {feedback.user}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                      {feedback.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                      size={16}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                {feedback.comment}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="text-orange-500 dark:text-orange-400 hover:underline text-sm sm:text-base">
            Ver todas as avaliações
          </button>
        </div>
      </motion.section>

      {/* Featured Events */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100">
          Eventos em Destaque
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {organizerEvents.map((evento, index) => (
            <motion.div
              key={evento.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={evento.imagem}
                  alt={evento.nome}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-2 sm:p-3 md:p-4 space-y-1">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-base sm:text-lg md:text-xl">
                  {evento.nome}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base">
                  {evento.date}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm md:text-base">
                  {evento.city}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-orange-500 dark:text-orange-400 font-semibold text-sm sm:text-base md:text-lg">
                    {evento.price}
                  </p>
                  <Link
                    to="/detalhes-evento"
                    state={{ event: evento }}
                    className="bg-orange-500 text-white px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-lg text-xs sm:text-sm hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link
            to="/eventos-organizador/eventpro-producoes"
            className="text-orange-500 dark:text-orange-400 hover:underline text-sm sm:text-base"
          >
            Ver todos os eventos
          </Link>
        </div>
      </motion.section>
    </main>
  );
};

export default OrganizerProfile;