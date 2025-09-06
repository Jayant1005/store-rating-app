# Store Rating & Product Management System

A full-stack web application that allows users to rate stores and manage products. The system is built with role-based access control, providing distinct dashboards and functionalities for Normal Users, Store Owners, and System Administrators.

---

## Table of Contents

*   [Key Features](#key-features)
*   [Technology Stack](#technology-stack)
*   [User Roles & Permissions](#user-roles--permissions)
*   [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Database Setup](#database-setup)
    *   [Running the Application](#running-the-application)
*   [API Endpoints](#api-endpoints)

---

## Key Features

*   **Role-Based Access Control:** Three distinct user roles (Normal User, Store Owner, System Administrator) with tailored dashboards and permissions.
*   **User Authentication:** Secure user registration and login system using JWT (JSON Web Tokens) and password hashing with bcrypt.
*   **Store Ratings:** Normal users can view a list of all stores and submit a star rating (1-5) for each.
*   **Admin Dashboard:** System administrators have a comprehensive dashboard to:
    *   View application statistics (total users, stores, ratings).
    *   Add new users and assign roles.
    *   Add new stores and assign owners.
    *   View and filter lists of all users and stores.
*   **Store Owner Dashboard:** Store owners have a dedicated dashboard to:
    *   View their store's average rating.
    *   See a list of users who have rated their store.
    *   Manage products, including adding new products with prices in Rupees (₹).

---

## Technology Stack

*   **Frontend:** React.js, Material-UI (MUI) for styling, Axios for API requests.
*   **Backend:** Node.js, Express.js for the server framework.
*   **Database:** PostgreSQL.
*   **Authentication:** JSON Web Tokens (JWT), bcrypt.js for password hashing.

---

## User Roles & Permissions

1.  **Normal User**
    *   Can sign up and log in.
    *   Can view a list of all registered stores.
    *   Can submit or update a 1-5 star rating for any store.

2.  **Store Owner**
    *   Has all permissions of a Normal User.
    *   Can view a dedicated dashboard for their assigned store.
    *   Can see the store's average rating and who has rated it.
    *   Can add new products with prices to their store.

3.  **System Administrator**
    *   Has all permissions of a Normal User.
    *   Can access an admin dashboard with application-wide statistics.
    *   Can create new users and assign any of the three roles.
    *   Can create new stores and assign a Store Owner to them.
    *   Can view and filter lists of all users and stores in the system.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v14.x or later)
*   npm (v6.x or later)
*   PostgreSQL

### Installation

1.  **Clone the repository:**
    ```
    git clone https://github.com/Jayant1005/store-rating-app.git
    cd store-rating-app
    ```

2.  **Install backend dependencies:**
    ```
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```
    cd ../frontend
    npm install
    ```

### Database Setup

1.  **Create a PostgreSQL database:**
    *   Open `psql` and create a new database.
        ```
        CREATE DATABASE store_ratings_db;
        ```
    *   Connect to your new database:
        ```
        \c store_ratings_db
        ```

2.  **Create the necessary tables:**
    *   Run the SQL commands from the `database.sql` file (or copy-paste them from the project documentation) to create the `users`, `stores`, `ratings`, and `products` tables.

3.  **Configure environment variables:**
    *   In the `backend` directory, create a file named `.env`.
    *   Add the following configuration, replacing the placeholder values with your actual database credentials:
        ```
        DB_USER=your_postgres_username
        DB_HOST=localhost
        DB_DATABASE=store_ratings_db
        DB_PASSWORD=your_postgres_password
        DB_PORT=5432
        JWT_SECRET=your_jwt_secret_key
        ```

### Running the Application

1.  **Start the backend server:**
    *   Navigate to the `backend` directory and run:
        ```
        node server.js
        ```
    *   The server will start on `http://localhost:5001`.

2.  **Start the frontend development server:**
    *   In a **new terminal window**, navigate to the `frontend` directory and run:
        ```
        npm start
        ```
    *   The application will open automatically in your browser at `http://localhost:3000`.

---

## API Endpoints

A summary of the available API endpoints can be found in the route files within the `backend/routes` directory. All protected routes require a valid JWT in the `x-auth-token` header.

