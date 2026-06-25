# ShopSphere – MERN Stack E-Commerce Application

A full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This project simulates a real-world online store for electronic accessories such as headphones, chargers, power banks, cables, and other tech products.

The application provides a complete e-commerce workflow including user authentication, product browsing, cart management, order placement, and an admin dashboard for managing products and customer orders.

---

# Project Goals

The main objective of this project is to strengthen full-stack development skills by implementing a scalable MERN architecture and understanding how modern e-commerce systems are structured.

This project focuses on:

* RESTful API development
* Authentication and authorization
* MongoDB schema design
* State management and API integration
* Backend architecture and route organization
* Building a scalable and future-proof application structure

---

# Features

## User Features

### Authentication & Authorization

* User registration and login system
* JWT-based authentication
* Secure password hashing using bcryptjs
* Persistent user sessions
* Protected routes for authenticated users

### Product Browsing

* View all electronic accessory products
* View detailed product information
* Product categories such as:

  * Headphones
  * Chargers
  * Power Banks
  * USB Cables
  * Adapters

### Shopping Cart

* Add products to cart
* Remove products from cart
* Update product quantities
* Dynamic cart total calculation

### Order Management

* Place orders from cart
* View personal order history
* Track basic order status

---

## Admin Features

### Product Management

* Add new products
* Update existing product information
* Delete products
* Manage product stock

### Order Management

* View all customer orders
* Access order details
* Monitor placed orders

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Context API / Local State Management
* CSS / Tailwind CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose ODM

## Authentication & Security

* JSON Web Tokens (JWT)
* bcryptjs
* Protected API routes

## Development Tools

* Nodemon
* Postman
* Git & GitHub

---

# System Architecture

The application follows a standard MERN stack architecture:

```text id="1h1y4d"
Frontend (React)
       │
       ▼
REST API (Express.js / Node.js)
       │
       ▼
MongoDB Database
```

The frontend communicates with the backend using REST APIs, while MongoDB stores user, product, and order data.

---

# Database Design

The application currently uses three main collections:

## Users

Stores authentication and authorization data:

* Name
* Email
* Password
* Admin role

## Products

Stores electronic accessory product data:

* Product name
* Description
* Price
* Category
* Stock quantity
* Product image

## Orders

Stores customer purchase information:

* User reference
* Ordered items
* Total amount
* Order status

The database structure is intentionally designed to support future scalability.

---

# Future Enhancements

The project architecture is designed to allow future improvements without major refactoring.

Planned future features include:

* Product reviews and ratings
* Payment gateway integration (Stripe / PayPal)
* Shipping address management
* Order tracking system
* Search and filtering
* Wishlist functionality
* AI-based product recommendations
* Sales analytics dashboard

---

# Folder Structure

```bash id="u8j3f0"
electronic-accessories-store/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.js
│
└── README.md
```

---

# Installation & Setup

## 1. Clone the Repository

```bash id="26g39v"
git clone <repository-url>
```

---

## 2. Install Dependencies

### Backend

```bash id="wt3l4f"
cd backend
npm install
```

### Frontend

```bash id="r13y0m"
cd frontend
npm install
```

---

# Environment Variables

Create a `.env` file inside the backend directory and add the following variables:

```env id="b2k0pf"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

# Running the Application

## Start Backend Server

```bash id="z6odgt"
npm run dev
```

## Start Frontend Application

```bash id="i2v9z8"
npm start
```

---

# API Testing

The backend APIs can be tested using:

* Postman
* Thunder Client
* Insomnia

Core API modules include:

* Authentication APIs
* Product APIs
* Order APIs
* Admin APIs

---

# Learning Outcomes

Through this project, the following concepts were practiced and improved:

* Building RESTful APIs
* JWT authentication flow
* Password encryption
* MongoDB relationships and schema planning
* Full-stack application architecture
* API integration with React
* Role-based authorization
* Scalable project structure

---

# Deployment

The project can be deployed using:

* Frontend: Vercel / Netlify
* Backend: Render / Railway
* Database: MongoDB Atlas

---

# Author

Ahmad Ilyas
MERN Stack Developer

GitHub: https://github.com/ahmad-1725/ShopSphere


<img width="1909" height="880" alt="Screenshot 2026-06-25 115626" src="https://github.com/user-attachments/assets/471e8a64-55f1-4d7f-a0ec-dbe2beaafb18" />
<img width="3316" height="3686" alt="localhost_5173_home" src="https://github.com/user-attachments/assets/8a61d8d3-090b-4c2c-bd11-8cec9d9a088a" />
<img width="1768" height="860" alt="Screenshot 2026-06-25 123123" src="https://github.com/user-attachments/assets/17acedb6-5408-47d1-9337-9deb33861582" />
<img width="3316" height="3306" alt="localhost_5173_product_6a3b6f90869aa27c4d3e3e33" src="https://github.com/user-attachments/assets/d90c7f1b-adca-410f-a2b3-55994aa8075a" />
<img width="3316" height="2004" alt="localhost_5173" src="https://github.com/user-attachments/assets/8d3cc521-c0fc-4f01-b42b-c9c3f51508cf" />
<img width="1886" height="881" alt="Screenshot 2026-06-25 121356" src="https://github.com/user-attachments/assets/fa622ca5-8600-4c54-a3f6-d74d401efb14" />
<img width="1905" height="884" alt="Screenshot 2026-06-25 121415" src="https://github.com/user-attachments/assets/9f66deba-7ccc-40fc-b39a-af27200cde2f" />
<img width="1914" height="883" alt="Screenshot 2026-06-25 121514" src="https://github.com/user-attachments/assets/45f2ce80-bdf5-4c14-a7d5-a156464367af" />

