-- Create the 'users' table
-- Stores user information and their assigned role.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    role VARCHAR(50) NOT NULL DEFAULT 'Normal User',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'stores' table
-- Stores information about each store and links to an optional owner.
CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL, -- If owner's account is deleted, ownership is nullified.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'ratings' table
-- Stores the ratings given by users to stores.
-- A user can only rate a specific store once.
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- If a user is deleted, their ratings are also deleted.
    store_id INTEGER NOT NULL REFERENCES stores(id) ON DELETE CASCADE, -- If a store is deleted, its ratings are also deleted.
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, store_id) -- Ensures a user can't rate the same store twice.
);

-- Create the 'products' table
-- Stores product information, including price, linked to a specific store.
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    store_id INTEGER NOT NULL REFERENCES stores(id) ON DELETE CASCADE, -- If a store is deleted, its products are also deleted.
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL, -- Suitable for storing prices in Rupees.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
