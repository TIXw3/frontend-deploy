import React from 'react';
import { ShoppingCart, Ticket, MapPin, Calendar, Clock, Trash2 } from 'lucide-react';

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

function Carrinho() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      id: 1,
      title: "Festival de Música Eletrônica",
      date: "15 de Março, 2024",
      time: "22:00",
      location: "São Paulo, SP",
      venue: "Arena Shows",
      price: 120.00,
      quantity: 2
    },
    {
      id: 2,
      title: "Peça: O Fantasma da Ópera",
      date: "16 de Março, 2024",
      time: "20:00",
      location: "Rio de Janeiro, RJ",
      venue: "Teatro Municipal",
      price: 80.00,
      quantity: 1
    }
  ]);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-8">
          <ShoppingCart className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-800">Carrinho</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          {cartItems.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 border-b last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{item.date}</span>
                          <Clock className="w-4 h-4 ml-2" />
                          <span>{item.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{item.venue} - {item.location}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Ticket className="w-5 h-5 text-orange-500" />
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Preço unitário</p>
                      <p className="font-semibold text-gray-800">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-6 bg-gray-50 rounded-b-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total</span>
                  <span className="text-2xl font-bold text-gray-800">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
                <button className="mt-4 w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
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