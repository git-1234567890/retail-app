import React, { useState } from 'react';
import { Search, ShoppingBag, ArrowRight, Star, X, Plus, Minus, Trash2, ShoppingCart, CheckCircle } from 'lucide-react';
import { PRODUCTS, searchProducts } from './data/products';
import { Product, ChatMessage } from './types';

// Import components
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import AiChatAssistant from './components/AiChatAssistant';
import VisualSearch from './components/VisualSearch';
import SellerStudio from './components/SellerStudio';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('catalog');
  
  // Shopping Cart State
  const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Detailed Modal View State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Conversational Assistant Preloaded Prompt Channel
  const [externalPrompt, setExternalPrompt] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (productId: string, amount: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + amount;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter(item => item.quantity > 0);
    });
  };

  const removeCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCheckedOut(true);
    setCartItems([]);
    setTimeout(() => {
      setIsCheckedOut(false);
      setIsCartOpen(false);
    }, 4000);
  };

  // Switch tab and inject prompt to AI Chat
  const triggerAssistantWithPrompt = (prompt: string) => {
    setExternalPrompt(prompt);
    setActiveTab('assistant');
  };

  // Filter products locally for instantaneous feedback
  const filteredProducts = searchProducts(searchQuery).filter(
    p => selectedCategory === 'All' || p.category === selectedCategory
  );

  const categories = ['All', 'Electronic Gadgets', 'Home Appliances', 'Grocery', 'Ladies\' Apparel', 'Gents\' Apparel', 'Outdoor & Travel'];
  
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col text-[#1A1A1A] font-sans antialiased">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
      />

      {/* Main Workspace Frame */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'catalog' && (
          <div className="space-y-10">
            
            {/* Elegant Editorial Hero Banner */}
            <div className="border border-black bg-[#F7F7F7] p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-stretch justify-between gap-8">
              <div className="relative z-10 max-w-xl flex flex-col justify-between space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-[0.25em] text-gray-500 font-mono mb-3">
                    • Google Gemini Powered •
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-serif font-black italic tracking-tighter leading-none text-[#1A1A1A]">
                    The Silent Luxe.
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans mt-4 max-w-md">
                    Experience instantaneous product search, multimodal style detection, conversational buyers assistants, and automated copywriting styled around bespoke minimalism.
                  </p>
                </div>
                
                <div className="pt-4 flex flex-wrap gap-3">
                  <button
                    id="hero-ai-chat-btn"
                    onClick={() => setActiveTab('assistant')}
                    className="inline-flex items-center gap-2 border border-black bg-black text-white px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all cursor-pointer"
                  >
                    Chat with Nexia Advisor
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    id="hero-visual-btn"
                    onClick={() => setActiveTab('visual')}
                    className="inline-flex items-center gap-2 border border-black bg-white text-black px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-50 transition-all cursor-pointer"
                  >
                    Visual Style Scan
                  </button>
                </div>
              </div>
              
              {/* Subtle background graphic block */}
              <div className="relative md:w-1/3 border border-black bg-white/50 p-6 flex flex-col justify-between min-h-[180px] md:min-h-0">
                <div className="absolute inset-0 bg-neutral-200/20 flex items-center justify-center text-[110px] font-serif italic text-black/5 select-none pointer-events-none">
                  NEXIA
                </div>
                <div className="z-10">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">ANALYSIS V3.5</span>
                  <p className="text-xs font-serif italic mt-2 text-gray-700">"Designing algorithms for high contrast & perfect conversions."</p>
                </div>
                <div className="z-10 border-t border-black/15 pt-3 mt-4 flex justify-between text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                  <span>DEPLOYED VIA AI STUDIO</span>
                  <span className="text-emerald-600 font-bold">● LIVE</span>
                </div>
              </div>
            </div>

            {/* Catalog Controls Grid */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-black/10">
              
              {/* Category selector */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    id={`filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      selectedCategory === cat
                        ? 'bg-black text-white border-black'
                        : 'bg-white border-black/10 text-gray-400 hover:text-black hover:border-black'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Instant Search input */}
              <div className="relative max-w-sm w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="SEARCH CATALOG ITEMS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-none border border-black bg-white pl-10 pr-4 py-2.5 text-xs font-mono uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>

            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-[#FDFDFD] rounded-none border border-black p-12 text-center shadow-none">
                <h4 className="font-serif text-sm font-bold text-gray-900">No matching products found</h4>
                <p className="text-xs text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
                  Try adjusting your search criteria or ask our conversational AI assistant to recommend complementary products.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(prod => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onViewDetails={setSelectedProduct}
                    onAddToCart={handleAddToCart}
                    isAdded={cartItems.some(item => item.product.id === prod.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'assistant' && (
          <div className="max-w-4xl mx-auto">
            <AiChatAssistant
              messages={messages}
              setMessages={setMessages}
              onAddToCart={handleAddToCart}
              onViewProduct={setSelectedProduct}
              cartProductIds={cartItems.map(item => item.product.id)}
              externalPrompt={externalPrompt}
              clearExternalPrompt={() => setExternalPrompt(null)}
            />
          </div>
        )}

        {activeTab === 'visual' && (
          <div className="max-w-6xl mx-auto">
            <VisualSearch
              onAddToCart={handleAddToCart}
              onViewProduct={setSelectedProduct}
              cartProductIds={cartItems.map(item => item.product.id)}
            />
          </div>
        )}

        {activeTab === 'seller' && (
          <div className="max-w-6xl mx-auto">
            <SellerStudio />
          </div>
        )}
      </main>

      {/* Cart Slider Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/45 backdrop-blur-xs">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div 
                id="shopping-cart-drawer"
                className="pointer-events-auto w-screen max-w-md bg-white border-l border-black shadow-none flex flex-col h-full animate-in slide-in-from-right duration-250"
              >
                {/* Cart Header */}
                <div className="px-6 py-5 border-b border-black flex items-center justify-between bg-[#F7F7F7]">
                  <h3 className="font-serif text-base font-bold italic text-gray-900 flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-black" />
                    Your Shopping Basket
                  </h3>
                  <button
                    id="close-cart-btn"
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-400 hover:text-black h-8 w-8 flex items-center justify-center rounded-none border border-black/10 bg-white transition-all cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Cart Body */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#FDFDFD]">
                  {isCheckedOut ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                      <div className="h-14 w-14 rounded-none border border-black bg-neutral-100 text-black flex items-center justify-center animate-bounce">
                        <CheckCircle className="h-8 w-8" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-bold italic text-gray-950">Checkout Successful!</h4>
                        <p className="text-xs text-gray-500 mt-2 max-w-xs leading-relaxed">
                          Your order has been verified. Nexia AI is finalizing shipping parameters. Packing starting shortly!
                        </p>
                      </div>
                    </div>
                  ) : cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 max-w-xs mx-auto">
                      <div className="h-12 w-12 rounded-none border border-black/10 bg-neutral-50 text-gray-400 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-gray-900">Your basket is empty</h4>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                          Browse items on the catalog, or let the AI advisor compile a smart outfit recommendation package for you.
                        </p>
                      </div>
                    </div>
                  ) : (
                    cartItems.map(item => (
                      <div key={item.product.id} className="flex gap-4 p-3 rounded-none border border-black/10 bg-white hover:border-black transition-all">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="h-16 w-16 rounded-none object-cover bg-gray-50 border border-black/5 shrink-0"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h5 className="text-xs font-serif font-bold text-gray-900 truncate leading-none">{item.product.name}</h5>
                            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mt-1 block">{item.product.category}</span>
                          </div>

                          <div className="flex items-center justify-between mt-1 pt-1.5 border-t border-black/5">
                            <span className="text-xs font-bold font-mono text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                            
                            <div className="flex items-center gap-2">
                              <div className="flex items-center border border-black rounded-none overflow-hidden bg-white h-6">
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, -1)}
                                  className="px-1.5 text-gray-500 hover:bg-neutral-100 h-full flex items-center cursor-pointer"
                                >
                                  <Minus className="h-2.5 w-2.5" />
                                </button>
                                <span className="px-2 text-[10px] font-bold font-mono text-gray-950">{item.quantity}</span>
                                <button
                                  onClick={() => updateCartQuantity(item.product.id, 1)}
                                  className="px-1.5 text-gray-500 hover:bg-neutral-100 h-full flex items-center cursor-pointer"
                                >
                                  <Plus className="h-2.5 w-2.5" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeCartItem(item.product.id)}
                                className="text-gray-400 hover:text-red-600 p-1 cursor-pointer"
                                title="Remove"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Cart Footer */}
                {cartItems.length > 0 && !isCheckedOut && (
                  <div className="px-6 py-5 border-t border-black bg-[#F7F7F7] space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold font-mono uppercase tracking-widest text-[10px] text-gray-500">Order Subtotal</span>
                      <span className="font-bold text-gray-950 font-mono text-base">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <p className="text-[9px] text-gray-500 leading-relaxed font-sans">
                      Shipping is calculated at checkout. Curated orders are optimized by our logistics neural model to guarantee low carbon dispatch.
                    </p>
                    <button
                      id="checkout-btn"
                      onClick={handleCheckout}
                      className="w-full flex h-11 items-center justify-center rounded-none bg-black hover:bg-neutral-800 text-white text-[10px] uppercase tracking-widest font-mono font-bold border border-black cursor-pointer"
                    >
                      Process Checkout (${cartSubtotal.toFixed(2)})
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isAdded={cartItems.some(item => item.product.id === selectedProduct.id)}
          onAskAssistant={triggerAssistantWithPrompt}
        />
      )}

      {/* Humble credit foot margin */}
      <footer className="mt-12 py-6 border-t border-black bg-[#F7F7F7] text-center text-[10px] font-mono uppercase tracking-widest text-gray-500">
        <p>© 2026 nexia.ai retail. All rights reserved. Coordinated by Google Gemini 3.5 AI Studio.</p>
      </footer>
    </div>
  );
}
