import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowCircleRight, ArrowCircleLeft, Heart, Calendar, Ticket } from "iconsax-react";
import evento1 from "/src/shared/assets/evento1.jpg";
import evento2 from "/src/shared/assets/evento2.jpg";
import evento3 from "/src/shared/assets/evento3.webp";
import evento4 from "/src/shared/assets/evento4.jpg";
import { Categories } from "../widgets/Categories/Categories";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface EventData {
  id: string;
  nome: string;
  cor?: string;
  imagem: string;
  date: string;
  price: string;
  city: string;
}

const allEvents: EventData[] = [
  { id: "1", nome: "Festival de Música", cor: "bg-gradient-to-r from-30% from-black bg-orange-500", imagem: evento1, date: "15 de Março, 2024", price: "R$ 150,00", city: "São Paulo, SP" },
  { id: "2", nome: "Peça Teatral", cor: "bg-gradient-to-r from-30% from-black bg-orange-500", imagem: evento2, date: "22 de Março, 2024", price: "R$ 80,00", city: "Rio de Janeiro, RJ" },
  { id: "3", nome: "Show de Rock", cor: "bg-gradient-to-r from-30% from-black bg-orange-500", imagem: evento3, date: "30 de Março, 2024", price: "R$ 200,00", city: "Belo Horizonte, MG" },
  { id: "4", nome: "Corrida Beneficente", cor: "bg-gradient-to-r from-30% from-black bg-orange-500", imagem: evento4, date: "5 de Abril, 2024", price: "R$ 50,00", city: "Curitiba, PR" },
  { id: "5", nome: "Evento 1", imagem: evento1, date: "10 de Abril, 2024", price: "R$ 100,00", city: "Porto Alegre, RS" },
  { id: "6", nome: "Evento 2", imagem: evento2, date: "12 de Abril, 2024", price: "R$ 120,00", city: "Salvador, BA" },
  { id: "7", nome: "Evento 3", imagem: evento3, date: "15 de Abril, 2024", price: "R$ 90,00", city: "Fortaleza, CE" },
  { id: "8", nome: "Evento 4", imagem: evento4, date: "18 de Abril, 2024", price: "R$ 110,00", city: "Recife, PE" },
  { id: "9", nome: "Evento 5", imagem: evento1, date: "20 de Abril, 2024", price: "R$ 130,00", city: "Brasília, DF" },
  { id: "10", nome: "Evento 6", imagem: evento2, date: "22 de Abril, 2024", price: "R$ 140,00", city: "Manaus, AM" },
  { id: "11", nome: "Evento 7", imagem: evento3, date: "25 de Abril, 2024", price: "R$ 95,00", city: "Belém, PA" },
  { id: "12", nome: "Evento 8", imagem: evento4, date: "28 de Abril, 2024", price: "R$ 115,00", city: "Goiânia, GO" },
  { id: "13", nome: "Concerto", imagem: evento2, date: "1 de Maio, 2024", price: "R$ 180,00", city: "Campinas, SP" },
  { id: "14", nome: "DJ Set", imagem: evento4, date: "5 de Maio, 2024", price: "R$ 160,00", city: "São Luís, MA" },
  { id: "15", nome: "Banda Independente", imagem: evento1, date: "10 de Maio, 2024", price: "R$ 70,00", city: "Natal, RN" },
  { id: "16", nome: "Drama", imagem: evento3, date: "15 de Maio, 2024", price: "R$ 90,00", city: "Maceió, AL" },
  { id: "17", nome: "Comédia", imagem: evento4, date: "20 de Maio, 2024", price: "R$ 85,00", city: "Teresina, PI" },
  { id: "18", nome: "Monólogo", imagem: evento1, date: "25 de Maio, 2024", price: "R$ 75,00", city: "João Pessoa, PB" },
  { id: "19", nome: "Improviso", imagem: evento2, date: "30 de Maio, 2024", price: "R$ 65,00", city: "Aracaju, SE" },
  { id: "20", nome: "Futebol", imagem: evento3, date: "1 de Junho, 2024", price: "R$ 40,00", city: "Cuiabá, MT" },
  { id: "21", nome: "Basquete", imagem: evento2, date: "5 de Junho, 2024", price: "R$ 45,00", city: "São Paulo, SP" },
  { id: "22", nome: "Vôlei", imagem: evento1, date: "10 de Junho, 2024", price: "R$ 35,00", city: "Rio de Janeiro, RJ" },
  { id: "23", nome: "Maratona", imagem: evento4, date: "15 de Junho, 2024", price: "R$ 60,00", city: "Belo Horizonte, MG" },
];

