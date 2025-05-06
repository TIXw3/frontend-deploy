import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowCircleRight, ArrowCircleLeft, Heart } from "iconsax-react";
import evento1 from "/src/assets/evento1.jpg";
import evento2 from "/src/assets/evento2.jpg";
import evento3 from "/src/assets/evento3.webp";
import evento4 from "/src/assets/evento4.jpg";
import { Categories } from "../layout/Categories";
import { motion, AnimatePresence } from "framer-motion";

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
  const visiveis: number = 4; // Número de itens visíveis no carrossel

  useEffect(() => {
    const interval = setInterval(() => {
      setEventoAtual((prev) => (prev + 1) % eventos.length);
    }, 5000);
    return () => clearInterval(interval);
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
    <main className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-900">
      {/* Hero Carousel */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="h-[600px] relative rounded-2xl overflow-hidden shadow-2xl">
          <AnimatePresence initial={false}>
            <motion.div
              key={eventoAtual}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={eventos[eventoAtual].imagem}
                alt={eventos[eventoAtual].nome}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold mb-4"
                >
                  {eventos[eventoAtual].nome}
                </motion.h2>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-6"
                >
                  <p className="text-lg">{eventos[eventoAtual].date}</p>
                  <p className="text-lg">{eventos[eventoAtual].price}</p>
                  <Link
                    to="/detalhes-evento"
                    state={{ event: eventos[eventoAtual] }}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Ver ingressos
                  </Link>
                </motion.div>
              </div>
              <button
                onClick={() =>
                  toggleLike(`main-${eventoAtual}`, {
                    name: eventos[eventoAtual].nome,
                    image: eventos[eventoAtual].imagem,
                    date: eventos[eventoAtual].date,
                    price: eventos[eventoAtual].price,
                  })
                }
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <Heart
                  className={likes[`main-${eventoAtual}`] ? "text-red-500 fill-current" : "text-gray-600 dark:text-gray-300"}
                  size={24}
                />
              </button>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {eventos.map((_, index) => (
              <button
                key={index}
                onClick={() => setEventoAtual(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === eventoAtual
                    ? "bg-orange-500 w-8"
                    : "bg-white/50 hover:bg-white/80 dark:bg-gray-400/50 dark:hover:bg-gray-400/80"
                }`}
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
          className="mt-10"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Resultados da Pesquisa</h2>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredEvents.map((evento, index) => (
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
                    >
                      <Heart
                        className={likes[evento.id] ? "text-red-500 fill-current" : "text-gray-600 dark:text-gray-300"}
                        size={24}
                      />
                    </button>
                  </div>
                  <div className="p-4 space-y-1">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">{evento.nome}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{evento.date}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{evento.city}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-orange-500 dark:text-orange-400 font-semibold">{evento.price}</p>
                      <Link
                        to="/detalhes-evento"
                        state={{ event: evento }}
                        className="bg-orange-500 text-white px-4 py-1 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
                      >
                        Comprar
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">Nenhum evento encontrado.</p>
          )}
        </motion.section>
      )}

      {/* Popular Events Carousel */}
      {searchTerm.trim() === "" && (
        <>
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Eventos Populares</h2>
            <div className="relative px-16">
              <div className="flex items-center">
                <button
                  onClick={voltar}
                  className="absolute left-0 z-10 transform -translate-x-4 hover:scale-110 transition-transform"
                >
                  <ArrowCircleLeft size={48} color="#ff6b00" variant="Bold" />
                </button>
                <div className="overflow-hidden w-full">
                  <motion.div
                    className="flex gap-6"
                    animate={{ x: `-${inicioCarrossel * (100 / visiveis)}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ width: `${(eventosPopulares.length / 4) * 100}%` }}
                  >
                    {eventosPopulares.map((evento) => (
                      <motion.div
                        key={evento.id}
                        className="flex-none w-[calc(25%-1.5rem)] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
                          >
                            <Heart
                              className={likes[evento.id] ? "text-red-500 fill-current" : "text-gray-600 dark:text-gray-300"}
                              size={24}
                            />
                          </button>
                        </div>
                        <div className="p-4 space-y-1">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">{evento.nome}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{evento.date}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">{evento.city}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-orange-500 dark:text-orange-400 font-semibold">{evento.price}</p>
                            <Link
                              to="/detalhes-evento"
                              state={{ event: evento }}
                              className="bg-orange-500 text-white px-4 py-1 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
                            >
                              Comprar
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
                <button
                  onClick={avancar}
                  className="absolute right-0 z-10 transform translate-x-4 hover:scale-110 transition-transform"
                >
                  <ArrowCircleRight size={48} color="#ff6b00" variant="Bold" />
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
              className="mt-16"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{categoria.nome}</h2>
              <div className="relative px-16">
                <div className="flex items-center">
                  <button
                    onClick={() => voltarCategoria(categoriaIndex)}
                    className="absolute left-0 z-10 transform -translate-x-4 hover:scale-110 transition-transform"
                  >
                    <ArrowCircleLeft size={48} color="#ff6b00" variant="Bold" />
                  </button>
                  <div className="overflow-hidden w-full">
                    <motion.div
                      className="flex gap-6"
                      animate={{ x: `-${inicioCarrosselCategoria[categoriaIndex] * (100 / visiveis)}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ width: `${(categoria.eventos.length / visiveis) * 100}%` }}
                    >
                      {categoria.eventos.slice(inicioCarrosselCategoria[categoriaIndex], inicioCarrosselCategoria[categoriaIndex] + visiveis).map((evento) => (
                        <motion.div
                          key={evento.id}
                          className="flex-none basis-1/4 max-w-[25%] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
                            >
                              <Heart
                                className={likes[evento.id] ? "text-red-500 fill-current" : "text-gray-600 dark:text-gray-300"}
                                size={24}
                              />
                            </button>
                          </div>
                          <div className="p-4 space-y-1">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">{evento.nome}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{evento.date}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{evento.city}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-orange-500 dark:text-orange-400 font-semibold">{evento.price}</p>
                              <Link
                                to="/detalhes-evento"
                                state={{ event: evento }}
                                className="bg-orange-500 text-white px-4 py-1 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
                              >
                                Comprar
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                  <button
                    onClick={() => avancarCategoria(categoriaIndex)}
                    className="absolute right-0 z-10 transform translate-x-4 hover:scale-110 transition-transform"
                  >
                    <ArrowCircleRight size={48} color="#ff6b00" variant="Bold" />
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
        className="mt-16 text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 p-12 rounded-2xl border border-orange-200 dark:border-gray-600"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Fique por dentro dos eventos</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Inscreva-se para receber atualizações sobre os melhores eventos da sua região.
        </p>
        <div className="flex justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors">
            Inscrever-se
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
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