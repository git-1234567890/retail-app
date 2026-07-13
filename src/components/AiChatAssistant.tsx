import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, VolumeX, Sparkles, AlertCircle, ShoppingCart, Eye, MessageSquareCode } from 'lucide-react';
import { ChatMessage, Product } from '../types';
import { PRODUCTS } from '../data/products';

interface AiChatAssistantProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  cartProductIds: string[];
  externalPrompt?: string | null;
  clearExternalPrompt?: () => void;
}

export default function AiChatAssistant({
  messages,
  setMessages,
  onAddToCart,
  onViewProduct,
  cartProductIds,
  externalPrompt,
  clearExternalPrompt,
}: AiChatAssistantProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle external prompts (e.g. from Product detail page)
  useEffect(() => {
    if (externalPrompt) {
      handleSendPrompt(externalPrompt);
      if (clearExternalPrompt) clearExternalPrompt();
    }
  }, [externalPrompt]);

  // Preset quick chips
  const PRESETS = [
    { text: "🎒 Suggest products for a weekend mountain hike", label: "Mountain Hiking" },
    { text: "🎧 Find high-quality noise-cancelling headphones", label: "Noise Cancelling" },
    { text: "🎁 Recommend a premium lifestyle gift under $100", label: "Gifts Under $100" },
    { text: "💻 Compare Zenith Mechanical Keyboard with other study tech", label: "Keyboard Comparison" }
  ];

  // TTS browser speaking helper
  const speakText = (text: string) => {
    if (!ttsEnabled || !window.speechSynthesis) return;
    // Cancel any current utterances
    window.speechSynthesis.cancel();
    
    // Clean text from emojis, markdowns for cleaner voice synthesis
    const cleanText = text.replace(/[\#\*\_\[\]\-\:\)\(]|\bprod-\w+/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorMsg(null);
    const userMsgId = 'msg-' + Date.now();
    const newUserMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Assemble history context
      const chatHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatHistory
        })
      });

      if (!response.ok) {
        throw new Error("The retail assistant server encountered an error.");
      }

      const data = await response.json();
      
      const assistantMessage: ChatMessage = {
        id: 'msg-ast-' + Date.now(),
        role: 'assistant',
        content: data.reply || "I am here to help you shop. What products can I find you?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedProducts: data.recommendedProductIds || []
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Speak assistant text if TTS is active
      if (ttsEnabled && assistantMessage.content) {
        speakText(assistantMessage.content);
      }
    } catch (error: any) {
      console.error(error);
      setErrorMsg("Unable to contact AI server. Please make sure GEMINI_API_KEY is configured in Settings > Secrets.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendPrompt(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-[#FDFDFD] rounded-none border border-black overflow-hidden relative">
      
      {/* Top Banner Control Header */}
      <div className="px-6 py-4 border-b border-black bg-[#F7F7F7] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-black animate-ping" />
          <h3 className="font-serif text-base font-bold italic text-gray-900 flex items-center gap-1.5">
            <MessageSquareCode className="h-4 w-4 text-black" />
            Nexia Shopping Advisor
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* TTS Speaker Toggle */}
          <button
            id="tts-toggle-btn"
            onClick={() => {
              const nextState = !ttsEnabled;
              setTtsEnabled(nextState);
              if (!nextState && window.speechSynthesis) {
                window.speechSynthesis.cancel();
              }
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-none text-[9px] uppercase tracking-widest font-mono font-bold transition-all border ${
              ttsEnabled
                ? 'bg-black border-black text-white'
                : 'bg-white border-black/20 text-gray-500 hover:text-black hover:border-black'
            }`}
            title={ttsEnabled ? "Disable Text-To-Speech" : "Enable Text-To-Speech"}
          >
            {ttsEnabled ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-white animate-bounce" />
                VOICE OUTPUT ON
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5" />
                VOICE OUTPUT OFF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#FDFDFD]">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-none border border-black bg-[#F7F7F7] text-black">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold italic text-gray-900">Your AI Personal Shopper</h4>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Welcome. Ask me to recommend products, compare technical specifications, identify high-fashion fits, or inquire about materials and pricing.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            id={`chat-msg-${msg.id}`}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-none p-5 ${
              msg.role === 'user'
                ? 'bg-[#1A1A1A] text-white'
                : 'bg-[#F7F7F7] border border-black/10 text-gray-800'
            }`}>
              <div className="text-[9px] font-mono uppercase tracking-widest opacity-55 mb-2 flex justify-between gap-4 border-b border-black/5 pb-1.5">
                <span>{msg.role === 'user' ? 'You' : 'Nexia Advisor'}</span>
                <span>{msg.timestamp}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">{msg.content}</p>

              {/* Suggested Product Cards Inline */}
              {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                <div className="mt-4 pt-3 border-t border-black/10 space-y-2.5">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-black font-mono block">AI RECOMMENDED MATCHES:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {msg.suggestedProducts.map(pId => {
                      const prod = PRODUCTS.find(p => p.id === pId);
                      if (!prod) return null;
                      const isInCart = cartProductIds.includes(prod.id);
                      return (
                        <div key={prod.id} className="flex gap-2.5 p-2.5 rounded-none bg-white border border-black shadow-xs hover:border-black transition-all">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="h-14 w-14 rounded-none object-cover bg-[#F7F7F7]"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <h5 className="text-xs font-serif font-bold text-gray-900 truncate leading-tight">{prod.name}</h5>
                            <div className="flex items-center justify-between gap-1 mt-1.5">
                              <span className="text-xs font-bold font-mono text-gray-900">${prod.price.toFixed(2)}</span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => onViewProduct(prod)}
                                  className="h-6 w-6 flex items-center justify-center rounded-none border border-black/25 bg-white text-gray-500 hover:text-black hover:border-black"
                                  title="Quick View"
                                >
                                  <Eye className="h-3 w-3" />
                                </button>
                                <button
                                  onClick={() => onAddToCart(prod)}
                                  className={`h-6 px-2.5 flex items-center justify-center gap-1 rounded-none text-[9px] uppercase tracking-wider font-bold transition-all border ${
                                    isInCart
                                      ? 'border-neutral-200 bg-neutral-100 text-gray-500 cursor-default'
                                      : 'border-black bg-black text-white hover:bg-neutral-800'
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
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#F7F7F7] border border-black/10 rounded-none p-4 flex items-center gap-3">
              <div className="flex space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-black animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 rounded-full bg-black animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 rounded-full bg-black animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Nexia is curation modeling...</span>
            </div>
          </div>
        )}

        {/* Floating Error Box */}
        {errorMsg && (
          <div className="rounded-none border border-black bg-red-50 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider font-mono text-red-950">System Configuration Warning</h5>
              <p className="text-xs text-red-800 mt-1 leading-relaxed">{errorMsg}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Helper Preset Chips */}
      <div className="px-6 py-3 border-t border-black/10 overflow-x-auto flex gap-2 scrollbar-none bg-[#F7F7F7]">
        {PRESETS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(p.text)}
            className="shrink-0 px-3.5 py-1.5 rounded-none border border-black/15 bg-white text-[9px] uppercase tracking-widest font-mono font-bold text-gray-500 hover:text-black hover:border-black transition-all cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Submit Bar */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-black bg-[#FDFDFD] flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Inquire about custom sizing, outdoor bags, audio comparison..."
          disabled={isLoading}
          className="flex-1 rounded-none border border-black bg-white px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-black transition-all disabled:opacity-50 uppercase tracking-wide font-sans"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="flex h-11 w-11 items-center justify-center rounded-none bg-black text-white hover:bg-neutral-800 disabled:opacity-40 transition-all cursor-pointer"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
