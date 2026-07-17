export type Category = {
    id: string;
    name: string;
    slug: string;
    description?: string;
};

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    stock: number;
    wholesalePrice?: number;
    wholesaleMinQty?: number;
    currency?: 'USD' | 'UGX';
    specifications?: Record<string, string>;
    usageInstructions?: string[];
    videoUrl?: string;
};

export const categories: Category[] = [
    { id: '6', name: 'Door Locks', slug: 'door-locks', description: 'Secure your home with premium door locks.' },
    { id: '7', name: 'Pipe Locks', slug: 'pipe-locks', description: 'Heavy-duty security locks designed for 80mm gate frame pipes.' },
];

// Installation Video URLs
const smartLockVideo = 'https://www.youtube.com/embed/N-02Wfs2sE4'; // Home Depot Smart Lock Installation Guide
const mortiseLockVideo = 'https://www.youtube.com/embed/kYJv8y6_D64'; // Tradco Mortise Lock Installation Tutorial
const handleLockVideo = 'https://www.youtube.com/embed/gU9G4lY8b-8'; // Door Handle Lock Installation
const deadboltVideo = 'https://www.youtube.com/embed/3qM_xYkQp9M'; // Deadbolt Installation Guide
const padlockVideo = 'https://www.youtube.com/embed/aJkX215_cso'; // Biometric Smart Padlock Setup & Usage Guide

