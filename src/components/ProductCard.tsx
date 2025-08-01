
import { useState } from 'react';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  name: string;
  image: string;
  sizes: string[];
  origin: string;
  grainType: string;
  grade: string;
  onViewDetails: () => void;
}

const ProductCard = ({ name, image, sizes, origin, grainType, grade, onViewDetails }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleViewDetails = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onViewDetails();
    }, 300);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group animate-scale-in transform hover:-translate-y-2">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-light-beige">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-dark-gray mb-2">{name}</h3>
        
        {/* Sizes */}
        <div className="flex flex-wrap gap-2 mb-3">
          {sizes.map((size) => (
            <span 
              key={size}
              className="bg-light-beige text-grain-brown px-3 py-1 rounded-full text-sm font-medium"
            >
              {size}
            </span>
          ))}
        </div>

        {/* Quick specs */}
        <div className="space-y-1 mb-4 text-sm text-dark-gray/70">
          <p><span className="font-medium">Origin:</span> {origin || 'Nepal'}</p>
          <p><span className="font-medium">Grain:</span> {grainType || 'Premium'}</p>
          <p><span className="font-medium">Grade:</span> <span className="text-newari-green font-semibold">{grade || 'A+'}</span></p>
        </div>

        {/* View Details Button */}
        <button 
          onClick={handleViewDetails}
          disabled={isLoading}
          className="w-full bg-newari-green text-white py-3 rounded-lg hover:bg-newari-green/90 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Eye size={18} />
          {isLoading ? 'Loading...' : 'View Details'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
