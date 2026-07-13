import React, { useState } from 'react';
import { Sparkles, Megaphone, Check, Copy, RefreshCw, Layers, DollarSign, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import { SellerListing } from '../types';

export default function SellerStudio() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Tech & Gadgets');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [listing, setListing] = useState<SellerListing | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Ready-to-use creative seed values for quick seller test
  const loadExample = () => {
    setName("UltraCharge Magnetic Power Bank");
    setCategory("Tech & Gadgets");
    setPrice("49.99");
    setFeatures("10,000mAh high capacity, snap-on magnetic wireless charging, dual USB-C ports, bio-based leather grip, smart LED power status ring.");
  };

  const handleCopy = (text: string, elementId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(elementId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateMarketingBundle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);
    setListing(null);

    try {
      const response = await fetch("/api/gemini/seller-studio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          price,
          features
        })
      });

      if (!response.ok) {
        throw new Error("Copywriting endpoint returned an error status.");
      }

      const data: SellerListing = await response.json();
      setListing(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to generate copywriting assets. Ensure your GEMINI_API_KEY is configured in Secrets.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Input form */}
      <div className="lg:col-span-5 bg-[#FDFDFD] rounded-none border border-black p-6 space-y-6">
        <div>
          <h3 className="font-serif text-base font-bold italic text-gray-900 flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-black" />
            Seller Copywriting Hub
          </h3>
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
            Input core features of your new product, and let Google Gemini draft optimized SEO product titles, sales taglines, descriptive paragraphs, and ready-to-publish social media campaigns.
          </p>
        </div>

        <form onSubmit={generateMarketingBundle} className="space-y-4">
          <div>
            <label className="block text-[9px] font-bold text-gray-700 uppercase tracking-widest font-mono mb-1.5">Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. HydroWave Titanium Thermos"
              className="w-full rounded-none border border-black bg-white px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-black transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-bold text-gray-700 uppercase tracking-widest font-mono mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-none border border-black bg-white px-3 py-2.5 text-xs font-mono uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-black transition-all"
              >
                <option>Electronic Gadgets</option>
                <option>Home Appliances</option>
                <option>Grocery</option>
                <option>Ladies' Apparel</option>
                <option>Gents' Apparel</option>
                <option>Outdoor & Travel</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold text-gray-700 uppercase tracking-widest font-mono mb-1.5">Target Price ($)</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-400 text-xs font-mono">$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="29.99"
                  className="w-full rounded-none border border-black bg-white pl-7 pr-3.5 py-2.5 text-xs font-mono uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-bold text-gray-700 uppercase tracking-widest font-mono mb-1.5">Specs & Marketing Notes</label>
            <textarea
              rows={4}
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="List specifications, build materials, warranty, unique selling propositions..."
              className="w-full rounded-none border border-black bg-white px-3.5 py-2.5 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-black transition-all"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={loadExample}
              className="flex-1 flex items-center justify-center gap-1 px-4 py-3 border border-black bg-white hover:bg-neutral-50 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest text-black transition-all cursor-pointer"
            >
              Load Example
            </button>
            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="flex-[2] flex items-center justify-center gap-1.5 px-4 py-3 rounded-none text-[10px] font-mono font-bold uppercase tracking-widest text-white bg-black hover:bg-neutral-800 disabled:opacity-40 transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Generate Sales Bundle
            </button>
          </div>
        </form>
      </div>

      {/* Right Output Stage */}
      <div className="lg:col-span-7">
        {isLoading && (
          <div className="bg-[#FDFDFD] rounded-none border border-black p-12 text-center space-y-4">
            <div className="relative flex justify-center">
              <div className="h-10 w-10 rounded-none border border-black bg-white flex items-center justify-center text-black animate-spin">
                <RefreshCw className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h4 className="font-serif text-base font-bold italic text-gray-900">AI Copywriting in Progress...</h4>
              <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
                Our AI content specialist is structuring technical features, inserting high-impact keywords, and composing social campaigns.
              </p>
            </div>
          </div>
        )}

        {errorMsg && !isLoading && (
          <div className="bg-red-50 border border-black rounded-none p-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-red-950">Generation Interrupted</h4>
            <p className="text-xs text-red-700 leading-relaxed">{errorMsg}</p>
          </div>
        )}

        {/* Empty placeholder */}
        {!listing && !isLoading && !errorMsg && (
          <div className="bg-white rounded-none border border-black p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[300px]">
            <div className="h-12 w-12 rounded-none border border-black bg-[#F7F7F7] text-black flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold italic text-gray-900">No active copy bundle</h4>
              <p className="text-xs text-gray-500 max-w-xs mt-2 leading-relaxed">
                Fill in the product profile on the left and click "Generate" to construct your professional store copy instantly.
              </p>
            </div>
          </div>
        )}

        {/* Sales copy bundle results */}
        {listing && !isLoading && (
          <div className="bg-white rounded-none border border-black p-6 sm:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-2 pb-4 border-b border-black/10 justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-black text-white flex items-center justify-center rounded-none shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold italic text-gray-900">E-commerce Sales Kit</h4>
                  <p className="text-[10px] text-gray-400 font-mono tracking-widest">DRAFTED BY GEMINI PRO COPYWRITER</p>
                </div>
              </div>
            </div>

            {/* Title & Tagline Grid */}
            <div className="grid grid-cols-1 gap-4">
              {/* Catchy Title */}
              <div className="p-4 rounded-none bg-[#F7F7F7] border border-black/15 relative group">
                <button
                  onClick={() => handleCopy(listing.title, 'title')}
                  className="absolute top-4 right-4 text-gray-400 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Copy Title"
                >
                  {copiedId === 'title' ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest font-mono">SEO Optimized Listing Title</span>
                <h5 className="text-sm sm:text-base font-serif font-bold text-gray-900 mt-1">{listing.title}</h5>
              </div>

              {/* Tagline */}
              <div className="p-4 rounded-none bg-[#F7F7F7] border border-black/15 relative group">
                <button
                  onClick={() => handleCopy(listing.tagline, 'tagline')}
                  className="absolute top-4 right-4 text-gray-400 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Copy Tagline"
                >
                  {copiedId === 'tagline' ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest font-mono">Campaign Punchy Tagline</span>
                <p className="text-sm font-serif italic font-semibold text-black mt-1">"{listing.tagline}"</p>
              </div>
            </div>

            {/* Description Block */}
            <div className="relative group p-4 rounded-none bg-[#F7F7F7] border border-black/15">
              <button
                onClick={() => handleCopy(listing.seoDescription, 'desc')}
                className="absolute top-4 right-4 text-gray-400 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Copy Description"
              >
                {copiedId === 'desc' ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              </button>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest font-mono">Structured SEO Copy Description</span>
              <p className="text-xs text-gray-755 leading-relaxed mt-2 whitespace-pre-line font-sans">{listing.seoDescription}</p>
            </div>

            {/* Selling Bullet Points */}
            <div className="p-4 rounded-none bg-[#F7F7F7] border border-black/15 relative group">
              <button
                onClick={() => handleCopy(listing.bulletPoints.join('\n'), 'bullets')}
                className="absolute top-4 right-4 text-gray-400 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Copy Bullet Points"
              >
                {copiedId === 'bullets' ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              </button>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest font-mono">High-Conversion Bullet Points</span>
              <ul className="mt-3 space-y-2">
                {listing.bulletPoints.map((pt, idx) => (
                  <li key={idx} className="text-xs text-gray-750 flex items-start gap-2">
                    <ChevronRight className="h-3.5 w-3.5 text-black shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Ad Campaign */}
            <div className="p-4 rounded-none bg-[#F7F7F7] border border-black relative group">
              <button
                onClick={() => handleCopy(listing.socialPost + '\n\n' + listing.instagramHashtags.join(' '), 'social')}
                className="absolute top-4 right-4 text-gray-400 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Copy Social Post"
              >
                {copiedId === 'social' ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              </button>
              <span className="text-[9px] text-black font-bold uppercase tracking-widest font-mono block">Social Media Post Draft</span>
              <p className="text-xs text-gray-700 leading-relaxed mt-2 whitespace-pre-wrap">{listing.socialPost}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {listing.instagramHashtags.map((tag, idx) => (
                  <span key={idx} className="text-[9px] font-mono font-bold text-black bg-white px-2 py-0.5 rounded-none border border-black/15">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
