import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product5 from "@/assets/product-5.jpg";
import product7 from "@/assets/product-7.jpg";
import product9 from "@/assets/product-9.jpg";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  badge?: "bestseller" | "new";
  colors?: string[];
  category: string;
  description?: string;
}

export const allProducts: Product[] = [
  { 
    id: 1, 
    name: "Boat Headphone Pro", 
    price: 120, 
    originalPrice: 150,
    image: product1, 
    rating: 4, 
    badge: "bestseller",
    colors: ["#000000", "#FFFFFF", "#1E40AF"],
    category: "headphones",
    description: "Premium wireless headphones with active noise cancellation"
  },
  { 
    id: 2, 
    name: "Rocky Mountain Earbuds", 
    price: 420, 
    originalPrice: 520,
    image: product2, 
    rating: 5, 
    badge: "new",
    colors: ["#000000", "#DC2626"],
    category: "earbuds",
    description: "High-fidelity earbuds with deep bass"
  },
  { 
    id: 3, 
    name: "VR Gaming Goggles", 
    price: 320, 
    originalPrice: 400,
    image: product3, 
    rating: 4,
    colors: ["#000000", "#6B7280"],
    category: "gaming",
    description: "Immersive VR experience for gamers"
  },
  { 
    id: 4, 
    name: "Printed Wireless Earbuds", 
    price: 220, 
    originalPrice: 280,
    image: product1, 
    rating: 5,
    badge: "bestseller",
    colors: ["#FFFFFF", "#F59E0B"],
    category: "earbuds",
    description: "Stylish earbuds with custom prints"
  },
  { 
    id: 5, 
    name: "Studio Monitor Headphone", 
    price: 180, 
    originalPrice: 220,
    image: product5, 
    rating: 4,
    badge: "new",
    colors: ["#000000", "#1E40AF", "#DC2626"],
    category: "headphones",
    description: "Professional studio monitoring headphones"
  },
  { 
    id: 6, 
    name: "Gaming Headset RGB", 
    price: 350, 
    originalPrice: 450,
    image: product9, 
    rating: 5,
    badge: "bestseller",
    colors: ["#000000", "#10B981"],
    category: "gaming",
    description: "RGB gaming headset with surround sound"
  },
  { 
    id: 7, 
    name: "Portable Speaker", 
    price: 280, 
    originalPrice: 350,
    image: product7, 
    rating: 4,
    colors: ["#000000", "#FFFFFF", "#DC2626"],
    category: "speakers",
    description: "Portable Bluetooth speaker with 20hr battery"
  },
  { 
    id: 8, 
    name: "Premium Wireless Buds", 
    price: 199, 
    originalPrice: 250,
    image: product5, 
    rating: 5,
    colors: ["#FFFFFF", "#000000"],
    category: "earbuds",
    description: "Premium sound quality in compact design"
  },
  { 
    id: 9, 
    name: "Bass Booster Headphone", 
    price: 150, 
    originalPrice: 200,
    image: product1, 
    rating: 4,
    colors: ["#000000", "#1E40AF"],
    category: "headphones",
    description: "Extra bass for music lovers"
  },
  { 
    id: 10, 
    name: "Wireless Neckband", 
    price: 89, 
    originalPrice: 120,
    image: product2, 
    rating: 4,
    colors: ["#000000", "#DC2626", "#10B981"],
    category: "earbuds",
    description: "Comfortable neckband for all-day wear"
  },
  { 
    id: 11, 
    name: "Smart Speaker Mini", 
    price: 149, 
    originalPrice: 180,
    image: product7, 
    rating: 5,
    badge: "new",
    colors: ["#FFFFFF", "#000000"],
    category: "speakers",
    description: "Compact smart speaker with voice assistant"
  },
  { 
    id: 12, 
    name: "Pro Gaming Controller", 
    price: 79, 
    originalPrice: 99,
    image: product9, 
    rating: 4,
    colors: ["#000000", "#FFFFFF"],
    category: "gaming",
    description: "Precision gaming controller for pros"
  },
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "headphones", name: "Headphones" },
  { id: "earbuds", name: "Earbuds" },
  { id: "speakers", name: "Speakers" },
  { id: "gaming", name: "Gaming" },
];
