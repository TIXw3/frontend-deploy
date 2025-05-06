import React from "react";
import { LucideIcon } from "lucide-react";

interface CategoryBalloonProps {
  name: string;
  Icon: LucideIcon;
  className?: string;
}

export function CategoryBalloon({ name, Icon, className }: CategoryBalloonProps) {
  return (
    <button
      className={`flex flex-col items-center justify-center bg-white dark:bg-gray-700 rounded-full p-4 shadow-md hover:shadow-lg dark:shadow-gray-800 dark:hover:shadow-gray-600 transition-all duration-300 w-24 h-24 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 ${className}`}
      aria-label={`Categoria ${name}`}
    >
      <Icon className="w-8 h-8 text-orange-500 dark:text-orange-400 mb-2" />
      <span className="text-sm text-gray-700 dark:text-gray-100 text-center">{name}</span>
    </button>
  );
}