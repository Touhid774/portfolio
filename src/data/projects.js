// ─────────────────────────────────────────────────────────────
//  PROJECTS — edit this file only; the cards update automatically.
//
//  Rules used here:
//  • `liveUrl`, `repoUrl`, `video`, `image` are null until you provide real ones.
//    Null links render as disabled buttons (nothing is invented).
//  • `features` / `tech` / `hardware` only contain what came from your
//    project descriptions. REVIEW them and delete or add so they match
//    exactly what you built before publishing.
//  • To add screenshots: put files in /public/images/ and set
//    image: '/images/zen-closet.webp' (16:10 ratio, ~1280×800 recommended).
//  • The category filter bar is generated from the categories used below,
//    so a "Frontend" filter appears automatically once a Frontend project exists.
// ─────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 'zen-closet',
    title: 'ZEN CLOSET',
    subtitle: 'Full-Stack E-commerce Website',
    category: 'Full-Stack',
    icon: 'shopping',
    featured: true,
    summary:
      'A clothing e-commerce platform designed to provide an online shopping experience with product browsing, cart management, order processing, and administrative controls.',
    features: [
      // REVIEW: keep only what is implemented. Ideas you mentioned: product variants,
      // inventory/stock management, admin dashboard, POS sales, payment integration.
      'Product browsing',
      'Cart management',
      'Order processing',
      'Administrative controls',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    hardware: [],
    image: null,
    imageAlt: 'ZEN CLOSET e-commerce storefront screenshot',
    gallery: [],
    liveUrl: null,
    repoUrl: null,
    video: null,
  },
  {
    id: 'realtime-chat',
    title: 'Real-Time Chat Application',
    subtitle: 'Full-Stack Messaging App',
    category: 'Full-Stack',
    icon: 'chat',
    featured: false,
    summary:
      'A real-time messaging application designed to enable users to communicate through a modern, responsive interface.',
    features: [
      // REVIEW: add authentication, online status, image sharing, profile management ONLY if built.
      'Real-time messaging',
      'Responsive chat interface',
    ],
    // REVIEW: Socket.io is assumed for real-time delivery; add Cloudinary etc. only if used.
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io'],
    hardware: [],
    image: null,
    imageAlt: 'Real-time chat application screenshot',
    gallery: [],
    liveUrl: null,
    repoUrl: null,
    video: null,
  },
  {
    id: 'food-delivery',
    title: 'Food Delivery Application',
    subtitle: 'Online Food Ordering',
    category: 'Full-Stack',
    icon: 'food',
    featured: false,
    summary:
      'An online food ordering application that allows customers to explore food items, manage a cart, and place orders through a convenient interface.',
    features: [
      // REVIEW: add authentication, order tracking, admin management, payments ONLY if completed.
      'Explore food items',
      'Cart management',
      'Order placement',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    hardware: [],
    image: null,
    imageAlt: 'Food delivery application screenshot',
    gallery: [],
    liveUrl: null,
    repoUrl: null,
    video: null,
  },
  {
    id: 'smart-home',
    title: 'Smart Home Automation System',
    subtitle: 'IoT Project',
    category: 'IoT',
    icon: 'iot',
    featured: false,
    summary:
      'A smart home automation project focused on connecting compatible home appliances and IoT devices to a control interface for convenient monitoring and management.',
    features: [
      // REVIEW: add e.g. remote light/fan control, status indicators, sensor monitoring,
      // automation rules ONLY for what was actually implemented.
      'Control interface for connected home appliances',
      'Monitoring and management of IoT devices',
    ],
    tech: ['IoT', 'Smart Home Automation'],
    // REVIEW: list the real hardware, e.g. ESP32 / ESP8266, relay modules, sensors.
    hardware: [],
    image: null,
    imageAlt: 'Smart home automation system demonstration',
    gallery: [], // [{ src: '/images/iot-1.webp', alt: 'Relay board wired to ESP32' }]
    liveUrl: null, // hardware projects may not have a live site
    repoUrl: null,
    video: null, // hardware demonstration video URL (YouTube, Drive, etc.)
  },
];