export const products: Product[] = [
    // --- Door Locks (50+ Items) ---
    // 1. Smart Locks
    {
        id: 'dl-002',
        name: 'SecureHome WiFi Lock',
        description: 'Remote access control via WiFi bridge with real-time notifications. Monitor entry logs, grant temporary access, and integrate with smart home systems. Ideal for rental properties and vacation homes.',
        price: 380000, wholesalePrice: 3500000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0072.jpg',
        rating: 4.7, stock: 40, videoUrl: smartLockVideo,
        specifications: { 'Type': 'WiFi Smart Lock', 'Material': 'Aluminum Alloy', 'Color': 'Silver', 'Connectivity': 'WiFi 2.4GHz' },
        usageInstructions: ['Connect WiFi bridge to your router', 'Install lock batteries', 'Download app and create account', 'Add lock to app using QR code', 'Configure WiFi settings in app', 'Set up access codes and schedules']
    },
    {
        id: 'dl-003',
        name: 'Keypad Entry Deadbolt',
        description: 'Simple numeric code access with backlit keypad for night visibility. Supports multiple user codes and one-time guest codes. Battery-powered with low battery indicator.',
        price: 250000, wholesalePrice: 2200000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0073.jpg',
        rating: 4.5, stock: 60, videoUrl: smartLockVideo,
        specifications: { 'Type': 'Keypad Deadbolt', 'Material': 'Steel', 'Color': 'Bronze', 'Codes': 'Up to 20 users' },
        usageInstructions: ['Install batteries', 'Press programming button', 'Enter master code (default: 1234)', 'Change master code immediately', 'Add user codes (4-8 digits)', 'Test each code before use']
    },
    {
        id: 'dl-004',
        name: 'Bluetooth Pro Lock',
        description: 'Unlock with your smartphone via Bluetooth. Auto-lock feature, proximity unlock, and activity logs. Works offline without internet connection required.',
        price: 320000, wholesalePrice: 2900000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0074.jpg',
        rating: 4.6, stock: 45, videoUrl: smartLockVideo,
        specifications: { 'Type': 'Bluetooth', 'Material': 'Zinc Alloy', 'Color': 'Matte Black', 'Range': '10 meters' },
        usageInstructions: ['Enable Bluetooth on smartphone', 'Install lock app', 'Pair lock with phone', 'Set auto-lock timer', 'Configure proximity unlock distance', 'Tap phone to unlock when nearby']
    },
    {
        id: 'dl-005',
        name: 'Hotel Card Lock System',
        description: 'Professional RFID card access system for hotels, offices, and commercial buildings. Includes card encoder and management software. Supports time-limited access and audit trails.',
        price: 280000, wholesalePrice: 2500000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0075.jpg',
        rating: 4.8, stock: 100, videoUrl: smartLockVideo,
        specifications: { 'Type': 'RFID Card Lock', 'Material': 'Stainless Steel', 'Color': 'Silver', 'Cards': 'Mifare 13.56MHz' },
        usageInstructions: ['Install lock and connect to power', 'Set up management software on computer', 'Program master cards', 'Encode guest cards with check-in/out dates', 'Test card access', 'Issue cards to users']
    },
    {
        id: 'dl-006',
        name: 'Face ID Smart Lock',
        description: 'Cutting-edge 3D facial recognition technology with anti-spoofing protection. Recognizes faces in 0.5 seconds even in low light. Premium security for high-end properties.',
        price: 850000, wholesalePrice: 8000000, wholesaleMinQty: 5, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0076.jpg',
        rating: 5.0, stock: 10, videoUrl: smartLockVideo,
        specifications: { 'Type': 'Face Recognition', 'Material': 'Titanium Alloy', 'Color': 'Gold', 'Capacity': '100 faces' },
        usageInstructions: ['Install lock and batteries', 'Initialize system via touchscreen', 'Register admin face (look at camera from multiple angles)', 'Set backup PIN code', 'Add additional authorized faces', 'Configure recognition sensitivity']
    },
    {
        id: 'dl-007',
        name: 'Glass Door Smart Lock',
        description: 'Clamp-on design specifically for frameless glass doors (8-12mm thick). No drilling required. Fingerprint and password access with auto-lock feature.',
        price: 350000, wholesalePrice: 3200000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0077.jpg',
        rating: 4.4, stock: 30, videoUrl: smartLockVideo,
        specifications: { 'Type': 'Glass Door Lock', 'Material': 'ABS+Zinc Alloy', 'Color': 'Black', 'Glass Thickness': '8-12mm' },
        usageInstructions: ['Measure glass thickness', 'Position clamp on glass door', 'Tighten adjustment screws evenly', 'Install batteries', 'Register fingerprints', 'Test clamp security before daily use']
    },
    {
        id: 'dl-008',
        name: 'Slim Profile Smart Lock',
        description: 'Ultra-narrow design (35mm backset) for aluminum frame doors and narrow stile applications. Fingerprint and RFID card access with mechanical key backup.',
        price: 300000, wholesalePrice: 2800000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0078.jpg',
        rating: 4.5, stock: 50, videoUrl: smartLockVideo,
        specifications: { 'Type': 'Slim Smart Lock', 'Material': 'Aluminum', 'Color': 'Silver', 'Backset': '35mm' },
        usageInstructions: ['Measure door frame width', 'Mark installation points', 'Drill holes for slim mortise', 'Insert lock body', 'Mount exterior and interior panels', 'Register access methods']
    },
    {
        id: 'dl-009',
        name: 'Video Doorbell Lock',
        description: 'Integrated HD camera with two-way audio communication. Motion detection alerts, night vision, and cloud storage. See and speak with visitors before unlocking.',
        price: 650000, wholesalePrice: 6000000, wholesaleMinQty: 5, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0079.jpg',
        rating: 4.9, stock: 20, videoUrl: smartLockVideo,
        specifications: { 'Type': 'Video Doorbell Lock', 'Material': 'Zinc Alloy', 'Color': 'Black', 'Camera': '1080p HD' },
        usageInstructions: ['Install lock and connect to WiFi', 'Download video doorbell app', 'Configure motion detection zones', 'Set up cloud storage subscription', 'Test two-way audio', 'Unlock remotely via app when needed']
    },
    {
        id: 'dl-010',
        name: 'Voice Control Lock',
        description: 'Compatible with Alexa, Google Assistant, and Siri. Voice commands for lock status and remote control. Integrates seamlessly with smart home ecosystems.',
        price: 420000, wholesalePrice: 3900000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0080.jpg',
        rating: 4.7, stock: 40, videoUrl: smartLockVideo,
        specifications: { 'Type': 'Voice Control', 'Material': 'Zinc Alloy', 'Color': 'Grey', 'Compatibility': 'Alexa, Google, Siri' },
        usageInstructions: ['Install lock and connect to WiFi', 'Link lock to smart home hub', 'Enable voice assistant skill/action', 'Set up voice PIN for security', 'Test voice commands ("Alexa, lock the front door")', 'Configure automation routines']
    },

    // 2. Mortise Locks
    {
        id: 'dl-013',
        name: 'Modern Black Mortise',
        description: 'Contemporary matte black finish mortise lock for modern architectural designs. Minimalist aesthetic with robust security features. Corrosion-resistant coating.',
        price: 160000, wholesalePrice: 1300000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/Black-Color-Sub-Space-Aluminum-Door-Lock-Indoors-Handle-Locks-Silent-Lockset-Room-Door-Locks.avif',
        rating: 4.7, stock: 200, videoUrl: mortiseLockVideo,
        specifications: { 'Material': 'Steel', 'Finish': 'Matte Black Powder Coat', 'Backset': '60mm', 'Latch': 'Silent' },
        usageInstructions: ['Cut mortise pocket in door', 'Install lock body', 'Attach matte black handles', 'Install cylinder', 'Mount strike plate', 'Test smooth operation', 'Clean with soft cloth only (no abrasives)']
    },
    {
        id: 'dl-014',
        name: 'Gold Plated Mortise',
        description: 'Luxury 24k gold-plated mortise lock for premium entrances and executive offices. Tarnish-resistant finish with superior corrosion protection. Makes a statement of elegance.',
        price: 250000, wholesalePrice: 2200000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0081.jpg',
        rating: 4.9, stock: 50, videoUrl: mortiseLockVideo,
        specifications: { 'Material': 'Brass Core', 'Finish': '24K Gold Plated', 'Backset': '60mm', 'Warranty': '5 years' },
        usageInstructions: ['Polish door surface before installation', 'Install mortise lock body', 'Carefully mount gold-plated components', 'Avoid touching plated surfaces with bare hands', 'Install using provided white gloves', 'Clean with microfiber cloth only', 'Apply protective wax coating quarterly']
    },
    {
        id: 'dl-015',
        name: 'Silent Mortise Lock',
        description: 'Magnetic latch technology for whisper-quiet door closing. Perfect for bedrooms, hospitals, libraries, and noise-sensitive environments. No clicking sound.',
        price: 170000, wholesalePrice: 1400000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/Habiba Door Lock Silent Door lock.jpg',
        rating: 4.6, stock: 150, videoUrl: mortiseLockVideo,
        specifications: { 'Material': 'Zinc Alloy', 'Feature': 'Magnetic Silent Latch', 'Noise Level': '<20dB', 'Backset': '60mm' },
        usageInstructions: ['Install magnetic lock body in mortise', 'Align magnetic strike plate precisely', 'Test magnetic engagement', 'Adjust strike plate position for optimal silence', 'Ensure door closes smoothly', 'Lubricate moving parts annually']
    },
    {
        id: 'dl-016',
        name: 'Narrow Stile Mortise',
        description: 'Compact mortise lock designed for narrow aluminum or steel door frames (35-45mm stile width). Common in commercial glass doors and modern office buildings.',
        price: 140000, wholesalePrice: 1100000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0082.jpg',
        rating: 4.5, stock: 80, videoUrl: mortiseLockVideo,
        specifications: { 'Material': 'Steel', 'Backset': '20-25mm', 'Stile Width': '35-45mm', 'Type': 'Narrow Stile' },
        usageInstructions: ['Measure narrow stile width accurately', 'Use narrow mortise template', 'Cut precise narrow slot', 'Fit compact lock body', 'Install slim cylinder', 'Test clearance with door frame', 'Adjust strike for narrow gap']
    },
    {
        id: 'dl-017',
        name: 'Double Cylinder Mortise',
        description: 'Keyed entry from both interior and exterior sides. Enhanced security for doors with glass panels. Requires key to unlock from inside (keep key nearby for emergency exit).',
        price: 165000, wholesalePrice: 1350000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0083.jpg',
        rating: 4.7, stock: 60, videoUrl: mortiseLockVideo,
        specifications: { 'Material': 'Steel', 'Cylinder': 'Double Keyed', 'Keys Included': '6', 'Security': 'High' },
        usageInstructions: ['Install mortise lock body', 'Insert double cylinder from both sides', 'Secure cylinders with set screws', 'Test key operation from both sides', 'Keep spare key accessible inside for emergencies', 'Label keys for interior/exterior']
    },
    {
        id: 'dl-018',
        name: 'Hook Bolt Mortise',
        description: 'Specialized hook bolt design for sliding doors and gates. Hooks into strike plate for superior resistance against prying. Ideal for security doors.',
        price: 130000, wholesalePrice: 1000000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0084.jpg',
        rating: 4.4, stock: 90, videoUrl: mortiseLockVideo,
        specifications: { 'Material': 'Steel', 'Bolt Type': 'Hook', 'Throw': '25mm', 'Application': 'Sliding Doors' },
        usageInstructions: ['Install lock in sliding door', 'Align hook bolt with strike keeper', 'Test hook engagement', 'Adjust keeper position for tight fit', 'Ensure smooth sliding operation', 'Lubricate hook mechanism']
    },
    {
        id: 'dl-019',
        name: 'Roller Latch Mortise',
        description: 'Spring-loaded roller latch for easy push/pull operation. No handle turning required. Perfect for high-traffic commercial doors and shop entrances.',
        price: 145000, wholesalePrice: 1150000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0085.jpg',
        rating: 4.5, stock: 70, videoUrl: mortiseLockVideo,
        specifications: { 'Material': 'Steel', 'Latch': 'Roller Type', 'Operation': 'Push/Pull', 'Cycles': '500,000+' },
        usageInstructions: ['Install roller latch body', 'Adjust roller tension spring', 'Install strike plate with roller catch', 'Test push/pull operation', 'Adjust spring tension if needed', 'Lubricate roller bearing']
    },
    {
        id: 'dl-020',
        name: 'Fire Rated Mortise',
        description: 'Certified fire-rated mortise lock for 3-hour fire doors. Meets building code requirements. Intumescent seals expand in heat to maintain fire integrity.',
        price: 200000, wholesalePrice: 1800000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0086.jpg',
        rating: 5.0, stock: 100, videoUrl: mortiseLockVideo,
        specifications: { 'Material': 'Steel', 'Fire Rating': '3 Hour', 'Certification': 'UL Listed', 'Intumescent': 'Yes' },
        usageInstructions: ['Verify fire door certification', 'Install according to fire code requirements', 'Use only approved screws and fixings', 'Do not modify lock components', 'Maintain certification documentation', 'Inspect annually for compliance']
    },

    // 3. Handle Locks (Lever/Knob)
    {
        id: 'dl-022',
        name: 'Stainless Steel Lever',
        description: 'Commercial-grade SS304 stainless steel lever. Corrosion-resistant for coastal areas and high-humidity environments. ADA-compliant lever design.',
        price: 80000, wholesalePrice: 700000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/Bedroom Door Lock Aluminium Alloy.jpg',
        rating: 4.5, stock: 300, videoUrl: handleLockVideo,
        specifications: { 'Material': 'SS304 Stainless Steel', 'Finish': 'Satin', 'Grade': 'Commercial', 'ADA': 'Compliant' },
        usageInstructions: ['Install tubular latch in door', 'Mount exterior lever', 'Attach interior lever', 'Secure with through-bolts', 'Test lever operation', 'Adjust spring tension if needed', 'Install strike plate']
    },
    {
        id: 'dl-023',
        name: 'Privacy Bathroom Lock',
        description: 'Privacy function lever with thumbturn for bathrooms and bedrooms. Emergency release hole on exterior for safety. Indicator shows locked/unlocked status.',
        price: 85000, wholesalePrice: 750000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0087.jpg',
        rating: 4.4, stock: 150, videoUrl: handleLockVideo,
        specifications: { 'Material': 'Zinc Alloy', 'Function': 'Privacy', 'Emergency Release': 'Yes', 'Indicator': 'Yes' },
        usageInstructions: ['Install privacy latch', 'Mount handles with thumbturn inside', 'Test thumbturn locking', 'Locate emergency release hole outside', 'Test emergency release with pin/screwdriver', 'Ensure indicator shows lock status']
    },
    {
        id: 'dl-024',
        name: 'Passage Hallway Lever',
        description: 'Non-locking passage lever for hallways, closets, and interior doors. Simple latch function only. Budget-friendly option for non-security applications.',
        price: 70000, wholesalePrice: 600000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0088.jpg',
        rating: 4.3, stock: 200, videoUrl: handleLockVideo,
        specifications: { 'Material': 'Zinc Alloy', 'Function': 'Passage (No Lock)', 'Backset': '60mm', 'Type': 'Latch Only' },
        usageInstructions: ['Install passage latch', 'Snap on handles (no screws needed for some models)', 'Test latch retraction', 'Adjust strike plate alignment', 'Ensure smooth operation']
    },
    {
        id: 'dl-025',
        name: 'Classic Round Knob',
        description: 'Traditional round door knob with timeless design. Suitable for vintage and classic interiors. Solid construction with smooth rotation.',
        price: 50000, wholesalePrice: 400000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/Door Knob door lock.jpg',
        rating: 4.2, stock: 400, videoUrl: handleLockVideo,
        specifications: { 'Material': 'Steel', 'Style': 'Traditional Round', 'Diameter': '60mm', 'Finish': 'Polished' },
        usageInstructions: ['Insert latch into door edge', 'Slide spindle through latch', 'Attach exterior knob', 'Secure interior knob with set screw', 'Test knob rotation', 'Install strike plate']
    },
    {
        id: 'dl-026',
        name: 'Keyed Entry Knob',
        description: 'Security knob with key cylinder for exterior doors. Deadlocking latch prevents credit card entry. Includes 3 keys for main entry security.',
        price: 60000, wholesalePrice: 500000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0089.jpg',
        rating: 4.4, stock: 300, videoUrl: handleLockVideo,
        specifications: { 'Material': 'Brass', 'Function': 'Keyed Entry', 'Latch': 'Deadlocking', 'Keys': '3 included' },
        usageInstructions: ['Install deadlocking latch', 'Insert keyed knob exterior', 'Attach interior knob', 'Test key operation', 'Verify deadlocking feature engages', 'Install reinforced strike plate']
    },
    {
        id: 'dl-027',
        name: 'Square Rosette Lever',
        description: 'Modern square rosette design for contemporary architecture. Angular aesthetic complements modern interiors. Heavy-duty construction for commercial use.',
        price: 110000, wholesalePrice: 900000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0090.jpg',
        rating: 4.7, stock: 100, videoUrl: handleLockVideo,
        specifications: { 'Material': 'Zinc Alloy', 'Shape': 'Square Rosette', 'Style': 'Modern', 'Rosette Size': '55x55mm' },
        usageInstructions: ['Align square rosette horizontally', 'Install latch', 'Mount square rosette handles', 'Tighten concealed fixings', 'Ensure square alignment', 'Test operation']
    },
    {
        id: 'dl-028',
        name: 'Dummy Lever',
        description: 'Fixed decorative lever with no latch mechanism. For closet doors, double doors (inactive leaf), or purely decorative applications. Matches active lever sets.',
        price: 40000, wholesalePrice: 350000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0091.jpg',
        rating: 4.1, stock: 100, videoUrl: handleLockVideo,
        specifications: { 'Material': 'Zinc Alloy', 'Function': 'Dummy (Fixed)', 'Installation': 'Surface Mount', 'Use': 'Decorative' },
        usageInstructions: ['Mark handle position on door', 'Drill pilot holes', 'Screw dummy lever to door surface', 'No latch required', 'Tighten securely']
    },
    {
        id: 'dl-029',
        name: 'Crystal Glass Knob',
        description: 'Elegant crystal glass knob with brass base. Vintage charm for period homes and upscale interiors. Each knob is hand-finished with unique characteristics.',
        price: 150000, wholesalePrice: 1200000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0092.jpg',
        rating: 4.8, stock: 50, videoUrl: handleLockVideo,
        specifications: { 'Material': 'Crystal Glass + Brass', 'Style': 'Vintage Victorian', 'Finish': 'Hand-Cut Crystal', 'Care': 'Delicate' },
        usageInstructions: ['Handle crystal knobs with care', 'Install latch mechanism', 'Carefully attach crystal knobs', 'Do not overtighten (may crack glass)', 'Clean with soft cloth only', 'Avoid impact']
    },
    {
        id: 'dl-030',
        name: 'Black Iron Handle',
        description: 'Rustic wrought iron handle for barn doors, industrial lofts, and farmhouse style. Heavy-duty construction with authentic aged finish.',
        price: 90000, wholesalePrice: 800000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0093.jpg',
        rating: 4.6, stock: 80, videoUrl: handleLockVideo,
        specifications: { 'Material': 'Wrought Iron', 'Finish': 'Black Powder Coat', 'Style': 'Rustic', 'Length': '200mm' },
        usageInstructions: ['Drill through-holes in door', 'Insert handle bolts from exterior', 'Secure with nuts on interior side', 'Tighten firmly', 'Apply rust protection if outdoor use']
    },

    // 4. Padlocks & Misc
    {
        id: 'dl-031',
        name: 'Smart Fingerprint Padlock',
        description: 'Rechargeable biometric padlock with USB charging. Stores up to 10 fingerprints. Perfect for gym lockers, luggage, and outdoor gates. IP65 waterproof rating.',
        price: 85000, wholesalePrice: 750000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0094.jpg',
        rating: 4.7, stock: 200, videoUrl: padlockVideo,
        specifications: { 'Type': 'Biometric Padlock', 'Battery': 'Rechargeable Li-ion', 'Capacity': '10 fingerprints', 'Waterproof': 'IP65' },
        usageInstructions: ['Charge padlock via USB (2 hours)', 'Press button to activate', 'Register admin fingerprint (press 6 times)', 'Add additional fingerprints', 'Place finger on sensor to unlock', 'Recharge when LED blinks red']
    },
    {
        id: 'dl-032',
        name: 'Heavy Duty Steel Padlock',
        description: 'Hardened steel shackle and body for maximum security. Cut-resistant, drill-resistant, and pick-resistant. Ideal for gates, sheds, and storage units.',
        price: 60000, wholesalePrice: 500000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0095.jpg',
        rating: 4.8, stock: 300, videoUrl: padlockVideo,
        specifications: { 'Material': 'Hardened Steel', 'Shackle': 'Long 50mm', 'Security': 'Grade 5', 'Keys': '3 included' },
        usageInstructions: ['Insert shackle through hasp or chain', 'Push shackle into lock body', 'Turn key to lock', 'Remove key', 'Test security by pulling', 'Store spare key safely']
    },
    {
        id: 'dl-033',
        name: 'Combination Padlock',
        description: 'Resettable 4-digit combination lock. No keys to lose. Weather-resistant for outdoor use. Easy code change mechanism.',
        price: 35000, wholesalePrice: 300000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0096.jpg',
        rating: 4.3, stock: 500, videoUrl: padlockVideo,
        specifications: { 'Type': 'Combination', 'Digits': '4-digit', 'Combinations': '10,000', 'Reset': 'User Resettable' },
        usageInstructions: ['Set to default code (0000)', 'Open shackle', 'Rotate shackle 90° and press down', 'Set your new 4-digit code', 'Release shackle to save', 'Scramble dials after locking']
    },
    {
        id: 'dl-034',
        name: 'Weatherproof Padlock',
        description: 'Laminated steel with rubber coating for outdoor protection. Rust-resistant in rain, snow, and salt spray. Perfect for marine and coastal applications.',
        price: 45000, wholesalePrice: 400000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0097.jpg',
        rating: 4.5, stock: 250, videoUrl: padlockVideo,
        specifications: { 'Material': 'Laminated Steel', 'Coating': 'Rubber Weatherproof', 'Use': 'Outdoor', 'Corrosion': 'Resistant' },
        usageInstructions: ['Use in outdoor applications', 'Keep keyhole cover closed when not in use', 'Lubricate with graphite (not oil) annually', 'Wipe dry after rain', 'Store indoors in extreme weather']
    },
    {
        id: 'dl-035',
        name: 'Disc Padlock',
        description: 'Round disc design protects shackle from bolt cutter attacks. High-security for storage units, vans, and shipping containers. Hardened steel construction.',
        price: 55000, wholesalePrice: 480000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0098.jpg',
        rating: 4.6, stock: 150, videoUrl: padlockVideo,
        specifications: { 'Type': 'Disc Lock', 'Material': 'Stainless Steel', 'Shackle': 'Shrouded', 'Security': 'High' },
        usageInstructions: ['Insert shackle through hasp hole', 'Push shackle into disc body', 'Turn key to lock', 'Shackle is protected by disc', 'Cannot be cut with standard bolt cutters']
    },
    {
        id: 'dl-036',
        name: 'TSA Travel Lock',
        description: 'TSA-approved combination lock for luggage. Airport security can open with master key without breaking lock. Compact and lightweight.',
        price: 20000, wholesalePrice: 180000, wholesaleMinQty: 50, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0099.jpg',
        rating: 4.2, stock: 600, videoUrl: padlockVideo,
        specifications: { 'Type': 'TSA Approved', 'Size': 'Compact', 'Code': '3-digit', 'Weight': '30g' },
        usageInstructions: ['Set to default 000', 'Open lock', 'Use pen to press reset button', 'Set your 3-digit code', 'Release button', 'Test code before travel']
    },
    {
        id: 'dl-037',
        name: 'Long Shackle Padlock',
        description: 'Extra-long 100mm shackle for thick gates, chains, and multiple loops. Brass body resists corrosion. Versatile for various applications.',
        price: 50000, wholesalePrice: 450000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0100.jpg',
        rating: 4.4, stock: 200, videoUrl: padlockVideo,
        specifications: { 'Shackle Length': '100mm', 'Material': 'Brass Body', 'Shackle': 'Steel', 'Diameter': '8mm' },
        usageInstructions: ['Loop long shackle through gate/chain', 'Ensure shackle reaches lock body', 'Lock securely', 'Verify shackle is fully inserted']
    },
    {
        id: 'dl-038',
        name: 'Alarm Padlock',
        description: 'Built-in 110dB alarm activates when moved or tampered with. Motion sensor technology. Battery-powered deterrent for high-value items.',
        price: 75000, wholesalePrice: 650000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0101.jpg',
        rating: 4.5, stock: 100, videoUrl: padlockVideo,
        specifications: { 'Feature': '110dB Siren', 'Battery': '6x LR44 Button Cells', 'Sensor': 'Motion Activated', 'Duration': '10 seconds' },
        usageInstructions: ['Install batteries', 'Lock padlock', 'Press alarm button to arm', 'LED blinks when armed', 'Any movement triggers 110dB alarm', 'Unlock to disarm']
    },
    {
        id: 'dl-039',
        name: 'Container Lock',
        description: 'Heavy-duty monoblock lock for shipping containers and cargo trucks. Hardened steel construction resists cutting and prying. Industrial-grade security.',
        price: 250000, wholesalePrice: 2200000, wholesaleMinQty: 5, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0102.jpg',
        rating: 4.9, stock: 50, videoUrl: padlockVideo,
        specifications: { 'Type': 'Container Monoblock', 'Material': 'Hardened Steel', 'Weight': '1.2kg', 'Security': 'Maximum' },
        usageInstructions: ['Fit lock bar through container handles', 'Insert lock body over bar', 'Turn key to engage locking mechanism', 'Remove key', 'Test by pulling firmly']
    },
    {
        id: 'dl-040',
        name: 'Love Lock',
        description: 'Heart-shaped decorative padlock for love lock bridges and romantic gestures. Engravable surface for names and dates. Colorful enamel finish.',
        price: 15000, wholesalePrice: 120000, wholesaleMinQty: 50, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0103.jpg',
        rating: 4.8, stock: 1000, videoUrl: padlockVideo,
        specifications: { 'Shape': 'Heart', 'Color': 'Red/Pink/Gold', 'Material': 'Zinc Alloy', 'Engraving': 'Available' },
        usageInstructions: ['Engrave names/date if desired', 'Write message on lock', 'Attach to bridge railing/fence', 'Lock and throw away key (traditional)', 'Or keep key as memento']
    },

    // 5. Rim Locks & Deadbolts
    {
        id: 'dl-041',
        name: 'Brass Cylinder Rim Lock',
        description: 'Classic night latch for wooden doors. Auto-locking feature when door closes. Snib button for latch hold-back. Traditional brass finish.',
        price: 45000, wholesalePrice: 400000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0104.jpg',
        rating: 4.5, stock: 300, videoUrl: deadboltVideo,
        specifications: { 'Type': 'Night Latch', 'Material': 'Brass', 'Cylinder': 'Rim Type', 'Latch': 'Auto-locking' },
        usageInstructions: ['Mount lock body on interior door surface', 'Drill hole for cylinder', 'Install cylinder from exterior', 'Attach strike plate to frame', 'Test auto-locking feature', 'Use snib to hold latch open']
    },
    {
        id: 'dl-042',
        name: 'Single Cylinder Deadbolt',
        description: 'Key exterior, thumbturn interior deadbolt. 1-inch throw bolt for enhanced security. Hardened steel bolt resists sawing. Standard residential security upgrade.',
        price: 55000, wholesalePrice: 480000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0105.jpg',
        rating: 4.6, stock: 250, videoUrl: deadboltVideo,
        specifications: { 'Type': 'Single Cylinder Deadbolt', 'Throw': '25mm (1 inch)', 'Bolt': 'Hardened Steel', 'Backset': '60mm' },
        usageInstructions: ['Drill 54mm hole through door', 'Drill 25mm hole in door edge', 'Insert deadbolt assembly', 'Install exterior cylinder', 'Attach interior thumbturn', 'Install reinforced strike plate', 'Test key and thumbturn operation']
    },
    {
        id: 'dl-043',
        name: 'Double Cylinder Deadbolt',
        description: 'Keyed on both sides for doors with glass panels. Prevents intruders from breaking glass and reaching thumbturn. Keep key accessible for emergency exit.',
        price: 60000, wholesalePrice: 520000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0106.jpg',
        rating: 4.5, stock: 200, videoUrl: deadboltVideo,
        specifications: { 'Type': 'Double Cylinder', 'Cylinders': 'Both Sides Keyed', 'Security': 'High', 'Keys': '5 included' },
        usageInstructions: ['Install deadbolt body', 'Insert cylinders from both sides', 'Secure with connecting screws', 'Test both keys', 'Keep interior key near door for emergency', 'Install strike plate']
    },
    {
        id: 'dl-044',
        name: 'Jimmi-Proof Deadlock',
        description: 'Surface-mounted interlocking deadlock. Vertical bolt design prevents jimmying. No mortising required - easy installation. Popular in urban areas.',
        price: 70000, wholesalePrice: 600000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0107.jpg',
        rating: 4.7, stock: 100, videoUrl: deadboltVideo,
        specifications: { 'Type': 'Surface Mount Deadlock', 'Bolt': 'Vertical Interlocking', 'Installation': 'No Mortise', 'Security': 'High' },
        usageInstructions: ['Mount lock body on door surface', 'Install cylinder through door', 'Attach strike on door frame', 'Align interlocking components', 'Test vertical bolt engagement', 'Secure all mounting screws']
    },
    {
        id: 'dl-045',
        name: 'Keyless Mechanical Deadbolt',
        description: 'Push-button mechanical code lock - no batteries required. Weatherproof for exterior use. Programmable code with up to 12 digits. Never locked out.',
        price: 120000, wholesalePrice: 1000000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0108.jpg',
        rating: 4.4, stock: 80, videoUrl: deadboltVideo,
        specifications: { 'Type': 'Mechanical Keyless', 'Power': 'None Required', 'Code Length': '4-12 digits', 'Weather': 'All-weather' },
        usageInstructions: ['Install deadbolt mechanism', 'Set master code using programming key', 'Remove programming key', 'Enter code and turn knob to unlock', 'Close door to auto-lock', 'Change code periodically']
    },
    {
        id: 'dl-046',
        name: 'Gate Rim Lock',
        description: 'Heavy-duty rim lock for wooden or metal gates. Surface-mounted for easy installation. Weather-resistant finish for outdoor use.',
        price: 35000, wholesalePrice: 300000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0109.jpg',
        rating: 4.3, stock: 150, videoUrl: deadboltVideo,
        specifications: { 'Type': 'Gate Lock', 'Material': 'Steel', 'Mounting': 'Surface', 'Use': 'Outdoor Gates' },
        usageInstructions: ['Position lock on gate', 'Mark screw holes', 'Drill pilot holes', 'Screw lock to gate', 'Install strike on gate post', 'Test alignment', 'Apply rust protection']
    },
    {
        id: 'dl-047',
        name: 'Euro Cylinder Lock',
        description: 'Replacement euro profile cylinder for UPVC and aluminum doors. Standard 70mm length. Anti-snap, anti-drill, anti-pick features. Easy DIY replacement.',
        price: 25000, wholesalePrice: 200000, wholesaleMinQty: 50, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0110.jpg',
        rating: 4.5, stock: 500, videoUrl: deadboltVideo,
        specifications: { 'Type': 'Euro Profile Cylinder', 'Length': '70mm (35/35)', 'Security': 'Anti-snap', 'Keys': '3 included' },
        usageInstructions: ['Remove screw from door edge', 'Turn key and pull out old cylinder', 'Insert new cylinder with key', 'Ensure cam is vertical', 'Replace securing screw', 'Test key operation']
    },
    {
        id: 'dl-048',
        name: 'Thumbturn Euro Cylinder',
        description: 'Euro cylinder with thumbturn on interior side. No key needed from inside. Convenient for bedrooms and bathrooms. Standard euro profile.',
        price: 30000, wholesalePrice: 250000, wholesaleMinQty: 50, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/Chineese Door lock Indoor Bedroom.jpg',
        rating: 4.6, stock: 400, videoUrl: deadboltVideo,
        specifications: { 'Type': 'Thumbturn Cylinder', 'Profile': 'Euro', 'Length': '70mm', 'Interior': 'Thumbturn' },
        usageInstructions: ['Remove old cylinder', 'Insert thumbturn cylinder', 'Key side faces exterior', 'Thumbturn faces interior', 'Secure with screw', 'Test thumbturn operation']
    },
    {
        id: 'dl-049',
        name: 'Bathroom Indicator Bolt',
        description: 'Privacy bolt with Vacant/Engaged indicator. Emergency release from outside. Chrome finish for bathroom and toilet doors.',
        price: 20000, wholesalePrice: 150000, wholesaleMinQty: 50, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/European Styple Interior Door.webp',
        rating: 4.2, stock: 300, videoUrl: deadboltVideo,
        specifications: { 'Type': 'Indicator Bolt', 'Indicator': 'Vacant/Engaged', 'Finish': 'Chrome', 'Release': 'Emergency' },
        usageInstructions: ['Drill hole through door', 'Insert bolt mechanism', 'Attach indicator on exterior', 'Attach turn knob on interior', 'Test indicator rotation', 'Verify emergency release works']
    },
    {
        id: 'dl-050',
        name: 'Sliding Patio Lock',
        description: 'Foot-operated bolt for sliding patio doors. Hands-free operation. Prevents door from being lifted off track. Floor-mounted security.',
        price: 25000, wholesalePrice: 200000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/Zinc Alloy Door Handle Lock set, European Indoor.jpg',
        rating: 4.4, stock: 200, videoUrl: deadboltVideo,
        specifications: { 'Type': 'Foot Bolt', 'Material': 'Steel', 'Operation': 'Foot Press', 'Mounting': 'Floor' },
        usageInstructions: ['Position bolt on floor near door', 'Mark screw holes', 'Drill and install anchors', 'Screw bolt to floor', 'Test foot operation', 'Ensure bolt enters floor socket']
    },
    {
        id: 'dl-051',
        name: 'Chain Door Guard',
        description: 'Security chain allows partial door opening to verify visitors. Solid brass construction. Simple installation with screws. Essential security accessory.',
        price: 15000, wholesalePrice: 120000, wholesaleMinQty: 50, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0072.jpg',
        rating: 4.3, stock: 500, videoUrl: deadboltVideo,
        specifications: { 'Type': 'Security Chain', 'Material': 'Brass', 'Chain Length': '150mm', 'Finish': 'Polished Brass' },
        usageInstructions: ['Install chain slide on door frame', 'Install chain anchor on door', 'Test chain engagement', 'Ensure door opens 75-100mm when chained', 'Verify chain is strong']
    },
    {
        id: 'dl-052',
        name: 'Door Viewer Peephole',
        description: 'Wide-angle 200-degree door viewer. See visitors without opening door. Fits standard door thickness. Privacy and security essential.',
        price: 10000, wholesalePrice: 80000, wholesaleMinQty: 100, currency: 'UGX', category: 'door-locks',
        image: '/Images/Door Locks/IMG-20251122-WA0073.jpg',
        rating: 4.7, stock: 1000, videoUrl: deadboltVideo,
        specifications: { 'Viewing Angle': '200 Degrees', 'Door Thickness': '35-55mm', 'Lens': 'Glass', 'Finish': 'Gold/Chrome' },
        usageInstructions: ['Mark viewer position at eye level (1.5m)', 'Drill 12mm hole through door', 'Insert viewer from exterior', 'Screw in eyepiece from interior', 'Test viewing angle', 'Ensure clear view']
    },
    {
        id: 'dl-060',
        name: 'Electric Smart Handle (Front & Back)',
        description: 'Dual-sided smart door handle featuring secure biometric fingerprint sensor and backup mechanical key entry. Price is UGX 500,000 for the front and back side complete set.',
        price: 500000, wholesalePrice: 4500000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Locks/Electric handles/UGX 500,000 front side.jpeg',
        rating: 4.8, stock: 35, videoUrl: smartLockVideo,
        specifications: { 'Type': 'Biometric Smart Handle', 'Material': 'Zinc Alloy', 'Finish': 'Matte Black', 'Price': 'UGX 500,000 complete' },
        usageInstructions: ['Mount the front-facing smart handle', 'Install the matching back-side handle set', 'Insert batteries and register fingerprints', 'Configure security settings via the panel']
    },
    {
        id: 'dl-061',
        name: 'Premium Biometric Handle Lock',
        description: 'High-end premium electric handle lock featuring fingerprint access, digital PIN keypad, and card reader. Crafted for modern security.',
        price: 700000, wholesalePrice: 6500000, wholesaleMinQty: 10, currency: 'UGX', category: 'door-locks',
        image: '/Locks/Electric handles/this is UGX 700,000 .jpeg',
        rating: 4.9, stock: 25, videoUrl: smartLockVideo,
        specifications: { 'Type': 'Premium Electric Lock', 'Material': 'Tempered Glass & Alloy', 'Access': 'Fingerprint, PIN, Card', 'Price': 'UGX 700,000' },
        usageInstructions: ['Connect internal wire harness', 'Secure lock template on door', 'Program admin card and codes', 'Register user fingerprints']
    },
    {
        id: 'dl-062',
        name: 'Classic 80mm Door Pipe Lock',
        description: 'Heavy-duty pipe lock designed to fit 80mm gate frames and door pipes. Robust and durable construction for high perimeter security.',
        price: 35000, wholesalePrice: 300000, wholesaleMinQty: 10, currency: 'UGX', category: 'pipe-locks',
        image: '/Locks/Enter a door pipe of 80mm each at UGX 35000/1.jpeg',
        rating: 4.5, stock: 150, videoUrl: padlockVideo,
        specifications: { 'Type': 'Gate Pipe Lock', 'Pipe Width': '80mm', 'Material': 'Tempered Steel', 'Price': 'UGX 35,000 each' },
        usageInstructions: ['Slide lock body inside the 80mm pipe frame slot', 'Align keyhole access points', 'Secure with retention screws', 'Test smooth cylinder locking']
    },
    {
        id: 'dl-063',
        name: 'Innerlee 80mm Pipe Lock',
        description: 'Precision-crafted Innerlee security lock designed to fit 80mm door pipe frames. Reliable latch mechanism with brass core keys.',
        price: 35000, wholesalePrice: 300000, wholesaleMinQty: 10, currency: 'UGX', category: 'pipe-locks',
        image: '/Locks/Enter a door pipe of 80mm each at UGX 35000/Innerlee Locks enter 80mm pipe/1.jpeg',
        rating: 4.6, stock: 120, videoUrl: padlockVideo,
        specifications: { 'Brand': 'Innerlee', 'Type': '80mm Pipe Lock', 'Key Type': 'Brass Core', 'Price': 'UGX 35,000' },
        usageInstructions: ['Align Innerlee lock with frame guide', 'Secure cylinder core in position', 'Insert keys and test lock rotation']
    },
    {
        id: 'dl-064',
        name: 'Compact 80mm Pipe Lock',
        description: 'Shorter profile security pipe lock built to fit 80mm door profiles. Designed for tight installations requiring heavy duty security.',
        price: 35000, wholesalePrice: 300000, wholesaleMinQty: 10, currency: 'UGX', category: 'pipe-locks',
        image: '/Locks/Enter a door pipe of 80mm each at UGX 35000/shorter but enter 80mm pipe/1.jpeg',
        rating: 4.4, stock: 140, videoUrl: padlockVideo,
        specifications: { 'Type': 'Shorter Pipe Lock', 'Width': '80mm profile', 'Material': 'Iron Latch', 'Price': 'UGX 35,000' },
        usageInstructions: ['Measure frame cavity depth', 'Insert compact lock housing', 'Screw lockplate tight', 'Test cylinder operation']
    },
    {
        id: 'dl-065',
        name: 'Bespoke Half Handle Lockset',
        description: 'Modern minimalist half-handle lever set. Complete lockset is UGX 65,000. Purchase a handle pair separately for UGX 30,000.',
        price: 65000, wholesalePrice: 600000, wholesaleMinQty: 20, currency: 'UGX', category: 'door-locks',
        image: '/Locks/Half handles/pair is UGX 30,000 and complete lock is UGX 65000.jpeg',
        rating: 4.7, stock: 200, videoUrl: handleLockVideo,
        specifications: { 'Type': 'Half Handle Set', 'Pair Price': 'UGX 30,000', 'Complete Price': 'UGX 65,000', 'Material': 'Satin Steel' },
        usageInstructions: ['Install tubular latch inside door frame', 'Mount half-handle lever sets on spindle', 'Affix lock cylinders and test']
    }
];
