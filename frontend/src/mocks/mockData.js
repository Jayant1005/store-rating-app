export const users = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@system.com",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 2,
        name: "John StoreOwner",
        email: "owner@store.com",
        role: "owner",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 3,
        name: "Alice Shopper",
        email: "alice@user.com",
        role: "normal",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 4,
        name: "Bob Reviewer",
        email: "bob@user.com",
        role: "normal",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    }
];

export const stores = [
    {
        id: 1,
        ownerId: 2,
        name: "Lumina Cafe",
        address: "123 Starlight Avenue, Downtown",
        rating: 4.5,
        totalReviews: 24,
        status: "approved",
        banner_image_url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1600"
    },
    {
        id: 2,
        ownerId: 2, // John owns two stores
        name: "Urban Threads",
        address: "45 Fashion Blvd, Westside",
        rating: 4.8,
        totalReviews: 156,
        status: "approved",
        banner_image_url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1600"
    },
    {
        id: 3,
        ownerId: 5, // Non-existent owner for mock purposes or add more users
        name: "Tech Haven",
        address: "789 Silicon Way, Tech District",
        rating: 4.2,
        totalReviews: 89,
        status: "pending", // Example of pending approval store
        banner_image_url: "https://images.unsplash.com/photo-1531297172864-79daaf9e450b?auto=format&fit=crop&q=80&w=1600"
    }
];

export const products = [
    // Lumina Cafe Products
    {
        id: 101,
        storeId: 1,
        name: "Artisan Espresso",
        description: "Rich and bold double shot espresso made from our house blend.",
        price: 150,
        image_url: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 102,
        storeId: 1,
        name: "Avocado Toast",
        description: "Sourdough toast topped with smashed avocado, cherry tomatoes, and microgreens.",
        price: 350,
        image_url: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&q=80&w=800"
    },
    // Urban Threads Products
    {
        id: 201,
        storeId: 2,
        name: "Vintage Denim Jacket",
        description: "Classic blue denim jacket with distressed details.",
        price: 2500,
        image_url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 202,
        storeId: 2,
        name: "Cotton Graphic Tee",
        description: "100% organic cotton t-shirt with custom print.",
        price: 800,
        image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800"
    },
    // Tech Haven Products
    {
        id: 301,
        storeId: 3,
        name: "Wireless ANC Headphones",
        description: "Active noise-cancelling over-ear bluetooth headphones.",
        price: 15000,
        image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800"
    }
];

export const reviews = [
    {
        id: 1,
        storeId: 1, // Reviews for Lumina Cafe
        userId: 3, // Alice
        rating: 5,
        comment: "Best coffee in town! The barista really knows their stuff and the ambiance is perfect for studying.",
        createdAt: "2026-02-15T09:30:00Z"
    },
    {
        id: 2,
        storeId: 1,
        userId: 4, // Bob
        rating: 4,
        comment: "Great food, but it gets a bit too crowded during weekends.",
        createdAt: "2026-02-18T14:15:00Z"
    },
    {
        id: 3,
        storeId: 2, // Reviews for Urban Threads
        userId: 3,
        rating: 5,
        comment: "Love the quality of their jackets. Will definitely shop here again!",
        createdAt: "2026-01-20T11:45:00Z"
    }
];
