import React, { useEffect, useState } from 'react';
import { ShoppingCart, Ticket, MapPin, Calendar, Clock, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  price: number;
  quantity: number;
}

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

interface CarrinhoProps {
  darkMode: boolean;
}

function Carrinho({ darkMode }: CarrinhoProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  // Carregar itens do carrinho do localStorage ao montar o componente
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    // Converter cartItems para o formato esperado pelo Checkout
    const selectedTickets: SelectedTicket[] = cartItems.map(item => {
      const ticketId = item.title.toLowerCase().includes('pista') ? 'pista' : 
                      item.title.toLowerCase().includes('vip') ? 'vip' : 'camarote';
      const category = item.title.includes('Meia') ? 'Meia Entrada' : 'Inteira';
      return {
        id: ticketId,
        category,
        quantity: item.quantity,
      };
    });

    const tickets: TicketType[] = cartItems.reduce((acc: TicketType[], item) => {
      const ticketId = item.title.toLowerCase().includes('pista') ? 'pista' : 
                      item.title.toLowerCase().includes('vip') ? 'vip' : 'camarote';
      const ticketName = item.title.split(' - ')[1]; // Ex.: "Pista"
      const category = item.title.includes('Meia') ? 'Meia Entrada' : 'Inteira';
      if (!acc.some(t => t.id === ticketId)) {
        acc.push({
          id: ticketId,
          name: ticketName,
          basePrice: item.price / (category.includes('Meia') ? 0.5 : 1),
          description: `Acesso à área ${ticketName.toLowerCase()}`,
          available: 1000, // Valor mockado, ajuste conforme necessário
          categories: [
            { type: 'Inteira', multiplier: 1 },
            { type: 'Meia Entrada', multiplier: 0.5, description: 'Estudantes com carteirinha válida' },
          ],
        });
      }
      return acc;
    }, []);

    const eventName = cartItems[0]?.title.split(' - ')[0] || 'Festival de Música Eletrônica 2024';

    // Navegar para o checkout com os dados
    navigate('/checkout', {
      state: {
        selectedTickets,
        tickets,
        eventName,
      },
    });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-8">
          <ShoppingCart className="w-8 h-8 text-orange-500" />
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Carrinho</h1>
        </div>

        <div className={`rounded-lg shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {cartItems.length === 0 ? (
            <div className="p-8 text-center">
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Seu carrinho está vazio</p>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className={`p-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b last:border-b-0`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{item.title}</h3>
                      <div className="mt-2 space-y-1">
                        <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <Calendar className="w-4 h-4" />
                          <span>{item.date}</span>
                          <Clock className="w-4 h-4 ml-2" />
                          <span>{item.time}</span>
                        </div>
                        <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <MapPin className="w-4 h-4" />
                          <span>{item.venue} - {item.location}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className={`${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-400 hover:text-red-500'} transition-colors`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Ticket className="w-5 h-5 text-orange-500" />
                      <div className={`flex items-center border rounded-lg ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className={`${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} px-3 py-1`}
                        >
                          -
                        </button>
                        <span className={`px-3 py-1 ${darkMode ? 'border-gray-600 text-gray-100' : 'border-gray-300 text-gray-800'} border-x`}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={`${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'} px-3 py-1`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Preço unitário</p>
                      <p className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className={`p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} rounded-b-lg`}>
                <div className="flex justify-between items-center">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total</span>
                  <span className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    R$ {total.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="mt-4 w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  disabled={cartItems.length === 0}
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Carrinho;