const eventos: EventData[] = [
  allEvents[0], // Festival de Música
  allEvents[1], // Peça Teatral
  allEvents[2], // Show de Rock
  allEvents[3], // Corrida Beneficente
];

const eventosPopulares: EventData[] = [
  allEvents[4], // Evento 1
  allEvents[5], // Evento 2
  allEvents[6], // Evento 3
  allEvents[7], // Evento 4
  allEvents[8], // Evento 5
  allEvents[9], // Evento 6
  allEvents[10], // Evento 7
  allEvents[11], // Evento 8
];

const categorias = [
  {
    nome: "Música",
    eventos: [
      allEvents[2], // Show de Rock
      allEvents[0], // Festival de Música
      allEvents[12], // Concerto
      allEvents[13], // DJ Set
      allEvents[14], // Banda Independente
    ],
  },
  {
    nome: "Teatro",
    eventos: [
      allEvents[1], // Peça Teatral
      allEvents[15], // Drama
      allEvents[16], // Comédia
      allEvents[17], // Monólogo
      allEvents[18], // Improviso
    ],
  },
  {
    nome: "Esportes",
    eventos: [
      allEvents[3], // Corrida Beneficente
      allEvents[19], // Futebol
      allEvents[20], // Basquete
      allEvents[21], // Vôlei
      allEvents[22], // Maratona
    ],
  },
];

interface HomeProps {
  onLikeToggle: (
    eventoId: string,
    isLiked: boolean,
    eventInfo: { name: string; image: string; date: string; price: string }
  ) => void;
  likedEvents: { id: string; name: string; image: string; date: string; price: string }[];
  searchTerm: string;
  selectedCity: string | null;
}

const Home: React.FC<HomeProps> = ({ onLikeToggle, likedEvents, searchTerm, selectedCity }) => {
  const [eventoAtual, setEventoAtual] = useState<number>(0);
  const [inicioCarrossel, setInicioCarrossel] = useState<number>(0);
  const [inicioCarrosselCategoria, setInicioCarrosselCategoria] = useState<number[]>([0, 0, 0]);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>(
    likedEvents.reduce((acc, event) => ({ ...acc, [event.id]: true }), {})
  );
  const [visiveis, setVisiveis] = useState<number>(4);

  // Animation variants for staggered text animations
  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textItemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  useEffect(() => {
    // Preload images for smooth transitions
    eventos.forEach((evento) => {
      const img = new Image();
      img.src = evento.imagem;
    });

    const interval = setInterval(() => {
      setEventoAtual((prev) => (prev + 1) % eventos.length);
    }, 5000);

    const handleResize = () => {
      if (window.innerWidth < 640) setVisiveis(1);
      else if (window.innerWidth < 768) setVisiveis(2);
      else if (window.innerWidth < 1024) setVisiveis(3);
      else setVisiveis(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const avancar = () => {
    setInicioCarrossel((prev) => {
      const novoInicio = prev + 1;
      if (novoInicio + visiveis <= eventosPopulares.length) {
        return novoInicio;
      } else {
        return 0;
      }
    });
  };

  const voltar = () => {
    setInicioCarrossel((prev) => {
      const novoInicio = prev - 1;
      if (novoInicio >= 0) {
        return novoInicio;
      } else {
        return eventosPopulares.length - visiveis;
      }
    });
  };

  const avancarCategoria = (categoriaIndex: number) => {
    const novaPosicao = [...inicioCarrosselCategoria];
    novaPosicao[categoriaIndex] = novaPosicao[categoriaIndex] + 1;
    if (novaPosicao[categoriaIndex] + visiveis > categorias[categoriaIndex].eventos.length) {
      novaPosicao[categoriaIndex] = 0;
    }
    setInicioCarrosselCategoria(novaPosicao);
  };

  const voltarCategoria = (categoriaIndex: number) => {
    const novaPosicao = [...inicioCarrosselCategoria];
    novaPosicao[categoriaIndex] = novaPosicao[categoriaIndex] - 1;
    if (novaPosicao[categoriaIndex] < 0) {
      novaPosicao[categoriaIndex] = categorias[categoriaIndex].eventos.length - visiveis;
    }
    setInicioCarrosselCategoria(novaPosicao);
  };

  const toggleLike = (
    eventoId: string,
    eventInfo: { name: string; image: string; date: string; price: string }
  ) => {
    setLikes((prevLikes) => {
      const newLikes = {
        ...prevLikes,
        [eventoId]: !prevLikes[eventoId],
      };
      onLikeToggle(eventoId, newLikes[eventoId], eventInfo);
      return newLikes;
    });
  };

  const filteredEvents: EventData[] = allEvents.filter(
    (evento) =>
      evento.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCity ? evento.city === selectedCity : true)
  );

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900">
      {/* Hero Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8 lg:mb-12"
      >
        <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative rounded-2xl overflow-hidden shadow-2xl">
          <AnimatePresence initial={false}>
            <motion.div
              key={eventoAtual}
              initial={{ x: "100%", opacity: 0, scale: 1.05 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
            >
              <img
                src={eventos[eventoAtual].imagem}
                alt={eventos[eventoAtual].nome}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 text-white"
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h2
                  variants={textItemVariants}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4"
                >
                  {eventos[eventoAtual].nome}
                </motion.h2>
                <motion.div
                  variants={textItemVariants}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                >
                  <motion.p variants={textItemVariants} className="text-sm sm:text-base md:text-lg">
                    {eventos[eventoAtual].date}
                  </motion.p>
                  <motion.p variants={textItemVariants} className="text-sm sm:text-base md:text-lg">
                    {eventos[eventoAtual].price}
                  </motion.p>
                  <motion.div variants={textItemVariants}>
                    <Link
                      to="/detalhes-evento"
                      state={{ event: eventos[eventoAtual] }}
                      className="bg-orange-500 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-2 rounded-lg text-sm sm:text-base hover:bg-orange-600 transition-colors"
                      aria-label={`Ver ingressos para ${eventos[eventoAtual].nome}`}
                    >
                      Ver ingressos
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
              <button
                onClick={() =>
                  toggleLike(`main-${eventoAtual}`, {
                    name: eventos[eventoAtual].nome,
                    image: eventos[eventoAtual].imagem,
                    date: eventos[eventoAtual].date,
                    price: eventos[eventoAtual].price,
                  })
                }
                className="absolute top-2 right-2 p-1 sm:p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                aria-label="Favoritar evento"
              >
                <Heart
                  className={likes[`main-${eventoAtual}`] ? "text-red-500 fill-current" : "text-gray-600 dark:text-gray-300"}
                  size={window.innerWidth >= 1024 ? 24 : window.innerWidth >= 640 ? 20 : 16}
                />
              </button>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
            {eventos.map((_, index) => (
              <button
                key={index}
                onClick={() => setEventoAtual(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all ${
                  index === eventoAtual
                    ? "bg-orange-500 w-4 sm:w-6 md:w-8"
                    : "bg-white/50 hover:bg-white/80 dark:bg-gray-400/50 dark:hover:bg-gray-400/80"
                }`}
                aria-label={`Ir para evento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      <Categories />

      {/* Search Results */}
      {searchTerm.trim() !== "" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 sm:mt-8 lg:mt-10"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100">Resultados da Pesquisa</h2>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredEvents.map((evento, index) => (
                <motion.div
                  key={evento.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-800 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={evento.imagem}
                      alt={evento.nome}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <button
                      onClick={() =>
                        toggleLike(evento.id, {
                          name: evento.nome,
                          image: evento.imagem,
                          date: evento.date,
                          price: evento.price,
                        })
                      }
                      className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
                      aria-label="Favoritar evento"
                    >
                      <Heart
                        className={likes[evento.id] ? "text-red-500 fill-current" : "text-gray-600 dark:text-gray-300"}
                        size={24}
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{evento.nome}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Calendar size={18} className="mr-2 text-gray-600 dark:text-gray-300" />
                        <span>{evento.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Ticket size={18} className="mr-2 text-gray-600 dark:text-gray-300" />
                        <span>A definir</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span>{evento.city}</span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-orange-500 dark:text-orange-400 font-semibold">{evento.price}</span>
                        <Link
                          to="/detalhes-evento"
                          state={{ event: evento }}
                          className="bg-orange-500 dark:bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition"
                          aria-label={`Comprar ingresso para ${evento.nome}`}
                        >
                          Comprar
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center py-4 sm:py-6 md:py-8 text-sm sm:text-base">Nenhum evento encontrado.</p>
          )}
        </motion.section>
      )}

      {/* Popular Events Carousel */}
      {searchTerm.trim() === "" && (
        <>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 sm:mt-8 lg:mt-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100 px-4 sm:px-8">Eventos Populares</h2>
            <div className="relative px-4 sm:px-8 md:px-12 lg:px-16">
              <div className="flex items-center">
                <button
                  onClick={voltar}
                  className="absolute left-0 z-10 transform -translate-x-2 sm:-translate-x-4 hover:scale-110 transition-transform"
                  aria-label="Eventos anteriores"
                >
                  <ArrowCircleLeft
                    size={window.innerWidth >= 1024 ? 48 : window.innerWidth >= 640 ? 40 : 32}
                    color="#ff6b00"
                    variant="Bold"
                  />
                </button>
                <div className="overflow-hidden w-full">
                  <motion.div
                    className="flex gap-4 sm:gap-6"
                    animate={{ x: `-${inicioCarrossel * (100 / visiveis)}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ width: `${(eventosPopulares.length / visiveis) * 100}%`, minWidth: "100%" }}
                  >
                    {eventosPopulares.map((evento) => (
                      <motion.div
                        key={evento.id}
                        className="flex-none w-[80%] sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)] bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-800 overflow-hidden"
                        whileHover={{ y: -5 }}
                      >
                        <div className="relative">
                          <img
                            src={evento.imagem}
                            alt={evento.nome}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                          />
                          <button
                            onClick={() =>
                              toggleLike(evento.id, {
                                name: evento.nome,
                                image: evento.imagem,
                                date: evento.date,
                                price: evento.price,
                              })
                            }
                            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
                            aria-label="Favoritar evento"
                          >
                            <Heart
                              className={likes[evento.id] ? "text-red-500 fill-current" : "text-gray-600 dark:text-gray-300"}
                              size={24}
                            />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{evento.nome}</h3>
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Calendar size={18} className="mr-2 text-gray-600 dark:text-gray-300" />
                              <span>{evento.date}</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Ticket size={18} className="mr-2 text-gray-600 dark:text-gray-300" />
                              <span>A definir</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <span>{evento.city}</span>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                              <span className="text-orange-500 dark:text-orange-400 font-semibold">{evento.price}</span>
                              <Link
                                to="/detalhes-evento"
                                state={{ event: evento }}
                                className="bg-orange-500 dark:bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition"
                                aria-label={`Comprar ingresso para ${evento.nome}`}
                              >
                                Comprar
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                <button
                  onClick={avancar}
                  className="absolute right-0 z-10 transform translate-x-2 sm:translate-x-4 hover:scale-110 transition-transform"
                  aria-label="Próximos eventos"
                >
                  <ArrowCircleRight
                    size={window.innerWidth >= 1024 ? 48 : window.innerWidth >= 640 ? 40 : 32}
                    color="#ff6b00"
                    variant="Bold"
                  />
                </button>
              </div>
            </div>
          </motion.section>

          {/* Category Carousels */}
          {categorias.map((categoria, categoriaIndex) => (
            <motion.section
              key={categoria.nome}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoriaIndex * 0.2 }}
              className="mt-6 sm:mt-8 lg:mt-16"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-gray-100 px-4 sm:px-8">{categoria.nome}</h2>
              <div className="relative px-4 sm:px-8 md:px-12 lg:px-16">
                <div className="flex items-center">
                  <button
                    onClick={() => voltarCategoria(categoriaIndex)}
                    className="absolute left-0 z-10 transform -translate-x-2 sm:-translate-x-4 hover:scale-110 transition-transform"
                    aria-label="Eventos anteriores"
                  >
                    <ArrowCircleLeft
                      size={window.innerWidth >= 1024 ? 48 : window.innerWidth >= 640 ? 40 : 32}
                      color="#ff6b00"
                      variant="Bold"
                    />
                  </button>
                  <div className="overflow-hidden w-full">
                    <motion.div
                      className="flex gap-4 sm:gap-6"
                      animate={{ x: `-${inicioCarrosselCategoria[categoriaIndex] * (100 / visiveis)}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ width: `${(categoria.eventos.length / visiveis) * 100}%` }}
                    >
                      {categoria.eventos
                        .slice(inicioCarrosselCategoria[categoriaIndex], inicioCarrosselCategoria[categoriaIndex] + visiveis)
                        .map((evento) => (
                          <motion.div
                            key={evento.id}
                            className="flex-none w-[80%] sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-800 overflow-hidden"
                            whileHover={{ y: -5 }}
                          >
                            <div className="relative">
                              <img
                                src={evento.imagem}
                                alt={evento.nome}
                                className="w-full h-48 object-cover"
                                loading="lazy"
                              />
                              <button
                                onClick={() =>
                                  toggleLike(evento.id, {
                                    name: evento.nome,
                                    image: evento.imagem,
                                    date: evento.date,
                                    price: evento.price,
                                  })
                                }
                                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
                                aria-label="Favoritar evento"
                              >
                                <Heart
                                  className={likes[evento.id] ? "text-red-500 fill-current" : "text-gray-600 dark:text-gray-300"}
                                  size={24}
                                />
                              </button>
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{evento.nome}</h3>
                              <div className="space-y-2">
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                  <Calendar size={18} className="mr-2 text-gray-600 dark:text-gray-300" />
                                  <span>{evento.date}</span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                  <Ticket size={18} className="mr-2 text-gray-600 dark:text-gray-300" />
                                  <span>A definir</span>
                                </div>
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                  <span>{evento.city}</span>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                  <span className="text-orange-500 dark:text-orange-400 font-semibold">{evento.price}</span>
                                  <Link
                                    to="/detalhes-evento"
                                    state={{ event: evento }}
                                    className="bg-orange-500 dark:bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition"
                                    aria-label={`Comprar ingresso para ${evento.nome}`}
                                  >
                                    Comprar
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </motion.div>
                  </div>
                  <button
                    onClick={() => avancarCategoria(categoriaIndex)}
                    className="absolute right-0 z-10 transform translate-x-2 sm:translate-x-4 hover:scale-110 transition-transform"
                    aria-label="Próximos eventos"
                  >
                    <ArrowCircleRight
                      size={window.innerWidth >= 1024 ? 48 : window.innerWidth >= 640 ? 40 : 32}
                      color="#ff6b00"
                      variant="Bold"
                    />
                  </button>
                </div>
              </div>
            </motion.section>
          ))}
        </>
      )}

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 sm:mt-8 lg:mt-16 text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 p-4 sm:p-6 lg:p-12 rounded-2xl border border-orange-200 dark:border-gray-600"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-gray-800 dark:text-gray-100">Fique por dentro dos eventos</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base max-w-xl mx-auto">
          Inscreva-se para receber atualizações sobre os melhores eventos da sua região.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
            aria-label="Digite seu e-mail"
          />
          <button
            className="bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors text-sm sm:text-base"
            aria-label="Inscrever-se na newsletter"
          >
            Inscrever-se
          </button>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 sm:mt-4">
          Ao se inscrever, você concorda com nossa{" "}
          <a href="#" className="text-orange-500 dark:text-orange-400 hover:underline">
            Política de Privacidade
          </a>
          .
        </p>
      </motion.section>
    </main>
  );
};

export default Home;