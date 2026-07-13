export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  details: string[];
  specs: { [key: string]: string };
  tags: string[];
  stock: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedProducts?: string[]; // array of product IDs recommended by AI
}

export interface VisualAnalysis {
  productType: string;
  style: string;
  colorPalette: string[];
  materials: string[];
  suggestedKeywords: string[];
  description: string;
  matchedProductIds: string[];
}

export interface SellerListing {
  title: string;
  tagline: string;
  seoDescription: string;
  bulletPoints: string[];
  socialPost: string;
  instagramHashtags: string[];
}
