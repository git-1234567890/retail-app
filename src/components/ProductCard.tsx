import React from 'react';
import { Star, Eye, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isAdded: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onAddToCart, isAdded }) => {
  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-none border border-black bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-black">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-none bg-black px-2.5 py-1 text-[9px] uppercase tracking-widest font-mono font-bold text-white">
            {product.category}
          </span>
        </div>
        
        {/* Quick Actions Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-[1px] opacity-0 transition-opacity duration-250 group-hover:opacity-100">
          <button
            id={`quick-view-${product.id}`}
            onClick={() => onViewDetails(product)}
            className="flex items-center gap-1.5 rounded-none border border-black bg-white px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold text-gray-900 shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Description & Metadata Panel */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex text-black">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 fill-current ${
                  i < Math.floor(product.rating) ? 'text-black' : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500 font-bold font-mono tracking-wider">
            {product.rating} • {product.reviewsCount} REVIEWS
          </span>
        </div>

        <h3 
          className="font-serif text-lg font-bold text-gray-900 line-clamp-1 hover:italic hover:underline cursor-pointer decoration-[1.5px] leading-tight"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>
        
        <p className="mt-2 text-xs text-gray-600 line-clamp-2 flex-grow leading-relaxed">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between pt-4 border-t border-black/10">
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-400 font-bold font-mono uppercase tracking-widest leading-none">Price</span>
            <span className="text-base font-bold text-gray-900 font-mono mt-1">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            id={`add-to-cart-${product.id}`}
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`flex h-9 items-center justify-center gap-1.5 px-4 rounded-none text-[10px] font-bold uppercase tracking-widest border transition-all duration-200 ${
              product.stock === 0
                ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                : isAdded
                ? 'border-black bg-black text-white hover:bg-neutral-800'
                : 'border-black bg-white text-black hover:bg-neutral-100'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                Added
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
