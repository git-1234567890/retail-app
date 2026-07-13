import React from 'react';
import { ShoppingBag, MessageSquareCode, Camera, Sparkles, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  toggleCart: () => void;
}

export default function Navbar({ activeTab, setActiveTab, cartCount, toggleCart }: NavbarProps) {
  const navItems = [
    { id: 'catalog', label: 'Smart Catalog', icon: ShoppingBag },
    { id: 'assistant', label: 'AI Shopping Assistant', icon: MessageSquareCode },
    { id: 'visual', label: 'Visual Style Search', icon: Camera },
    { id: 'seller', label: 'Seller Marketing Studio', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black bg-[#FDFDFD]/90 backdrop-blur-xs">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex flex-col cursor-pointer" onClick={() => setActiveTab('catalog')}>
          <span className="text-[9px] uppercase tracking-[0.25em] font-mono font-semibold text-gray-500 mb-0.5">Intelligence Layer</span>
          <h1 className="text-2xl sm:text-3xl font-serif italic tracking-tighter text-[#1A1A1A] leading-none">
            nexia.ai<span className="font-sans font-bold not-italic tracking-normal text-[9px] uppercase align-super ml-1 border border-black px-1.5 py-0.5 bg-black text-white">retail</span>
          </h1>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-2 text-[11px] uppercase tracking-widest font-bold transition-all duration-200 ${
                  isActive
                    ? 'text-black underline underline-offset-8 decoration-[2px]'
                    : 'text-gray-400 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button: Cart */}
        <div className="flex items-center gap-3">
          <button
            id="cart-toggle-btn"
            onClick={toggleCart}
            className="relative flex h-10 px-4 items-center justify-center gap-2 border border-black bg-[#FDFDFD] text-black hover:bg-neutral-100 font-mono text-xs font-semibold tracking-wider transition-all duration-150"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="uppercase text-[10px]">Basket</span>
            {cartCount > 0 && (
              <span className="bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs ml-1">
                {cartCount}
              </span>
            )}
          </button>
          
          {/* Small screen menu trigger */}
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="block w-full border border-black bg-white px-3 py-1.5 text-xs uppercase tracking-wider font-bold text-gray-700 shadow-xs focus:outline-none"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

