import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "./src/data/products.ts";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up JSON body size limit for base64 visual search uploads
app.use(express.json({ limit: '10mb' }));

// Lazy initialize Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. AI features will require this key to be set in the platform secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Ensure the product catalog structure is clearly provided to the model in instructions
const CATALOG_INFO = PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category,
  price: p.price,
  description: p.description,
  tags: p.tags
}));

// API Endpoint 1: Semantic AI Shopping Assistant Chat
app.post("/api/gemini/chat", async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    const ai = getGeminiClient();

    // We compile the history for the model.
    // The format should be friendly to conversational structure.
    const formattedHistory = Array.isArray(history) 
      ? history.map((msg: any) => `${msg.role === 'user' ? 'Customer' : 'Assistant'}: ${msg.content}`).join("\n")
      : "";

    const systemInstruction = `You are an elite AI Shopping Assistant at a premium multi-category retail store. 
Your goal is to help customers find products, answer their questions about specs/uses, and recommend matching items.
You MUST ONLY recommend products that are present in the store's current catalog list provided below. DO NOT make up products outside of this catalog.

Here is the store's current catalog:
${JSON.stringify(CATALOG_INFO, null, 2)}

Instructions:
1. Provide extremely helpful, polite, and persuasive replies to the customer.
2. If they ask about hiking, outdoors, weather, gadgets, desk accessories, audio, or lighting, suggest the relevant item(s) from the catalog.
3. Be honest about product specifications using the detailed descriptions and pricing.
4. You MUST respond in a structured JSON format containing the assistant's verbal reply AND an array of recommended product IDs from our catalog that fit their request (if any).
`;

    const userPrompt = `${formattedHistory}\nCustomer: ${message}\nAssistant:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: "The verbal assistant response to the customer."
            },
            recommendedProductIds: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING
              },
              description: "List of valid product IDs from the catalog recommended to the customer (e.g. ['prod-backpack', 'prod-jacket']). Keep it empty if no specific product is highly relevant."
            }
          },
          required: ["reply", "recommendedProductIds"]
        }
      }
    });

    const resultText = response.text || "{}";
    const resultObj = JSON.parse(resultText);
    res.json(resultObj);
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ 
      error: "Failed to communicate with AI Assistant.", 
      details: error.message 
    });
  }
});

// API Endpoint 2: Visual Search / Style Analyzer
app.post("/api/gemini/visual-search", async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType } = req.body;
    if (!imageBase64) {
      res.status(400).json({ error: "imageBase64 is required." });
      return;
    }

    const ai = getGeminiClient();

    const imagePart = {
      inlineData: {
        mimeType: mimeType || "image/jpeg",
        data: imageBase64
      }
    };

    const systemInstruction = `You are a Visual Fashion, Style, and Product Analyzer for our premium retail store.
Analyze the provided image in detail. Identify the product category, design style, aesthetic vibes, colors, materials, and potential uses.
Then, suggest which of our current store products is the closest match to the item in the image.

Here is our catalog:
${JSON.stringify(CATALOG_INFO, null, 2)}

You MUST respond in JSON format with detailed analysis metrics.
`;

    const promptText = "Analyze this product photo. Fill out the style properties, colors, materials, write a professional description, suggest 5 SEO search keywords, and identify any matched product IDs from our catalog that look like this, or would complement this item beautifully.";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [imagePart, { text: promptText }],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productType: {
              type: Type.STRING,
              description: "The core type of product seen (e.g., Mechanical Keyboard, Leather Backpack, Fleece Jacket, Desk Lamp)."
            },
            style: {
              type: Type.STRING,
              description: "The design aesthetic (e.g., Minimalist Brutalist, Scandinavian Modern, Rugged Outdoors, Tech Professional)."
            },
            colorPalette: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Dominant colors identified in the image."
            },
            materials: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Inferred materials (e.g., Anodized Aluminum, Concrete composite, Fine Merino Wool, Ballistic Nylon)."
            },
            suggestedKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "5 high-impact retail tags or keywords."
            },
            description: {
              type: Type.STRING,
              description: "A highly descriptive, retail-focused explanation of the product's style, aesthetic, and visual details."
            },
            matchedProductIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Matching or highly complementary product IDs from our catalog."
            }
          },
          required: ["productType", "style", "colorPalette", "materials", "suggestedKeywords", "description", "matchedProductIds"]
        }
      }
    });

    const resultText = response.text || "{}";
    const resultObj = JSON.parse(resultText);
    res.json(resultObj);
  } catch (error: any) {
    console.error("Gemini Visual Search Error:", error);
    res.status(500).json({ 
      error: "Failed to analyze product image.", 
      details: error.message 
    });
  }
});

// API Endpoint 3: Seller Copywriter Studio
app.post("/api/gemini/seller-studio", async (req: Request, res: Response) => {
  try {
    const { name, category, price, features } = req.body;
    if (!name) {
      res.status(400).json({ error: "Product name is required for Seller Studio." });
      return;
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are a brilliant professional Copywriter, SEO Optimizer, and Digital Marketer for a high-end modern e-commerce platform.
Your task is to take basic raw product inputs and generate a comprehensive e-commerce bundle consisting of a optimized product title, high-converting tagline, SEO-friendly structured description, key selling bullet points, and high-impact social media promotional post.`;

    const userPrompt = `Generate a marketing copywriting bundle for this product:
Name: ${name}
Category: ${category || "General"}
Target Price: $${price || "TBD"}
Key Features/Notes: ${features || "Premium build, minimalist design, reliable performance."}

Your response must be JSON only.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "An optimized, catchy product title for maximum clicks."
            },
            tagline: {
              type: Type.STRING,
              description: "A single bold, inspiring punchline/tagline (under 12 words)."
            },
            seoDescription: {
              type: Type.STRING,
              description: "A robust, beautiful, highly engaging, multi-paragraph product description integrated with natural SEO keywords."
            },
            bulletPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4-5 high-impact, feature-benefit bullet points emphasizing value (with premium emojis)."
            },
            socialPost: {
              type: Type.STRING,
              description: "An engaging social media post (e.g. for Instagram/Twitter) with hook, benefits, and call to action."
            },
            instagramHashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "5-8 highly relevant marketing hashtags."
            }
          },
          required: ["title", "tagline", "seoDescription", "bulletPoints", "socialPost", "instagramHashtags"]
        }
      }
    });

    const resultText = response.text || "{}";
    const resultObj = JSON.parse(resultText);
    res.json(resultObj);
  } catch (error: any) {
    console.error("Gemini Seller Studio Error:", error);
    res.status(500).json({ 
      error: "Failed to generate copywriting bundle.", 
      details: error.message 
    });
  }
});

// Configure Vite middleware or production static build serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} with environment ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();
