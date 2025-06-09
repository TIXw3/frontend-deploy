import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Music, Theater, PartyPopper as Party, Film, DrumIcon, MedalIcon } from "lucide-react";
import { CategoryBalloon } from "./CategoriesBallon";

const categories = [
  { name: "Shows", icon: Music },
  { name: "Teatro", icon: Theater },
  { name: "Esportes", icon: MedalIcon },
  { name: "Festas", icon: Party },
  { name: "Baladas", icon: Film },
  { name: "Festivais", icon: DrumIcon },
];

export function Categories() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const totalRenderItems = categories.length * 4;

  const getVisibleCategories = () => {
    const visible = [];
    for (let i = 0; i < totalRenderItems; i++) {
      const index = i % categories.length;
      visible.push(categories[index]);
    }
    return visible;
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
   
    if (currentIndex >= categories.length) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex % categories.length);
    } else if (currentIndex < 0) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + categories.length);
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/events?category=${category.toLowerCase()}`);
  };

  const updateItemsPerPage = () => {
    if (window.innerWidth < 640) setItemsPerPage(4);
    else if (window.innerWidth < 1024) setItemsPerPage(6);
    else setItemsPerPage(10);
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  
  const gapPercentage = 2; 
  const itemWidthPercentage = (100 - gapPercentage * (itemsPerPage - 1)) / itemsPerPage;

  return (
    <div className="relative max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 bg-white dark:bg-gray-900">
      <div className="flex items-center">
        <button
          onClick={prevSlide}
          className="absolute -left-10 z-10 p-1 sm:p-2 md:p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
          aria-label="Previous categories"
        >
          <ChevronLeft className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="overflow-hidden w-full">
          <div
            className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
            style={{ transform: `translateX(-${currentIndex * (itemWidthPercentage + gapPercentage)}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {getVisibleCategories().map((category, index) => (
              <div
                key={`${category.name}-${index}`}
                className="flex-none"
                style={{ width: `${itemWidthPercentage}%`, marginRight: index < totalRenderItems - 1 ? `${gapPercentage}%` : 0 }}
                onClick={() => handleCategoryClick(category.name)}
              >
                <CategoryBalloon name={category.name} Icon={category.icon} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute -right-10 z-10 p-1 sm:p-2 md:p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
          aria-label="Next categories"
        >
          <ChevronRight className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
}