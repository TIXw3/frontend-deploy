import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Music, Theater, Import as Sports, PartyPopper as Party, Film, Book, Ticket, Gamepad, Coffee, Utensils } from "lucide-react";
import { CategoryBalloon } from "./CategoriesBallon";

const categories = [
  { name: "Música", icon: Music },
  { name: "Teatro", icon: Theater },
  { name: "Esportes", icon: Sports },
  { name: "Festas", icon: Party },
  { name: "Cinema", icon: Film },
  { name: "Cultura", icon: Book },
  { name: "Shows", icon: Ticket },
  { name: "Games", icon: Gamepad },
  { name: "Café", icon: Coffee },
  { name: "Gastronomia", icon: Utensils },
];

export function Categories() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getVisibleCategories = () => {
    const duplicatedCategories = [...categories, ...categories, ...categories];
    const startIndex = currentIndex + categories.length;
    return duplicatedCategories.slice(startIndex, startIndex + itemsPerPage);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      if (next >= categories.length) {
        return 0;
      }
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev - 1;
      if (next < 0) {
        return categories.length - 1;
      }
      return next;
    });
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/events?category=${category.toLowerCase()}`);
  };

  const updateItemsPerPage = () => {
    if (window.innerWidth < 640) setItemsPerPage(4);
    else if (window.innerWidth < 1024) setItemsPerPage(6);
    else setItemsPerPage(10);
  };

  React.useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 bg-white dark:bg-gray-900">
      <div className="flex items-center">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-1 sm:p-2 md:p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
          aria-label="Previous categories"
        >
          <ChevronLeft className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 overflow-hidden px-8 sm:px-12 md:px-16">
          {getVisibleCategories().map((category, index) => (
            <div
              key={`${category.name}-${index}`}
              className="transition-transform duration-300 ease-in-out"
              onClick={() => handleCategoryClick(category.name)}
            >
              <CategoryBalloon name={category.name} Icon={category.icon} />
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 p-1 sm:p-2 md:p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
          aria-label="Next categories"
        >
          <ChevronRight className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}
