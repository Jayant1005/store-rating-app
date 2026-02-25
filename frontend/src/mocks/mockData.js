export const mockUsers = [
    {
        id: 1,
        name: "System Admin",
        email: "admin@vibeaestim.com",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
    },
    {
        id: 2,
        name: "Jane Owner",
        email: "jane@storeowner.com",
        role: "owner",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    },
    {
        id: 3,
        name: "Mark Owner",
        email: "mark@storeowner.com",
        role: "owner",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    },
    {
        id: 4,
        name: "Alice Reviewer",
        email: "alice@test.com",
        role: "normal",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    },
    {
        id: 5,
        name: "Bob Shopper",
        email: "bob@test.com",
        role: "normal",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    },
];

export const mockStores = [
    {
        id: 1,
        owner_id: 2,
        name: "Neon Tech Haven",
        description: "Premium gaming gear and cyberpunk accessories.",
        address: "101 Neon Boulevard, Cyber City",
        rating: 4.8,
        banner_image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600",
        status: "approved"
    },
    {
        id: 2,
        owner_id: 2,
        name: "Midnight Brews",
        description: "24/7 dark aesthetic coffee shop for night owls.",
        address: "42 Midnight Street, West End",
        rating: 4.5,
        banner_image_url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1600",
        status: "approved"
    },
    {
        id: 3,
        owner_id: 3,
        name: "Synthwave Apparel",
        description: "Retrowave fashion clothing and neon graphic tees.",
        address: "88 Retro Avenue, Downtown",
        rating: 4.2,
        banner_image_url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1600",
        status: "approved"
    },
    {
        id: 4,
        owner_id: 3,
        name: "Cyber Sneakers",
        description: "Future-forward footwear and limited edition drops.",
        address: "55 Hype Plaza, Neo Tokyo",
        rating: 4.9,
        banner_image_url: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?auto=format&fit=crop&q=80&w=1600",
        status: "pending"
    },
    {
        id: 5,
        owner_id: 2,
        name: "Void Books",
        description: "Sci-fi and fantasy books in a dimly lit, atmospheric setting.",
        address: "13 Shadow Lane, The District",
        rating: 4.0,
        banner_image_url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1600",
        status: "approved"
    }
];

export const mockProducts = [
    // Store 1: Neon Tech Haven
    { id: 101, store_id: 1, name: "RGB Mechanical Keyboard", description: "Tactile switches with customizable neon lighting.", price: 12500, image_url: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800" },
    { id: 102, store_id: 1, name: "Ultrawide Curved Monitor", description: "34-inch 144Hz monitor for immersive gaming.", price: 45000, image_url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800" },
    { id: 103, store_id: 1, name: "Wireless Precision Mouse", description: "Zero-latency wireless gaming mouse.", price: 6000, image_url: "https://images.unsplash.com/photo-1527814050087-3793815479fa?auto=format&fit=crop&q=80&w=800" },
    // Store 2: Midnight Brews
    { id: 201, store_id: 2, name: "Abyss Dark Roast", description: "Our signature heavily roasted coffee beans.", price: 1200, image_url: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800" },
    { id: 202, store_id: 2, name: "Obsidian Espresso Machine", description: "Matte black professional grade espresso maker.", price: 35000, image_url: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800" },
    { id: 203, store_id: 2, name: "Neon Mug", description: "Temperature-sensitive color-changing mug.", price: 800, image_url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800" },
    // Store 3: Synthwave Apparel
    { id: 301, store_id: 3, name: "Outrun Bomber Jacket", description: "Reversible jacket with neon grid patterns.", price: 4500, image_url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800" },
    { id: 302, store_id: 3, name: "Glitch Tee", description: "Cotton t-shirt with a vintage glitch art print.", price: 1500, image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" },
    { id: 303, store_id: 3, name: "Cyber Visor", description: "LED light-up party glasses.", price: 900, image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800" }, // reusing visual but conceptually visor
    // Store 4: Cyber Sneakers
    { id: 401, store_id: 4, name: "Quantum High-Tops", description: "Self-lacing high-top sneakers with glowing soles.", price: 18000, image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800" },
    { id: 402, store_id: 4, name: "Stealth Runners", description: "Lightweight all-black running shoes.", price: 8500, image_url: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800" },
    { id: 403, store_id: 4, name: "Neon Laces", description: "Glow in the dark replacement shoelaces.", price: 500, image_url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800" },
    // Store 5: Void Books
    { id: 501, store_id: 5, name: "Neuromancer (Hardcover)", description: "Special anniversary edition of the cyberpunk classic.", price: 2200, image_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" },
    { id: 502, store_id: 5, name: "The Sprawl Trilogy Boxset", description: "Complete collection of Gibson's foundational works.", price: 5500, image_url: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800" },
    { id: 503, store_id: 5, name: "E-Reader Prism", description: "High contrast e-ink reader for night reading.", price: 12000, image_url: "https://images.unsplash.com/photo-1588691884344-966952d75f3a?auto=format&fit=crop&q=80&w=800" }
];

export const mockReviews = [
    { id: 1, user_id: 4, store_id: 1, rating: 5, text: "Absolutely incredible mechanical keyboards. 10/10.", created_at: "2026-02-21T10:00:00Z" },
    { id: 2, user_id: 5, store_id: 1, rating: 4, text: "Great gear but a bit pricey.", created_at: "2026-02-22T14:30:00Z" },
    { id: 3, user_id: 4, store_id: 2, rating: 5, text: "The Abyss dark roast keeps me awake for 48 hours. Perfect.", created_at: "2026-02-19T02:15:00Z" },
    { id: 4, user_id: 5, store_id: 3, rating: 4, text: "Love the Bomber jacket! Fits well.", created_at: "2026-02-10T11:45:00Z" },
    { id: 5, user_id: 4, store_id: 4, rating: 5, text: "The self-lacing shoes actually work!!", created_at: "2026-02-24T09:20:00Z" },
    { id: 6, user_id: 1, store_id: 5, rating: 4, text: "Good selection of sci-fi, but needs more Isaac Asimov.", created_at: "2026-02-25T16:00:00Z" }
];
