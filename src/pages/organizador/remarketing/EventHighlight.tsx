import React from 'react';

interface EventHighlightProps {
  darkMode: boolean;
}

const EventHighlight: React.FC<EventHighlightProps> = ({ darkMode }) => {
  return (
    <div
      className={`rounded-lg border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } overflow-hidden h-full flex flex-col`}
    >
      <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-medium text-base sm:text-lg text-gray-800 dark:text-gray-100">
          Destaque seu Evento
        </h2>
      </div>
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <div className="relative rounded-lg overflow-hidden mb-4 sm:mb-5">
          <img
            src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg"
            alt="Festival de Música"
            className="w-full h-40 sm:h-52 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 sm:p-5">
            <h3 className="text-white dark:text-gray-100 font-medium text-sm sm:text-base">
              Festival de Música 2025
            </h3>
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-5">
          Destaque seu evento para milhares de potenciais compradores na página principal do TixUp.
        </p>
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5">
          <div className="flex items-center justify-between text-sm sm:text-base">
            <span className="text-gray-600 dark:text-gray-400">Visibilidade Premium</span>
            <span className="text-green-600 dark:text-green-400">+250% em média</span>
          </div>
          <div className="flex items-center justify-between text-sm sm:text-base">
            <span className="text-gray-600 dark:text-gray-400">Aumento de Vendas</span>
            <span className="text-green-600 dark:text-green-400">+70% em média</span>
          </div>
        </div>
        <div className="mt-auto">
          <button
            className="w-full bg-orange-500 text-white rounded-md py-2 sm:py-2.5 text-sm sm:text-base font-medium hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
          >
            Destacar meu evento
          </button>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center mt-2 sm:mt-3">
            A partir de R$49,90 por dia
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventHighlight;