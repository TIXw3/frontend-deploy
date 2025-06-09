import React from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../../../shared/contexts/AuthContext';

interface LikeButtonProps {
  isLiked: boolean;
  onLike: () => void;
  className?: string;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onLike, className = "" }) => {
  const { handleLikeClick } = useAuth();

  return (
    <button
      onClick={() => handleLikeClick(onLike)}
      className={`p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all ${className}`}
    >
      <Heart 
        className={isLiked ? "text-red-500 fill-current" : "text-gray-600"} 
        size={24} 
      />
    </button>
  );
};
