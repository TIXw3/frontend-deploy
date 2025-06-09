import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Heart, AlertCircle, Info } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface TicketCategory {
  type: string; 
  multiplier: number; 
  description?: string; 
}

interface TicketType {
  id: string;
  name: string;
  basePrice: number; 
  description: string;
  available: number;
  categories: TicketCategory[];
}

interface SelectedTicket {
  id: string;
  category: string; 
  quantity: number;
}

const DetalhesEvento = () => {
  const [selectedTickets, setSelectedTickets] = useState<SelectedTicket[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const eventData = {
    title: "Festival de Música Eletrônica 2024",
    date: "15 de Junho, 2024",
    time: "16:00 - 23:00",
    location: "Parque de Exposições, São Paulo - SP",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
    description: "Prepare-se para a maior festa de música eletrônica do ano! Com DJs internacionais, estrutura de primeira e uma experiência única, o Festival de Música Eletrônica 2024 promete ser inesquecível.",
    organizer: {
      name: "EventPro Produções",
      image: "https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      events: 47,
      rating: 4.8
    },
    tickets: [
      {
        id: "pista",
        name: "Pista",
        basePrice: 120.00,
        description: "Acesso à área comum do evento",
        available: 1000,
        categories: [
          { type: "Inteira", multiplier: 1 },
          { type: "Meia Entrada", multiplier: 0.5, description: "Estudantes com carteirinha válida" }
        ]
      },
      {
        id: "vip",
        name: "VIP",
        basePrice: 250.00,
        description: "Acesso à área VIP com open bar",
        available: 200,
        categories: [
          { type: "Inteira", multiplier: 1 },
          { type: "Meia Entrada", multiplier: 0.5, description: "Estudantes com carteirinha válida" }
        ]
      },
      {
        id: "camarote",
        name: "Camarote",
        basePrice: 400.00,
        description: "Área exclusiva com vista privilegiada e serviço premium",
        available: 50,
        categories: [
          { type: "Inteira", multiplier: 1 },
          { type: "Meia Entrada", multiplier: 0.5, description: "Estudantes com carteirinha válida" }
        ]
      }
    ] as TicketType[]
  };

  const handleQuantityChange = (ticketId: string, category: string, value: number) => {
    const newQuantity = Math.max(0, Math.min(value, 5));
    setSelectedTickets(prev => {
      const existing = prev.find(t => t.id === ticketId && t.category === category);
      if (existing) {
        if (newQuantity === 0) {
          return prev.filter(t => !(t.id === ticketId && t.category === category));
        }
        return prev.map(t =>
          t.id === ticketId && t.category === category ? { ...t, quantity: newQuantity } : t
        );
      }
      if (newQuantity > 0) {
        return [...prev, { id: ticketId, category, quantity: newQuantity }];
      }
      return prev;
    });
  };

  const getSelectedQuantity = (ticketId: string, category: string) => {
    const selected = selectedTickets.find(t => t.id === ticketId && t.category === category);
    return selected ? selected.quantity : 0;
  };

  const getTicketPrice = (ticket: TicketType, category: string) => {
    const categoryData = ticket.categories.find(c => c.type === category);
    return categoryData ? ticket.basePrice * categoryData.multiplier : ticket.basePrice;
  };

  const getTotalPrice = () => {
    return selectedTickets.reduce((total, selected) => {
      const ticket = eventData.tickets.find(t => t.id === selected.id);
      if (!ticket) return total;
      const price = getTicketPrice(ticket, selected.category);
      return total + price * selected.quantity;
    }, 0);
  };

  const addToCart = () => {
    // Obter o carrinho atual do localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Criar itens do carrinho compatíveis com a página Carrinho
    const newCartItems = selectedTickets.map((selected, index) => {
      const ticket = eventData.tickets.find(t => t.id === selected.id);
      if (!ticket) return null;
      return {
        id: currentCart.length + index + 1, // Gera um ID único
        title: `${eventData.title} - ${ticket.name} ${selected.category}`,
        date: eventData.date,
        time: eventData.time.split(' - ')[0], // Pega apenas o horário inicial
        location: eventData.location.split(', ')[1], // Pega cidade e estado
        venue: eventData.location.split(', ')[0], // Pega o local
        price: getTicketPrice(ticket, selected.category),
        quantity: selected.quantity
      };
    }).filter(item => item !== null);

    // Atualizar o carrinho no localStorage
    const updatedCart = [...currentCart, ...newCartItems];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Redirecionar para a página do carrinho
    navigate('/carrinho');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section with Event Image */}
      <div className="relative h-[400px]">
        <img
          src={eventData.image}
          alt={eventData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{eventData.title}</h1>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{eventData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{eventData.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{eventData.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Sobre o Evento</h2>
              <p className="text-gray-600 dark:text-gray-400">{eventData.description}</p>
            </div>

            {/* Organizer */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Organizador</h2>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={eventData.organizer.image}
                  alt={eventData.organizer.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{eventData.organizer.name}</h3>
                  <div className="text-gray-600 dark:text-gray-400">
                    <p>{eventData.organizer.events} eventos organizados</p>
                    <p>Avaliação: {eventData.organizer.rating}/5</p>
                  </div>
                </div>
              </div>
              <Link
                to="/organizador/eventpro-producoes"
                className="inline-block bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors text-sm sm:text-base"
              >
                Ver Perfil do Organizador
              </Link>
            </div>

            {/* Location */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Localização</h2>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4">
                <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Mapa será carregado aqui
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{eventData.location}</p>
            </div>
          </div>

          {/* Ticket Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-4 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Ingressos</h2>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full transition-colors ${
                    isLiked ? 'text-red-500 bg-red-50 dark:bg-red-900/50' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="space-y-6">
                {eventData.tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{ticket.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{ticket.description}</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {ticket.available} ingressos disponíveis
                    </div>
                    {ticket.categories.map((category) => (
                      <div key={category.type} className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800 dark:text-gray-100">{category.type}</span>
                            {category.description && (
                              <div className="group relative">
                                <Info className="w-4 h-4 text-gray-400 dark:text-gray-500 cursor-pointer" />
                                <div className="absolute hidden group-hover:block bg-gray-800 dark:bg-gray-900 text-white dark:text-gray-100 text-xs rounded py-1 px-2 -top-8 left-6 w-48">
                                  {category.description}
                                </div>
                              </div>
                            )}
                          </div>
                          <span className="font-semibold text-gray-800 dark:text-gray-100">
                            R$ {(ticket.basePrice * category.multiplier).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-800 dark:text-gray-100">Quantidade:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(ticket.id, category.type, getSelectedQuantity(ticket.id, category.type) - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                              aria-label={`Diminuir quantidade de ${ticket.name} ${category.type}`}
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-gray-800 dark:text-gray-100">{getSelectedQuantity(ticket.id, category.type)}</span>
                            <button
                              onClick={() => handleQuantityChange(ticket.id, category.type, getSelectedQuantity(ticket.id, category.type) + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                              aria-label={`Aumentar quantidade de ${ticket.name} ${category.type}`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {selectedTickets.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="mb-2">
                      <span className="font-medium text-gray-800 dark:text-gray-100">Selecionados:</span>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                        {selectedTickets.map((selected) => {
                          const ticket = eventData.tickets.find(t => t.id === selected.id);
                          if (!ticket) return null;
                          const price = getTicketPrice(ticket, selected.category);
                          return (
                            <li key={`${selected.id}-${selected.category}`}>
                              {selected.quantity} {ticket.name} {selected.category} (R$ {(price * selected.quantity).toFixed(2)})
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-800 dark:text-gray-100">Total:</span>
                      <span className="text-gray-800 dark:text-gray-100">R$ {getTotalPrice().toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => navigate('/checkout', { state: { selectedTickets, tickets: eventData.tickets, eventName: eventData.title } })}
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors mb-2"
                      aria-label="Ir para checkout"
                    >
                      Comprar Ingressos
                    </button>
                    <button
                      onClick={addToCart}
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
                      aria-label="Adicionar ao carrinho"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>
                  Você tem até 10 minutos para finalizar sua compra após selecionar os
                  ingressos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesEvento;