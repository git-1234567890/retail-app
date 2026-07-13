import React, { useState } from 'react';
import { X, Star, Sparkles, Check, Package, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isAdded: boolean;
  onAskAssistant: (productName: string) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  isAdded,
  onAskAssistant,
}: ProductDetailModalProps) {
  if (!product) return null;

  const [activeTab, setActiveTab] = useState<'specs' | 'details' | 'ai'>('details');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div 
        id="product-detail-modal"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-none bg-[#FDFDFD] border border-black flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-none bg-white text-black hover:bg-neutral-100 border border-black transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left: Product Image Panel */}
        <div className="md:w-1/2 bg-[#F7F7F7] p-8 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-black">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full max-h-[350px] object-contain"
          />
          <div className="absolute bottom-4 left-6">
            <span className="inline-flex items-center gap-1 rounded-none bg-black px-2.5 py-1 text-[9px] uppercase tracking-widest font-mono font-bold text-white">
              <Layers className="h-3 w-3" />
              {product.category}
            </span>
          </div>
        </div>

        {/* Right: Informational Content Panel */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <span className="text-[9px] text-gray-500 font-bold tracking-[0.2em] uppercase font-mono">Product Curations</span>
            <h2 className="mt-1 text-3xl font-serif font-bold italic text-gray-900 tracking-tight leading-none">{product.name}</h2>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-black">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 fill-current ${
                      i < Math.floor(product.rating) ? 'text-black' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-900 font-bold font-mono">{product.rating}</span>
              <span className="text-[10px] text-gray-400 font-bold font-mono uppercase tracking-wider">({product.reviewsCount} PURCHASES)</span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900 font-mono">${product.price.toFixed(2)}</span>
              <span className="text-[10px] text-black font-bold font-mono uppercase tracking-widest border border-black px-2 py-0.5 bg-neutral-150">
                In Stock ({product.stock} units)
              </span>
            </div>

            <p className="mt-4 text-xs text-gray-600 leading-relaxed font-sans">{product.description}</p>

            {/* Tab Navigation */}
            <div className="mt-6 flex border-b border-black/10">
              {(['details', 'specs', 'ai'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
                    activeTab === tab
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-400 hover:text-black'
                  }`}
                >
                  {tab === 'ai' ? (
                    <span className="flex items-center gap-1 font-mono">
                      <Sparkles className="h-3 w-3 text-black" />
                      AI INSIGHTS
                    </span>
                  ) : (
                    tab
                  )}
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            <div className="mt-4 min-h-[160px] max-h-[220px] overflow-y-auto pr-1">
              {activeTab === 'details' && (
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-gray-600">
                      <Check className="h-3.5 w-3.5 text-black shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'specs' && (
                <div className="rounded-none border border-black overflow-hidden text-xs">
                  <table className="min-w-full divide-y divide-black/10">
                    <tbody className="bg-white divide-y divide-black/10">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <tr key={key} className="hover:bg-neutral-50">
                          <td className="px-4 py-2 font-bold uppercase tracking-widest text-gray-400 font-mono text-[9px] w-1/3 bg-neutral-50">{key}</td>
                          <td className="px-4 py-2 text-gray-900 font-mono">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-3">
                  <div className="rounded-none bg-[#F7F7F7] border border-black p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles className="h-3.5 w-3.5 text-black" />
                      <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest font-mono">Audience Profile & Fit</h4>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Recommended for buyers prioritizing a <strong className="text-black">bespoke structural design</strong>. Matching keywords: {product.tags.slice(0, 4).join(', ')}.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onAskAssistant(`Tell me more about the ${product.name}. Is it good for daily commuting?`);
                        onClose();
                      }}
                      className="flex-1 flex items-center justify-between text-left px-3 py-2 border border-black text-[9px] font-bold uppercase tracking-widest text-black bg-white hover:bg-neutral-100 transition-all cursor-pointer"
                    >
                      <span>Best uses?</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => {
                        onAskAssistant(`Compare ${product.name} with other items in the same category.`);
                        onClose();
                      }}
                      className="flex-1 flex items-center justify-between text-left px-3 py-2 border border-black text-[9px] font-bold uppercase tracking-widest text-black bg-white hover:bg-neutral-100 transition-all cursor-pointer"
                    >
                      <span>Compare?</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Call-To-Action Area */}
          <div className="mt-6 pt-4 border-t border-black/10 flex gap-3">
            <button
              onClick={() => onAddToCart(product)}
              className={`flex-1 flex h-12 items-center justify-center gap-2 rounded-none text-xs font-bold uppercase tracking-widest border transition-all duration-200 ${
                isAdded
                  ? 'bg-[#1A1A1A] border-black text-white hover:bg-black'
                  : 'bg-white border-black text-black hover:bg-neutral-100'
              }`}
            >
              <Package className="h-4 w-4" />
              {isAdded ? 'Added to Basket' : `Add to Basket - $${product.price.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
