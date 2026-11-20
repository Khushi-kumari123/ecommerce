const products = [
  {
    name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "Industry-leading noise cancellation optimized to you. Magnificent sound engineered to perfection with 30-hour battery life and ultra-comfortable lightweight design.",
    brand: "Sony",
    category: "Audio",
    price: 349.99,
    originalPrice: 399.99,
    countInStock: 15,
    rating: 4.8,
    numReviews: 42,
    isFeatured: true,
    specs: {
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.2 / 3.5mm AUX",
      "Noise Cancellation": "Dual Processor V1 + HD QN1",
      "Weight": "250g"
    }
  },
  {
    name: "Apple MacBook Air M3 (15-inch, 16GB, 512GB SSD)",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    description: "Strikingly thin and fast. Powered by the next-generation M3 chip, this MacBook Air breezes through work and play with up to 18 hours of all-day battery life.",
    brand: "Apple",
    category: "Laptops",
    price: 1299.00,
    originalPrice: 1499.00,
    countInStock: 8,
    rating: 4.9,
    numReviews: 87,
    isFeatured: true,
    specs: {
      "Processor": "Apple M3 8-core CPU / 10-core GPU",
      "Memory": "16GB Unified Memory",
      "Storage": "512GB PCIe SSD",
      "Display": "15.3-inch Liquid Retina"
    }
  },
  {
    name: "Samsung Galaxy Watch 6 Classic (47mm, Bluetooth)",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description: "Classic styling meets advanced health tracking. Features a rotating bezel, personalized heart rate zones, sleep coaching, and sapphire crystal glass.",
    brand: "Samsung",
    category: "Wearables",
    price: 299.99,
    originalPrice: 369.99,
    countInStock: 20,
    rating: 4.6,
    numReviews: 31,
    isFeatured: false,
    specs: {
      "Display": "1.5-inch Super AMOLED",
      "Water Resistance": "5ATM + IP68",
      "Battery": "Up to 40 hours",
      "Compatibility": "Android 10.0+"
    }
  },
  {
    name: "Fujifilm X-T5 Mirrorless Digital Camera (Body)",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    description: "40.2MP X-Trans CMOS 5 HR sensor with 5-axis in-body image stabilization. Classic dial-based design delivering stunning photographic fidelity and 6.2K video.",
    brand: "Fujifilm",
    category: "Cameras",
    price: 1699.95,
    originalPrice: 1799.95,
    countInStock: 5,
    rating: 4.9,
    numReviews: 24,
    isFeatured: true,
    specs: {
      "Sensor": "40.2MP APS-C X-Trans CMOS 5 HR",
      "Video": "6.2K at 30p, 4K at 60p",
      "Stabilization": "7-stop 5-axis IBIS",
      "Shutter Speed": "Up to 1/180,000s electronic"
    }
  },
  {
    name: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    description: "Full CNC aluminum body, 75% layout, hot-swappable switches, double-gasket mount design, and customizable RGB backlighting via QMK/VIA.",
    brand: "Keychron",
    category: "Accessories",
    price: 199.00,
    originalPrice: 219.00,
    countInStock: 12,
    rating: 4.7,
    numReviews: 53,
    isFeatured: false,
    specs: {
      "Layout": "75% (81 Keys)",
      "Switches": "Keychron K Pro Red Mechanical",
      "Connection": "Bluetooth 5.1 / Type-C Wired",
      "Body Material": "Full CNC Machined Aluminum"
    }
  },
  {
    name: "Logitech MX Master 3S Wireless Performance Mouse",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    description: "Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and an 8,000 DPI track-on-glass sensor.",
    brand: "Logitech",
    category: "Accessories",
    price: 99.99,
    originalPrice: 109.99,
    countInStock: 35,
    rating: 4.8,
    numReviews: 112,
    isFeatured: false,
    specs: {
      "Sensor": "Darkfield 8000 DPI",
      "Battery": "Rechargeable Li-Po (500 mAh)",
      "Scrolling": "MagSpeed Electromagnetic wheel",
      "Connectivity": "Logi Bolt / Bluetooth Low Energy"
    }
  },
  {
    name: "Bose SoundLink Revolve+ II Bluetooth Speaker",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    description: "Deep, loud, and immersive 360-degree sound. Durable, water- and dust-resistant design (IP55) with up to 17 hours of battery life and built-in handle.",
    brand: "Bose",
    category: "Audio",
    price: 249.00,
    originalPrice: 329.00,
    countInStock: 18,
    rating: 4.7,
    numReviews: 64,
    isFeatured: false,
    specs: {
      "Battery Life": "Up to 17 hours",
      "Water Resistance": "IP55 rating",
      "Wireless Range": "Up to 30 ft (9 m)",
      "Voice Control": "Siri & Google Assistant supported"
    }
  },
  {
    name: "Minimalist Italian Leather Travel Duffle Bag",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    description: "Handcrafted from full-grain vegetable-tanned leather. Features brass hardware, padded laptop compartment, waterproof shoe compartment, and YKK zippers.",
    brand: "Artisan Leather",
    category: "Fashion",
    price: 189.50,
    originalPrice: 240.00,
    countInStock: 14,
    rating: 4.9,
    numReviews: 38,
    isFeatured: true,
    specs: {
      "Material": "100% Full-grain Italian Leather",
      "Capacity": "42 Liters",
      "Dimensions": "20.5 x 11.5 x 10 inches",
      "Warranty": "Lifetime craftsmanship warranty"
    }
  },
  {
    name: "Modern Ceramic Pour-Over Coffee Brewing Set",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    description: "Artisan matte black ceramic dripper with borosilicate glass carafe, walnut wood stand, and precision micro-mesh stainless steel reusable filter.",
    brand: "Kurasu",
    category: "Home & Kitchen",
    price: 74.99,
    originalPrice: 89.99,
    countInStock: 25,
    rating: 4.8,
    numReviews: 29,
    isFeatured: false,
    specs: {
      "Carafe Capacity": "600ml (2-4 cups)",
      "Material": "Ceramic, Heat-resistant Glass, Walnut",
      "Filter Type": "Stainless steel mesh or V60 paper",
      "Dishwasher Safe": "Glass carafe only"
    }
  },
  {
    name: "Ray-Ban Classic Polarized Wayfarer Sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    description: "The timeless original silhouette. Features polarized green classic G-15 lenses that eliminate 99% of reflected light and provide 100% UV protection.",
    brand: "Ray-Ban",
    category: "Fashion",
    price: 163.00,
    originalPrice: 213.00,
    countInStock: 22,
    rating: 4.6,
    numReviews: 76,
    isFeatured: false,
    specs: {
      "Frame Material": "Acetate Gloss Black",
      "Lens Technology": "Polarized G-15 Green",
      "Bridge Width": "22mm",
      "Temple Length": "150mm"
    }
  },
  {
    name: "Kindle Paperwhite Signature Edition (32 GB)",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    description: "6.8-inch glare-free display with adjustable warm light, auto-adjusting front light, and wireless charging. Up to 10 weeks of battery life.",
    brand: "Amazon",
    category: "Electronics",
    price: 179.99,
    originalPrice: 199.99,
    countInStock: 30,
    rating: 4.9,
    numReviews: 145,
    isFeatured: true,
    specs: {
      "Storage": "32 GB",
      "Display": "6.8\" glare-free 300 ppi",
      "Battery Life": "Up to 10 weeks",
      "Waterproofing": "IPX8 (2m fresh water 60 min)"
    }
  },
  {
    name: "AeroPress Clear Coffee & Espresso Maker",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    description: "Patented 3-in-1 brew technology that combines the best of French press, pour-over, and espresso brewing in under a minute without bitterness or grit.",
    brand: "AeroPress",
    category: "Home & Kitchen",
    price: 49.95,
    originalPrice: 59.95,
    countInStock: 40,
    rating: 4.8,
    numReviews: 92,
    isFeatured: false,
    specs: {
      "Material": "Shatterproof Tritan clear plastic",
      "Capacity": "10 oz (296 ml)",
      "Brew Time": "1-2 minutes",
      "Portability": "Compact and travel-friendly"
    }
  }
];

module.exports = products;
