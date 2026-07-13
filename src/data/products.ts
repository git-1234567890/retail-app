import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: "prod-backpack",
    name: "AeroGlide Ergonomic Backpack",
    category: "Outdoor & Travel",
    price: 129.00,
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    description: "The ultimate minimalist travel companion with weight-distribution system and theft-proof hidden compartments. Engineered for daily commutes and rugged trails.",
    details: [
      "Water-resistant 900D ballistic nylon material",
      "Ergonomic S-curve shoulder straps with foam padding",
      "Dedicated 16-inch padded laptop compartment",
      "Hidden RFID-blocking pockets for passport and cards",
      "Integrated USB charging pass-through port"
    ],
    specs: {
      "Capacity": "28 Liters",
      "Weight": "1.1 kg",
      "Material": "Ballistic Nylon & Polyester",
      "Dimensions": "48 x 32 x 18 cm",
      "Warranty": "Lifetime limited warranty"
    },
    tags: ["backpack", "travel", "hiking", "waterproof", "laptop bag", "minimalist", "commute"],
    stock: 25
  },
  {
    id: "prod-headphones",
    name: "Nova Sound ANC Headphones",
    category: "Electronic Gadgets",
    price: 249.00,
    rating: 4.9,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Immersive over-ear audio with hybrid active noise cancellation and high-fidelity custom-tuned drivers. Pure sound, uninterrupted comfort.",
    details: [
      "Advanced Hybrid ANC blocks up to 98% of ambient noise",
      "Hi-Res Audio certified with 40mm dynamic drivers",
      "Up to 45 hours of continuous wireless playback on a single charge",
      "Plush protein leather earcups with pressure-relieving memory foam",
      "Multi-point Bluetooth pairing connects to two devices simultaneously"
    ],
    specs: {
      "Frequency Response": "20Hz - 40kHz",
      "Battery Life": "45 hrs (ANC Off) / 35 hrs (ANC On)",
      "Charging": "USB-C, Quick Charge (10 mins = 5 hrs)",
      "Bluetooth Version": "5.3",
      "Microphones": "6 beamforming microphones"
    },
    tags: ["headphones", "audio", "wireless", "noise cancellation", "anc", "music", "bluetooth", "office", "electronic"],
    stock: 14
  },
  {
    id: "prod-lamp",
    name: "Aura Ambient LED Desk Lamp",
    category: "Home Appliances",
    price: 89.00,
    rating: 4.7,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    description: "Sleek architectural desk lamp featuring warm-to-cool smart temperature tuning, customizable brightness sliders, and an integrated wireless charger base.",
    details: [
      "Touch-capacitive slider controls with infinite dimming",
      "Adjustable color temperature from warm amber (2700K) to cool daylight (6500K)",
      "Flicker-free eye protection technology reduces visual strain",
      "15W Qi-certified fast wireless charging built into the oak wood base",
      "Dual-axis rotation for precise light positioning"
    ],
    specs: {
      "Power Consumption": "12W LED max",
      "Brightness": "850 Lumens max",
      "Color Temp Range": "2700K - 6500K",
      "Wireless Output": "15W Qi Standard",
      "Material": "Anodized Aluminum & Natural Oak"
    },
    tags: ["lamp", "lighting", "desk", "office", "minimalist", "wireless charger", "smart home", "appliance"],
    stock: 18
  },
  {
    id: "prod-keyboard",
    name: "Zenith Mechanical Keyboard",
    category: "Electronic Gadgets",
    price: 159.00,
    rating: 4.8,
    reviewsCount: 165,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    description: "Premium compact hot-swappable mechanical keyboard. Featuring dampening silicone pads for a deep, satisfying acoustic signature and beautiful south-facing RGB.",
    details: [
      "75% compact layout maximizes desk space for mouse movement",
      "Pre-lubed linear silent tactile switches for buttery-smooth typing",
      "Double-shot PBT keycaps with crisp legends that never fade",
      "Full aluminum casing with gasket mount for structural flex and acoustic resonance",
      "Triple connectivity: 2.4GHz wireless, Bluetooth 5.1, or wired USB-C"
    ],
    specs: {
      "Layout": "75% ANSI layout (84 keys)",
      "Switch Type": "Hot-swappable tactile pre-lubed",
      "Battery": "4000mAh lithium-polymer",
      "Keycap Material": "Double-Shot PBT (OEM profile)",
      "Compatibility": "Windows, macOS, Linux, iOS, Android"
    },
    tags: ["keyboard", "mechanical", "gaming", "office", "typing", "gadgets", "wireless", "rgb", "electronic"],
    stock: 9
  },
  {
    id: "prod-jacket",
    name: "Sierra Waterproof Trail Jacket",
    category: "Gents' Apparel",
    price: 179.00,
    rating: 4.6,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80",
    description: "Lightweight, fully seam-sealed hardshell jacket designed for variable elements. Combining superior rain-proofing with breathable ventilation membranes.",
    details: [
      "3-layer waterproof and windproof technical fabric shell",
      "Underarm zippered vents (pit zips) for rapid heat dispersion",
      "Fully adjustable storm hood with reinforced peak wire",
      "Waterproof YKK AquaGuard front zippers and hand pockets",
      "Cinchable hem drawcord and velcro wrist cuffs for locked-in heat"
    ],
    specs: {
      "Waterproof Rating": "15,000 mm hydrostatic head",
      "Breathability Rating": "10,000 g/m²/24h",
      "Weight": "420g (Size M)",
      "Fabric": "100% Recycled Ripstop Nylon",
      "Fit": "Athletic standard fit with room for layers"
    },
    tags: ["jacket", "apparel", "clothing", "waterproof", "hiking", "outdoor", "raincoat", "windproof", "gents", "mens"],
    stock: 30
  },
  {
    id: "prod-thermos",
    name: "Vanguard Insulated Flask",
    category: "Outdoor & Travel",
    price: 45.00,
    rating: 4.7,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    description: "Heavy-duty double-walled vacuum flask designed to keep coffee piping hot for days or glacier melt ice-cold during prolonged wilderness journeys.",
    details: [
      "TempShield double-wall vacuum insulation keeps drinks cold up to 24 hrs, hot up to 12 hrs",
      "Food-grade 18/8 pro-grade stainless steel ensures pure taste and no flavor transfer",
      "Durable powder coat paint resists sweat, scratches, and drops",
      "Leak-proof magnetic cap stays secured when pouring or sipping",
      "BPA-Free and Phthalate-Free construction"
    ],
    specs: {
      "Capacity": "32 oz (946 ml)",
      "Material": "18/8 Pro-Grade Stainless Steel",
      "Diameter": "9.1 cm",
      "Height": "25.0 cm",
      "Weight": "435g"
    },
    tags: ["thermos", "bottle", "water bottle", "outdoor", "camping", "hiking", "insulated", "travel"],
    stock: 45
  },
  {
    id: "prod-clock",
    name: "Chronos Minimalist Wall Clock",
    category: "Home Appliances",
    price: 75.00,
    rating: 4.5,
    reviewsCount: 54,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=600&q=80",
    description: "Quiet, silent-sweep quartz wall clock crafted with an architectural concrete composite face and elegant copper-plated needle hands.",
    details: [
      "Ultra-quiet silent-sweep movement (non-ticking quartz)",
      "Cast lightweight concrete dial for a tactile, modern brutalist aesthetic",
      "Genuine copper-anodized hour and minute indicators",
      "Minimalist design pairs beautifully with industrial, scandinavian, or modern decors",
      "Easy-mount recessed hanger slot on the rear"
    ],
    specs: {
      "Diameter": "30 cm (12 inches)",
      "Depth": "3.5 cm",
      "Power": "1x AA battery (not included)",
      "Weight": "1.2 kg",
      "Core Mechanism": "Taiwanese Young Town sweep movement"
    },
    tags: ["clock", "decor", "home", "minimalist", "brutalist", "living room", "timepiece", "appliance"],
    stock: 12
  },
  {
    id: "prod-sweater",
    name: "Summit Peak Merino Sweater",
    category: "Gents' Apparel",
    price: 115.00,
    rating: 4.8,
    reviewsCount: 76,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
    description: "Incredibly soft, non-itch knit sweater constructed with 100% fine Merino wool. Provides natural thermoregulation and odor-resistance for year-round wear.",
    details: [
      "Crafted exclusively from 19.5-micron fine Australian Merino fibers",
      "Natural wool properties adapt to body heat, keeping you warm in cold and breathable in warm climates",
      "Naturally antimicrobial wool structure actively neutralizes odors",
      "Double-ribbed collar, cuffs, and hem keep shape over years of wash and wear",
      "Sourced from certified ethical, mulesing-free livestock farms"
    ],
    specs: {
      "Composition": "100% Extra Fine Merino Wool",
      "Weight Class": "Medium weight (12-gauge knit)",
      "Fit": "Modern tailored fit",
      "Care Instructions": "Dry clean or gentle hand wash cold, dry flat",
      "Country of Origin": "Designed in Copenhagen, knitted in Italy"
    },
    tags: ["sweater", "apparel", "clothing", "merino wool", "winter", "warm", "knitwear", "minimalist", "gents", "mens"],
    stock: 20
  },
  // --- New Categories and Products ---
  {
    id: "prod-airpurifier",
    name: "Aether Air Purifier Pro",
    category: "Home Appliances",
    price: 349.00,
    rating: 4.9,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80",
    description: "Sculptural smart air purifier with three-stage True HEPA filtration, acoustic silence dampening, and automated laser particulate sensing.",
    details: [
      "H13 medical-grade True HEPA filter captures 99.97% of ultra-fine dust, allergens, and VOCs",
      "QuietStream technology runs at a near-whisper 22dB on night mode",
      "Laser particulate sensor measures PM2.5 levels with real-time digital light rings",
      "Covers up to 1,200 square feet with full air exchange twice per hour",
      "Minimalist aluminum finish complements sophisticated contemporary spaces"
    ],
    specs: {
      "CADR Rating": "400 m³/h",
      "Noise Level": "22dB - 52dB",
      "Power": "35W Energy Star Certified",
      "Filter Lifespan": "12 months (automated notification)",
      "Dimensions": "58 x 26 x 26 cm"
    },
    tags: ["air purifier", "hepa", "smart home", "appliance", "home", "clean air", "minimalist"],
    stock: 15
  },
  {
    id: "prod-espresso",
    name: "Kube Precision Espresso Extractor",
    category: "Home Appliances",
    price: 599.00,
    rating: 4.8,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    description: "Brushed stainless steel compact espresso machine with high-precision PID temperature controller and customizable extraction pressure profiling.",
    details: [
      "Full digital PID temperature adjustment within 0.5°C increments",
      "Professional 58mm solid brass portafilter with dual-spout configuration",
      "Italian-engineered 15-bar high-pressure vibration pump",
      "Commercial-grade manual steam wand for velvety microfoam milk texturing",
      "Sleek architectural cubic body crafted entirely from SUS304 steel"
    ],
    specs: {
      "Portafilter Size": "58mm Professional",
      "Water Tank Capacity": "1.8 Liters (Removable)",
      "Heating System": "Single thermo-block with PID regulation",
      "Power Consumption": "1450W",
      "Dimensions": "30 x 24 x 28 cm"
    },
    tags: ["espresso", "coffee", "machine", "appliance", "espresso maker", "kitchen", "brewing"],
    stock: 8
  },
  {
    id: "prod-oliveoil",
    name: "Bespoke Organic Extra Virgin Olive Oil",
    category: "Grocery",
    price: 42.00,
    rating: 4.9,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    description: "First cold-press single-estate organic extra virgin olive oil harvested in Spain, bottled in limited-run hand-numbered dark violet glass.",
    details: [
      "100% organic Picual olives harvested early in the season for maximized antioxidants",
      "First cold mechanical extraction preserves pure natural estate characteristics",
      "Rich herbaceous aroma with distinct notes of tomato vine, green apple, and fresh almond",
      "Housed in protective ultraviolet glass to block light damage and preserve active enzymes",
      "Certified organic, non-GMO, unfiltered for genuine complex flavor profiles"
    ],
    specs: {
      "Acidity Level": "< 0.15% (Ultra-low)",
      "Harvest Year": "2026 Single Estate",
      "Origin": "Andalusia, Spain",
      "Volume": "500 ml",
      "Certification": "USDA Organic & EU Eco-certified"
    },
    tags: ["olive oil", "organic", "grocery", "gourmet", "cooking", "extra virgin", "healthy"],
    stock: 50
  },
  {
    id: "prod-honey",
    name: "Valkyrie High-Mountain Raw Honey",
    category: "Grocery",
    price: 28.00,
    rating: 4.9,
    reviewsCount: 85,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    description: "Pure raw wild honey cold-extracted from high-elevation clover and wild thyme. Delicate floral profiles with unmatched enzymatic purity.",
    details: [
      "Sourced exclusively from migratory mountain apiaries above 1,800 meters",
      "Unheated, unpasteurized, and unfiltered to guarantee complete retention of pollen and nutrients",
      "Complex floral sweetness with a deep amber color and natural thick crystalline texture",
      "Rich in natural antioxidants, live enzymes, and antibacterial compounds",
      "Sealed in apothecary-grade stoneware jars with hand-dipped beeswax seals"
    ],
    specs: {
      "Purity": "100% Raw Wildflower Honey",
      "Origin": "Southern Alps alpine pastures",
      "Harvest": "Late Summer Batch",
      "Volume": "375g",
      "Texture": "Naturally crystallizing, soft creamy spread"
    },
    tags: ["honey", "raw honey", "grocery", "organic", "superfood", "wildflower", "sweetener"],
    stock: 40
  },
  {
    id: "prod-coffeebeans",
    name: "Zenith Single-Origin Coffee Beans",
    category: "Grocery",
    price: 24.00,
    rating: 4.7,
    reviewsCount: 134,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80",
    description: "Micro-lot light-roasted heirloom Arabica beans sourced directly from Yirgacheffe, Ethiopia. Beautiful flavor notes of jasmine, bergamot, and sweet peach.",
    details: [
      "100% single-origin heirloom variety Arabica coffee beans",
      "Wet-processed (washed) method highlights brilliant clean acidity and floral tea-like clarity",
      "Light roasted on precision Loring roasters to retain fragile volatile flavor molecules",
      "Sourced via ethical direct-trade relationships paying 45% above Fair Trade minimums",
      "Packaged in nitrogen-flushed bags with high-barrier degassing valves for maximum freshness"
    ],
    specs: {
      "Roast Profile": "Light Roast (Filter optimal)",
      "Elevation": "1,950m - 2,100m",
      "Flavor Notes": "Jasmine, Bergamot, Lemon Verbena, White Peach",
      "Package Weight": "250g (Whole Bean)",
      "Process": "Washed, sun-dried on raised African beds"
    },
    tags: ["coffee", "beans", "coffee beans", "grocery", "single origin", "specialty coffee", "beverage"],
    stock: 60
  },
  {
    id: "prod-projector",
    name: "Iris 4K Modular Smart Projector",
    category: "Electronic Gadgets",
    price: 899.00,
    rating: 4.9,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=600&q=80",
    description: "Cylindrical wireless laser projector featuring native 4K display, auto-keystone alignment, and high-performance 360-degree sound system.",
    details: [
      "Advanced ALPD laser technology delivers outstanding 2,200 ANSI Lumens of brightness",
      "Native 4K UHD resolution with HDR10+ support for cinema-grade color depths",
      "Seamless instant auto-focus, horizontal/vertical auto-keystone, and smart obstacle avoidance",
      "Integrated 20W dual-passive speaker system engineered by master acoustic designers",
      "Anodized titanium outer tube with flexible magnetic pivoting base"
    ],
    specs: {
      "Resolution": "4K UHD (3840 x 2160)",
      "Brightness": "2200 ANSI Lumens",
      "Light Source Lifespan": "25,000 hours",
      "Aspect Ratio": "16:9 native (supports 4:3)",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.2, HDMI 2.1 eARC, USB-C"
    },
    tags: ["projector", "laser projector", "gadgets", "home cinema", "4k", "electronic", "wireless"],
    stock: 7
  },
  {
    id: "prod-silkdress",
    name: "Aura Silk Bias-Cut Slip Dress",
    category: "Ladies' Apparel",
    price: 210.00,
    rating: 4.8,
    reviewsCount: 56,
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80",
    description: "Exquisite heavyweight 22-momme Mulberry silk slip dress, fluidly cut on the bias to drape beautifully. Tailored for effortless elegant evening silhouettes.",
    details: [
      "Spun from 100% fine 22-momme premium grade Mulberry silk fibers",
      "Bias-cut construction moves naturally with the body, creating dynamic fluid contours",
      "Double-layered breast panels for complete coverage and structural clean support",
      "Adjustable micro-spaghetti shoulder straps with durable gold-toned metal hardware",
      "Finished with hand-rolled French seams for absolute interior silk luxury"
    ],
    specs: {
      "Material": "100% Grade 6A Mulberry Silk",
      "Weight Class": "Heavyweight 22 Momme Silk",
      "Length": "Midi-length with flared hem",
      "Care": "Hand wash cold with silk detergent or Dry Clean",
      "Sizing": "Standard true-to-size drape fit"
    },
    tags: ["dress", "silk", "ladies", "womens", "apparel", "clothing", "luxury", "eveningwear"],
    stock: 12
  },
  {
    id: "prod-linencoat",
    name: "Helios Pure Linen Trench Coat",
    category: "Ladies' Apparel",
    price: 265.00,
    rating: 4.6,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    description: "Double-breasted unstructured trench coat constructed from 100% Belgian flax linen. Perfect organic breathable layering for mid-season warm elegance.",
    details: [
      "Constructed from heritage-grade long-staple Belgian flax fibers",
      "Pre-washed and enzyme-softened to eliminate linen stiffness, offering beautiful relaxed wrinkles",
      "Classic double-breasted closure featuring eco-friendly recycled paper-pulp buttons",
      "Adjustable matching linen waist belt and adjustable wrist tabs",
      "Generous side storm slits and rear wind flap for dramatic dynamic movement"
    ],
    specs: {
      "Material": "100% Organic Belgian Flax Linen",
      "Weight": "Medium-heavy structured linen drape (280 GSM)",
      "Fit": "Oversized relaxed silhouette",
      "Lining": "Unlined for maximum warm-weather breathability",
      "Pockets": "Two oversized deep welt hand pockets"
    },
    tags: ["trench coat", "linen", "apparel", "clothing", "ladies", "womens", "summer", "sustainable"],
    stock: 15
  },
  {
    id: "prod-charcoalflannel",
    name: "Atlas Tailored Herringbone Shirt",
    category: "Gents' Apparel",
    price: 95.00,
    rating: 4.7,
    reviewsCount: 48,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    description: "Tailored luxury casual shirt made from thick organic cotton flannel with custom herringbone weave and genuine tortoiseshell buttons.",
    details: [
      "Spun from certified 100% long-staple organic Egyptian cotton",
      "Heavy brushed finish on both sides for exceptional softness and robust winter insulation",
      "Bespoke herringbone micro-weave pattern developed in-house by weavers",
      "Premium construction featuring lock-stitched dual seams and reinforced collar stand",
      "Adorned with sustainable harvested biological tortoiseshell buttons"
    ],
    specs: {
      "Material": "100% Organic Brushed Cotton",
      "Weight": "210 GSM heavy-weight casual flannel",
      "Fit": "Modern tailored casual fit",
      "Collar": "Semi-spread structured casual collar",
      "Origin": "Designed in London, woven in Portugal"
    },
    tags: ["shirt", "flannel", "herringbone", "gents", "mens", "apparel", "clothing", "brushed cotton"],
    stock: 22
  }
];

export function searchProducts(query: string): Product[] {
  const normQuery = query.toLowerCase().trim();
  if (!normQuery) return PRODUCTS;
  
  return PRODUCTS.filter(prod => {
    const inName = prod.name.toLowerCase().includes(normQuery);
    const inDesc = prod.description.toLowerCase().includes(normQuery);
    const inCat = prod.category.toLowerCase().includes(normQuery);
    const inTags = prod.tags.some(tag => tag.toLowerCase().includes(normQuery));
    return inName || inDesc || inCat || inTags;
  });
}
