import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Collaborator {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  address: string;
  phone: string;
}

const collaborators: Collaborator[] = [
  {
    id: 1,
    name: 'Folks',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
    rating: 4.5,
    reviews: 324,
    address: 'Av. São Paulo, 1250 - Maringá, PR',
    phone: '(44) 99999-1234'
  },
  {
    id: 2,
    name: 'Filin',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    rating: 4.2,
    reviews: 256,
    address: 'Rua Santos Dumont, 2890 - Maringá, PR',
    phone: '(44) 99888-5678'
  },
  {
    id: 3,
    name: 'Casa da Vó',
    image: 'https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg',
    rating: 4.4,
    reviews: 412,
    address: 'Av. Paraná, 1500 - Maringá, PR',
    phone: '(44) 99777-9012'
  },
  {
    id: 4,
    name: '212',
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg',
    rating: 4.3,
    reviews: 289,
    address: 'Av. Brasil, 2100 - Maringá, PR',
    phone: '(44) 99666-4321'
  },
  {
    id: 5,
    name: '44 Lounge',
    image: 'https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg',
    rating: 4.2,
    reviews: 345,
    address: 'Rua Néo Alves Martins, 2800 - Maringá, PR',
    phone: '(44) 99555-8888'
  },
  {
    id: 6,
    name: 'Butiquim',
    image: 'https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg',
    rating: 4.4,
    reviews: 275,
    address: 'Av. Cerro Azul, 1900 - Maringá, PR',
    phone: '(44) 99444-4567'
  }
];

const Collaborators = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCollaborators = collaborators.filter(collaborator => 
    collaborator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Nossos Parceiros</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Conheça as empresas que colaboram conosco e oferecem benefícios exclusivos
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Buscar parceiros..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          defaultValue="todos"
        >
          <option value="todos">Todos</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCollaborators.map((collaborator) => (
          <div key={collaborator.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="relative h-48">
              <img
                src={collaborator.image}
                alt={collaborator.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h3 className="text-white dark:text-gray-100 text-xl font-semibold">{collaborator.name}</h3>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-sm ${i < Math.floor(collaborator.rating) ? 'text-yellow-400 dark:text-yellow-300' : 'text-gray-300 dark:text-gray-600'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">({collaborator.reviews})</span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="text-sm">📍 {collaborator.address}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="text-sm">📞 {collaborator.phone}</span>
                </div>
              </div>
              
              <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors">
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaborators;