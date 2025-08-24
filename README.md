# 🛍️ Urban E-commerce

A **full-stack e-commerce web application** built with **React + Vite (frontend)** and **Node.js + Express + MongoDB (backend)**.  
It supports product browsing, filtering, cart, checkout with PayPal, authentication, and an admin dashboard.

🔗 **Live Demo:** [urban-ecommerce-nw3f.vercel.app](https://urban-ecommerce-nw3f.vercel.app/)

---

## 🚀 Features

### 🔐 Authentication & Authorization
JWT-based login, registration, profile management, role-based access for admin.

<div align="center">
  <img src="https://github.com/user-attachments/assets/5ee9a459-d753-41ea-ac76-78ab7f0362bf" width="32%" />
  <img src="https://github.com/user-attachments/assets/ba727fbe-ac2e-4b5d-b462-f38bded3daac" width="32%" />
</div>

---

### 🛒 Shopping Cart
Add/update/remove items, cart persistence, guest → logged-in cart merge.

<div align="center">
  <img src="https://github.com/user-attachments/assets/86ae75f4-0e98-4ecf-b42b-32f999fbefec" width="32%" />
</div>

---

### 📦 Product Management
Browse, search, filter, and sort products; admin can create/update/delete.

<div align="center">
  <img src="https://github.com/user-attachments/assets/f7430379-3c18-4798-9bce-8f2d3f934089" width="32%" />
  <img src="https://github.com/user-attachments/assets/2e8d6b33-c560-4dc2-a1db-2fab0dcc6fc9" width="32%" />
  <img src="https://github.com/user-attachments/assets/cda48158-0015-4153-b701-1fb7e43a6a49" width="32%" />
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/a1ea96b4-0649-470e-bdd6-c05f9368d41a" width="32%" />
  <img src="https://github.com/user-attachments/assets/cc3f8f7f-6754-431b-af4c-fc3f1ba196c9" width="32%" />
  <img src="https://github.com/user-attachments/assets/9ba08f79-fef1-4c5f-aac8-8abfcbc35a14" width="32%" />
</div>

---

### 💳 Payments
Secure checkout using PayPal integration.

<div align="center">
  <img src="https://github.com/user-attachments/assets/dd7ea586-1299-45d8-9e7c-9a7fcdf53a9c" width="32%" />
</div>

---

### 📁 Image/File Uploads
Admin can upload product images.

<div align="center">
  <img src="https://github.com/user-attachments/assets/93770d9e-ea73-4456-89ca-6859a6396f14" width="32%" />
  <img src="https://github.com/user-attachments/assets/14fbd9df-cde8-4cd2-ade9-59950780670a" width="32%" />
</div>

---

### 📊 Admin Dashboard
Manage products, orders, and users.

<div align="center">
  <img src="https://github.com/user-attachments/assets/8cda6219-c2cf-45a3-89d0-ccb55904ad6b" width="32%" />
  <img src="https://github.com/user-attachments/assets/e5bc0754-dd8b-47e3-9248-f6d05f88adce" width="32%" />
  <img src="https://github.com/user-attachments/assets/4c73888a-6144-409d-86be-34201360b3e4" width="32%" />
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/a85b01f2-96fa-4886-9b68-ae4b815eac7d" width="32%" />
  <img src="https://github.com/user-attachments/assets/06f354a5-c27c-4364-91b7-499aa4adf1bf" width="32%" />
</div>

---

### 🎨 Modern UI/UX
Tailwind CSS, Framer Motion animations, responsive design.

<div align="center">
  <img src="https://github.com/user-attachments/assets/6c34bc8a-866d-4dad-9aa5-d78486fc4858" width="32%" />
  <img src="https://github.com/user-attachments/assets/543c0bce-9a32-4f52-8dd3-be628ff47d7d" width="32%" />
  <img src="https://github.com/user-attachments/assets/e73edfdf-be96-472b-8998-bea441a517bf" width="32%" />
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/10d6810f-afb7-4e39-a85a-fe52c49566ae" width="32%" />
  <img src="https://github.com/user-attachments/assets/589760ae-5f4b-4e10-b246-d2163b3d0b2a" width="32%" />
  <img src="https://github.com/user-attachments/assets/f34cf46f-787f-4483-a159-3adfd317a1b4" width="32%" />
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/ceeae014-6fff-4457-bd8d-07b60116ba57" width="32%" />
  <img src="https://github.com/user-attachments/assets/108805f2-c5b8-4807-b32f-a4763f7b3dde" width="32%" />
</div>

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)  
- Redux Toolkit (state management)  
- react-router-dom (routing)  
- Tailwind CSS + PostCSS  
- axios, Framer Motion, react-icons, lucide-react  

**Backend**
- Node.js, Express  
- MongoDB + Mongoose  
- JWT authentication  

**Others**
- PayPal SDK  
- Cloudinary/S3 for uploads  

**Deployment**
- Frontend + Backend deployed via Vercel  

---

## 📂 Project Structure

```text
urban-ecommerce/
├── backend/
│   ├── server.js
│   ├── config/db.js
│   ├── routes/ (products, auth, admin, checkout, upload)
│   ├── models/ (User, Product, Order)
│   └── middleware/ (auth.js)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx, main.jsx
│   │   ├── redux/ (store, slices)
│   │   ├── components/ (UI, Cart, Products, Admin, etc.)
│   │   └── pages/
│   └── tailwind.config.js


```
🛠️ Tech Stack
    Frontend
      React (Vite)
      Redux Toolkit (state management)
      react-router-dom (routing)
      Tailwind CSS + PostCSS
      axios, Framer Motion, react-icons, lucide-react
    Backend
      Node.js, Express
      MongoDB + Mongoose
      JWT authentication
    PayPal SDK
    Cloudinary/S3 for uploads

  Deployment
    Frontend + Backend deployed via Vercel

⚙️ Setup & Installation
1️⃣ Clone the repository
git clone https://github.com/arya-potu/Urban-ecommerce.git
cd Urban-ecommerce

2️⃣ Backend setup
cd backend
npm install


Create .env file:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret
PORT=5000
PAYPAL_CLIENT_ID=your_paypal_client_id
CLOUDINARY_URL=your_cloudinary_key


Run backend:
  npm run dev

3️⃣ Frontend setup
  cd frontend
  npm install


Create .env file:
  VITE_API_URL=http://localhost:5000


Run frontend:
  npm run dev

🔑 API Endpoints (Quick Reference)

Products
 GET /api/products (filters: q, category, brand, priceMin, priceMax, sort, page, limit)
 GET /api/products/:id

Auth
 POST /api/auth/register
 POST /api/auth/login
 GET/PUT /api/users/profile (protected)

Cart
 POST /api/cart/merge (protected)

Checkout
 POST /api/checkout/create (protected, PayPal)

Admin
 /api/admin/products, /api/admin/orders, /api/admin/users

📸 Demo Flow
    Home page → featured products.
    Search + filter products.
    Product details → add to cart.
    Update cart, persistence across reloads.
    Login/register → cart merge.

Checkout with PayPal.
 Admin panel → manage products & orders.

✅ Future Improvements
  Add wishlist & reviews
  Enable Stripe payment option
  Add Redis caching & CDNs for scaling
  CI/CD with GitHub Actions + Docker

📜 License
    This project is open source and available under the MIT License.
