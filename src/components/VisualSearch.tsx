import React, { useState } from 'react';
import { Camera, UploadCloud, Sparkles, HelpCircle, Layers, Palette, Shield, ArrowRight, Eye, ShoppingCart } from 'lucide-react';
import { VisualAnalysis, Product } from '../types';
import { PRODUCTS } from '../data/products';

interface VisualSearchProps {
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  cartProductIds: string[];
}

export default function VisualSearch({ onAddToCart, onViewProduct, cartProductIds }: VisualSearchProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<VisualAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Ready-to-use sample products for quick visual test
  const MOCK_PRESETS = [
    {
      name: "Cyberpunk Mechanical Keyboard",
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Urban Leather Travel pack",
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Minimal White Table Lamp",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80",
    }
  ];

  // Canvas utility to encode remote image URLs as base64 on client-side
  const convertUrlToBase64 = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/jpeg');
          // Strip metadata prefix
          const base64 = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
          resolve(base64);
        } else {
          reject(new Error('Canvas context is null'));
        }
      };
      img.onerror = () => reject(new Error('Failed to load image for base64 encoding'));
      img.src = url;
    });
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setSelectedImage(base64String);
      const pureBase64 = base64String.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, '');
      analyzeImage(pureBase64, file.type);
    };
    reader.onerror = () => {
      setErrorMsg("Error reading image file.");
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const selectPreset = async (presetUrl: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    setSelectedImage(presetUrl);

    try {
      const base64 = await convertUrlToBase64(presetUrl);
      await analyzeImage(base64, "image/jpeg");
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Failed to encode preset image. Try uploading a local image instead.");
      setIsLoading(false);
    }
  };

  const analyzeImage = async (base64: string, mimeType: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    setAnalysis(null);

    try {
      const response = await fetch("/api/gemini/visual-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType })
      });

      if (!response.ok) {
        throw new Error("Visual Analysis failed on server.");
      }

      const data: VisualAnalysis = await response.json();
      setAnalysis(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Gemini was unable to complete the visual analysis. Ensure your GEMINI_API_KEY is configured.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Input Stage */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#FDFDFD] rounded-none border border-black p-6 space-y-5">
          <div>
            <h3 className="font-serif text-base font-bold italic text-gray-900 flex items-center gap-2">
              <Camera className="h-5 w-5 text-black" />
              Upload Product Photo
            </h3>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              Upload an image of a gadget, accessory, or clothing item, and let Gemini detect its category, design style, and find catalog equivalents.
            </p>
          </div>

          {/* Drag & Drop Box */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`border border-dashed p-6 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-black bg-neutral-100'
                : 'border-black/30 hover:border-black hover:bg-neutral-50'
            }`}
          >
            <input
              type="file"
              id="file-upload-input"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
              className="hidden"
            />
            <label htmlFor="file-upload-input" className="cursor-pointer flex flex-col items-center gap-2">
              <UploadCloud className="h-9 w-9 text-black" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-800">Drag photo here, or click to browse</span>
              <span className="text-[10px] text-gray-400 font-mono">SUPPORTS PNG, JPG, WEBP</span>
            </label>
          </div>

          {/* Preset Showcase */}
          <div className="pt-2">
            <h4 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest font-mono mb-2.5">Or try these style presets:</h4>
            <div className="grid grid-cols-3 gap-2">
              {MOCK_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => selectPreset(preset.image)}
                  disabled={isLoading}
                  className="group relative h-20 overflow-hidden rounded-none border border-black focus:ring-1 focus:ring-black hover:opacity-90 transition-all text-left cursor-pointer"
                >
                  <img
                    src={preset.image}
                    alt={preset.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-all"
                  />
                  <div className="absolute inset-0 bg-black/45 flex items-end p-2">
                    <span className="text-[9px] font-bold uppercase tracking-wide text-white line-clamp-2 leading-none">
                      {preset.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Image Display */}
        {selectedImage && (
          <div className="bg-white rounded-none border border-black p-4 overflow-hidden flex flex-col items-center">
            <span className="text-[9px] font-bold text-gray-400 self-start mb-2 uppercase font-mono tracking-widest">Input Product Frame:</span>
            <img
              src={selectedImage}
              alt="Source analysis preview"
              className="max-h-56 rounded-none object-contain w-full bg-[#F7F7F7] border border-black/10"
            />
          </div>
        )}
      </div>

      {/* Right Analysis Panel */}
      <div className="lg:col-span-7">
        {isLoading && (
          <div className="bg-[#FDFDFD] rounded-none border border-black p-12 text-center space-y-4">
            <div className="relative flex justify-center">
              <div className="h-10 w-10 rounded-none border border-black bg-white flex items-center justify-center text-black animate-spin">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h4 className="font-serif text-base font-bold italic text-gray-900">Scanning Product Specifications...</h4>
              <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto leading-relaxed">
                Analyzing pixels for color tones, geometric styling, and material textures. Compiling matching items...
              </p>
            </div>
          </div>
        )}

        {errorMsg && !isLoading && (
          <div className="bg-red-50 border border-black rounded-none p-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-red-950">Scanning Disrupted</h4>
            <p className="text-xs text-red-700 leading-relaxed">{errorMsg}</p>
          </div>
        )}

        {/* No Search Init state */}
        {!analysis && !isLoading && !errorMsg && (
          <div className="bg-white rounded-none border border-black p-12 text-center flex flex-col items-center justify-center space-y-4 min-h-[300px]">
            <div className="h-12 w-12 rounded-none border border-black bg-[#F7F7F7] text-black flex items-center justify-center">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold italic text-gray-900">No active style scan</h4>
              <p className="text-xs text-gray-500 max-w-xs mt-2 leading-relaxed">
                Upload a custom product image or pick a design preset to unleash Google Gemini's visual matching capability.
              </p>
            </div>
          </div>
        )}

        {/* Detailed Style Analysis Output */}
        {analysis && !isLoading && (
          <div className="bg-white rounded-none border border-black p-6 sm:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-3 pb-4 border-b border-black/10">
              <div className="h-8 w-8 bg-black text-white flex items-center justify-center rounded-none shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold italic text-gray-900">Style Analysis Report</h4>
                <p className="text-[10px] text-gray-400 font-mono tracking-widest">PRODUCT STYLE SPECIFICATIONS</p>
              </div>
            </div>

            {/* Structured style attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-none bg-[#F7F7F7] border border-black/15 flex items-start gap-3">
                <Layers className="h-5 w-5 text-black mt-0.5 shrink-0" />
                <div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest font-mono">Product Classification</span>
                  <h5 className="text-sm font-serif font-bold text-gray-900 mt-0.5">{analysis.productType}</h5>
                  <p className="text-xs text-gray-650 mt-1">Design Style: {analysis.style}</p>
                </div>
              </div>

              <div className="p-4 rounded-none bg-[#F7F7F7] border border-black/15 flex items-start gap-3">
                <Palette className="h-5 w-5 text-black mt-0.5 shrink-0" />
                <div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest font-mono">Color Spectrum</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {analysis.colorPalette.map((color, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-none px-2 py-0.5 text-[9px] font-mono font-bold text-gray-700 bg-white border border-black/10 shadow-xs"
                      >
                        <span className="h-2 w-2 rounded-none border border-black/20" style={{ backgroundColor: color.toLowerCase() }} />
                        {color.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Inferred materials & keywords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest font-mono mb-2 flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-black" /> DETECTED MATERIALS
                </h5>
                <div className="flex flex-wrap gap-1">
                  {analysis.materials.map((mat, idx) => (
                    <span key={idx} className="rounded-none bg-[#1A1A1A] text-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider font-mono">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest font-mono mb-2">SEO RECOMMENDATIONS</h5>
                <div className="flex flex-wrap gap-1">
                  {analysis.suggestedKeywords.map((kw, idx) => (
                    <span key={idx} className="rounded-none bg-white border border-black/10 px-2.5 py-1 text-[9px] font-mono font-bold text-gray-500 uppercase">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Aesthetic descriptive box */}
            <div className="p-4 rounded-none bg-[#F7F7F7] border border-black">
              <span className="text-[9px] text-black font-bold uppercase tracking-widest font-mono block mb-1">Aesthetic Critique</span>
              <p className="text-xs text-gray-700 leading-relaxed font-sans">{analysis.description}</p>
            </div>

            {/* Catalog Matches section */}
            <div className="pt-4 border-t border-black/10">
              <h5 className="text-[10px] font-bold text-gray-900 uppercase tracking-widest font-mono mb-3.5">Matched Catalog Items in Store:</h5>
              {analysis.matchedProductIds.length === 0 ? (
                <p className="text-xs text-gray-400 bg-gray-50 p-4 rounded-none text-center">
                  No direct catalog match found. Ask our AI Assistant on the other tab to source similar custom items.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analysis.matchedProductIds.map(pId => {
                    const prod = PRODUCTS.find(p => p.id === pId);
                    if (!prod) return null;
                    const isInCart = cartProductIds.includes(prod.id);
                    return (
                      <div key={prod.id} className="flex gap-3 p-3 rounded-none border border-black bg-white hover:border-black transition-all">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="h-16 w-16 rounded-none object-cover bg-gray-50 border border-black/5"
                        />
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h6 className="text-xs font-serif font-bold text-gray-900 truncate leading-none">{prod.name}</h6>
                            <p className="text-[9px] font-mono text-gray-400 uppercase tracking-widest mt-1">{prod.category}</p>
                          </div>
                          <div className="flex items-center justify-between gap-1 mt-1.5 pt-1.5 border-t border-black/5">
                            <span className="text-xs font-bold font-mono text-gray-900">${prod.price.toFixed(2)}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => onViewProduct(prod)}
                                className="h-6 w-6 flex items-center justify-center rounded-none border border-black/25 bg-white text-gray-500 hover:text-black hover:border-black cursor-pointer"
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => onAddToCart(prod)}
                                className={`h-6 px-2.5 flex items-center justify-center gap-1 rounded-none text-[9px] uppercase tracking-wider font-bold transition-all border ${
                                  isInCart
                                    ? 'border-neutral-200 bg-neutral-100 text-gray-400 cursor-default'
                                    : 'border-black bg-black text-white hover:bg-neutral-800 cursor-pointer'
                                }`}
                              >
                                <ShoppingCart className="h-2.5 w-2.5" />
                                {isInCart ? 'Added' : 'Add'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
